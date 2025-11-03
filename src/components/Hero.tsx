
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-background to-brand-50/30"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-brand-50 border border-brand-200 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium text-brand-700">AI-Powered Business Cards</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in">
            Create Your Perfect{" "}
            <span className="text-gradient">Digital Identity</span>{" "}
            in Minutes
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-200">
            Our AI-powered platform guides you through creating stunning digital business cards that adapt to your profession and industry.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12 animate-fade-in delay-300">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate("/signup")}
            >
              Start Creating Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg rounded-xl border-2 hover:bg-muted/50 transition-all duration-300"
              onClick={() => navigate("/templates")}
            >
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-muted-foreground animate-fade-in delay-500">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-brand-500" />
              <span className="text-sm">Trusted by 10,000+ professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-brand-500" />
              <span className="text-sm">Cards created in under 5 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
