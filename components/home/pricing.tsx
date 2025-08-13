import { cn } from "@/lib/utils";
import { pricingPlans } from '@/utils/constants';
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { MotionDiv, MotionH2, MotionP } from "@/components/common/motion-wrapper";
import { Button } from "@/components/ui/button";

type PriceType = {
    name: string;
    price: number;
    description: string;
    items: string[];
    id: string;
    paymentLink: string;
    priceId: string;
};

const PricingCard = ({
    name,
    price,
    description,
    items,
    id,
    paymentLink,
}: PriceType) => {
    return (
        <MotionDiv
            className="relative w-full max-w-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ 
                type: "spring", 
                stiffness: 300,
                hover: { duration: 0.3 }
            }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
            <div
                className={cn(
                    "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
                    id === "pro" && "border-rose-500 gap-5 border-2"
                )}
            >
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <MotionH2 
                            className="text-lg lg:text-xl font-bold capitalize"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            {name}
                        </MotionH2>
                        <MotionP 
                            className="text-gray-600 mt-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {description}
                        </MotionP>
                    </div>
                </div>

                <MotionDiv 
                    className="flex gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <p className="text-5xl tracking-tight font-extrabold">
                        ${price}
                    </p>
                    <div className="flex flex-col justify-end mb-[4px]">
                        <p className="text-xs uppercase font-semibold">USD</p>
                        <p className="text-xs">/month</p>
                    </div>
                </MotionDiv>

                <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                    {items.map((item, idx) => (
                        <MotionDiv
                            key={idx}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            viewport={{ once: true }}
                            as="li"
                        >
                            <CheckIcon size={18} className="text-rose-500" />
                            <span>{item}</span>
                        </MotionDiv>
                    ))}
                </ul>

                <MotionDiv 
                    className="space-y-2 flex justify-center w-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <Button
                        asChild
                        className={cn(
                            "w-full rounded-full flex items-center justify-center gap-2 text-white border-2 py-2",
                            id === "pro"
                                ? "from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 border-rose-900 bg-gradient-to-r"
                                : "from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 border-rose-100 bg-gradient-to-r"
                        )}
                    >
                        <Link href={paymentLink}>
                            Buy Now <ArrowRight size={18} />
                        </Link>
                    </Button>
                </MotionDiv>
            </div>
        </MotionDiv>
    );
};

export default function PricingSection() {
    return (
        <section className="relative overflow-hidden" id="pricing">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
                <MotionDiv 
                    className="flex items-center justify-center w-full pb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <MotionH2 
                        className="uppercase font-bold text-xl mb-8 text-rose-500"
                        whileInView={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Pricing
                    </MotionH2>
                </MotionDiv>
                <MotionDiv 
                    className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { 
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {pricingPlans.map((plan) => (
                        <PricingCard key={plan.id} {...plan} />
                    ))}
                </MotionDiv>
            </div>
        </section>
    );
}