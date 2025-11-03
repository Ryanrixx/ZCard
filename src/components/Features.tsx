
import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Zap, 
  Smartphone, 
  BarChart3, 
  Shield, 
  Palette 
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Personalization",
    description: "Our intelligent system adapts to your profession and industry, suggesting the perfect design and content for your digital card.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Zap,
    title: "5-Minute Setup",
    description: "Get your professional digital business card ready in under 5 minutes with our streamlined onboarding process.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Your cards look stunning on any device. Perfect for networking events, meetings, and digital sharing.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track how your card performs with detailed analytics on views, shares, and engagement metrics.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security ensures your professional information is always protected and secure.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description: "Match your company's brand with custom colors, logos, and design elements that reflect your identity.",
    color: "from-pink-500 to-pink-600"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient">ZCard</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've reimagined business cards for the digital age, combining AI intelligence with beautiful design to create cards that truly represent you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <Card 
                key={index}
                className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
