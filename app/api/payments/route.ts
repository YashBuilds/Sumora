import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from '@/lib/payments';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
    console.log("🚀 WEBHOOK RECEIVED - This should appear in logs"); // ADD THIS LINE
    
    const payload = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!sig) {
        console.error('❌ Missing stripe-signature header');
        return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    try {
        const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        console.log('✅ Webhook verified, event type:', event.type);

        switch (event.type) {
            case 'checkout.session.completed':
                console.log('💳 Checkout session completed');
                const sessionId = event.data.object.id;
                
                // Expand both line_items and customer
                const session = await stripe.checkout.sessions.retrieve(sessionId, {
                    expand: ['line_items', 'customer'],
                });

                console.log('📦 Session retrieved with expanded data');

                // Pass both session and stripe instance
                await handleCheckoutSessionCompleted({ 
                    session, 
                    stripe 
                });

                console.log('✅ Payment processing completed');
                break;

            case 'customer.subscription.deleted':
                console.log('🔄 Customer subscription deleted');
                const subscription = event.data.object;
                const subscriptionId = event.data.object.id;

                await handleSubscriptionDeleted({ subscriptionId, stripe });

                console.log(subscription);
                break;
                
            default:
                console.log(`ℹ️ Unhandled event type ${event.type}`);
        }
    } catch (err: any) {
        console.error('💥 Webhook error:', err.message);
        console.error('Full error:', err);
        return NextResponse.json(
            { error: 'Failed to trigger webhook', message: err.message },
            { status: 400 }
        );
    }

    return NextResponse.json({ status: 'success' });
};