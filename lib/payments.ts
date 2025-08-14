import Stripe from "stripe";
import { getDbConnection } from "./db";

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string,
  stripe: Stripe;
}) {
  console.log('Subscription deleted', subscriptionId);

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const sql = await getDbConnection();

    await sql`UPDATE users SET status = 'cancelled', price_id = NULL WHERE customer_id = ${subscription.customer}`;
    console.log('Subscription cancelled successfully')
  } catch (error) {
    console.error('Error handling subscription deleted', error);
    throw error;
  }
}

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  try {
    console.log("Checkout session completed", session.id);

    // Use the expanded customer object directly - don't retrieve again
    const customer = session.customer as Stripe.Customer;
    const priceId = session.line_items?.data[0]?.price?.id;

    console.log("Customer:", customer?.email, "PriceId:", priceId);

    if (customer && customer.email && priceId) {
      const { email, name, id: customerId } = customer;

      const sql = await getDbConnection();

      await createOrUpdateUser({
        sql,
        email: email as string,
        fullName: (name || 'Unknown') as string,
        customerId: customerId,
        priceId: priceId as string,
        status: "active",
      });

      await createPayment({
        sql,
        session,
        priceId: priceId as string,
        userEmail: email as string,
      });
    } else {
      console.error("Missing data - Customer:", !!customer, "Email:", !!customer?.email, "PriceId:", !!priceId);
    }
  } catch (error) {
    console.error("Error in handleCheckoutSessionCompleted:", error);
    throw error;
  }
}

// Helper function to get plan name from price ID
export function getPlanNameFromPriceId(priceId: string | null): string {
  if (!priceId) return 'Free Plan';
  
  switch (priceId) {
    case 'price_1Rvz4jJcJZ36dt4X3gKUlEuY':
      return 'Basic Plan';
    case 'price_1Rvz4jJcJZ36dt4XBqEmRbU6':
      return 'Pro Plan';
    default:
      return 'Free Plan';
  }
}

// Helper function to check if user has active subscription
export function hasActiveSubscription(status: string | null, priceId: string | null): boolean {
  return status === 'active' && priceId !== null;
}

async function createOrUpdateUser({
  sql,
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  sql: any;
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) {
  try {
    console.log("Checking user for email:", email);
    
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    
    console.log("Found", user.length, "users with email:", email);
    
    if (user.length === 0) {
      console.log("Inserting new user...");
      
      const result = await sql`
        INSERT INTO users (email, full_name, customer_id, price_id, status) 
        VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})
        RETURNING *
      `;
      
      console.log('✅ User inserted:', result[0]?.email);
    } else {
      console.log("Updating existing user...");
      
      const result = await sql`
        UPDATE users SET 
          full_name = ${fullName}, 
          customer_id = ${customerId}, 
          price_id = ${priceId}, 
          status = ${status}
        WHERE email = ${email}
        RETURNING *
      `;
      
      console.log('✅ User updated:', result[0]?.email);
    }
  } catch (error) {
    console.error("💥 Error in createOrUpdateUser:", error);
    throw error;
  }
}

async function createPayment({
  sql,
  session,
  priceId,
  userEmail,
}: {
  sql: any;
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}) {
  try {
    const { amount_total, id, status } = session;

    console.log("Creating payment:", { amount_total, id, status, priceId, userEmail });

    const result = await sql`
      INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) 
      VALUES(${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})
      RETURNING *
    `;
    
    console.log('✅ Payment created:', result[0]?.stripe_payment_id);
  } catch (error) {
    console.error("💥 Error creating payment:", error);
    throw error;
  }
}