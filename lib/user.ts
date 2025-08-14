import { pricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from './summaries';
import { User } from "@clerk/nextjs/server";

// Get price_id for active user
export async function getPriceIdForActiveUser(email: string) {
  const sql = await getDbConnection();
  const query = await sql`
    SELECT price_id 
    FROM users 
    WHERE email = ${email} AND status = 'active'
  `;
  return query?.[0]?.price_id || null;
}

// Get both price_id and status
export async function getUserDataForActiveUser(email: string) {
  try {
    const sql = await getDbConnection();
    const result = await sql`
      SELECT price_id, status 
      FROM users 
      WHERE email = ${email} 
      LIMIT 1
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

// Check if user has active plan
export async function hasActivePlan(email: string) {
  const sql = await getDbConnection();
  const query = await sql`
    SELECT price_id, status 
    FROM users 
    WHERE email = ${email} 
      AND status = 'active' 
      AND price_id IS NOT NULL
  `;
  return query && query.length > 0;
}

// Check if user has hit upload limit
export async function hasReachedUploadLimit(userId: string, email: string) {
  const uploadCount = await getUserUploadCount(userId);
  const priceId = await getPriceIdForActiveUser(email);
  const isPro = pricingPlans.find((plan) => plan.priceId === priceId)?.id === 'pro';
  const uploadLimit: number = isPro ? 1000 : 5;

  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit
  };
}

// Clerk User subscription check
export async function getSubscriptionStatus(user: User) {
  return await hasActivePlan(user.emailAddresses[0].emailAddress);
}
