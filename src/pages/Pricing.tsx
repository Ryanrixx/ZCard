// src/pages/Pricing.tsx
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
    {
        name: "Free",
        price: 0,
        period: "forever",
        features: [
            "1 Digital Business Card",
            "Basic Templates",
            "QR Code Sharing",
            "Basic Analytics",
        ],
        popular: false,
        buttonText: "Get Started Free",
    },
    {
        name: "Pro",
        price: 9,
        period: "per month",
        features: [
            "Unlimited Cards",
            "Premium Templates",
            "Custom Branding",
            "Advanced Analytics",
            "CRM Integration",
            "Priority Support",
        ],
        popular: true,
        buttonText: "Start Free Trial",
    },
    {
        name: "Business",
        price: 29,
        period: "per month",
        features: [
            "Everything in Pro",
            "Team Management",
            "White Label Solution",
            "API Access",
            "Custom Domains",
            "Dedicated Support",
        ],
        popular: false,
        buttonText: "Contact Sales",
    },
];

const Pricing = () => {
    const navigate = useNavigate();
    const [inrRate, setInrRate] = useState(83); // fallback INR rate

    useEffect(() => {
        // ✅ Use dynamic import instead of require()
        import("currency-converter-lt")
            .then((module) => {
                const CurrencyConverter = module.default;
                const converter = new CurrencyConverter();
                converter
                    .from("USD")
                    .to("INR")
                    .rates()
                    .then((rate: number) => {
                        if (rate) setInrRate(rate);
                    })
                    .catch(() => setInrRate(83));
            })
            .catch(() => setInrRate(83));
    }, []);

    const handlePlanSelect = (planName: string) => {
        if (planName === "Free") navigate("/signup");
        else if (planName === "Pro") navigate("/signup?plan=pro");
        else navigate("/contact");
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">
                            Simple, Transparent{" "}
                            <span className="text-gradient">Pricing</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Choose the perfect plan for your digital networking needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan) => (
                            <Card
                                key={plan.name}
                                className={`relative p-8 ${
                                    plan.popular ? "ring-2 ring-brand-500 shadow-lg" : ""
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-brand-500 to-brand-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span>Most Popular</span>
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold">${plan.price}</span>
                                        {plan.price > 0 && (
                                            <span className="text-gray-500 text-lg ml-2">
                        (₹{(plan.price * inrRate).toFixed(0)})
                      </span>
                                        )}
                                        <span className="text-muted-foreground">
                      /{plan.period}
                    </span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center space-x-3">
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className={`w-full ${
                                        plan.popular
                                            ? "bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700"
                                            : ""
                                    }`}
                                    onClick={() => handlePlanSelect(plan.name)}
                                >
                                    {plan.buttonText}
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Pricing;


