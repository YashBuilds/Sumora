import { isDev } from "./helpers";

export const pricingPlans = [
    {
        name: "Basic",
        price: 9,
        description: "Perfect for occasional use",
        items: [
            "5 PDF summaries per month",
            "Standard processing speed",
            "Email support",
        ],
        id: "basic",
        paymentLink: isDev ? 'https://buy.stripe.com/test_9B67sM5tA8yl5C05SdgYU00' : '',
        priceId: isDev ? 'price_1Ruz8vJcJZ36dt4XMuSziVoD' : '',
    },
    {
        name: "Pro",
        price: 19,
        description: "For professionals and teams",
        items: [
            "Unlimited PDF summaries",
            "Priority processing",
            "24/7 priority support",
            "Markdown Export",
        ],
        id: "pro",
        paymentLink:  isDev ? 'https://buy.stripe.com/test_9B614o3ls4i5c0o80lgYU01' : '',
        priceId: isDev ? 'price_1Ruz8vJcJZ36dt4Xhvwe6N1v' : '',
    },
];


export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        }
    }
}

export const itemVariants = {
    hidden: {opacity: 0, y:20 },
    visible: {
        opacity: 1,
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 50,
            duration: 0.8,
        }
    }
}