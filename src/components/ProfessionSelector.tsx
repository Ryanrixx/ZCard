
import { Card } from "@/components/ui/card";
import { 
  Briefcase, 
  Palette, 
  Code, 
  Stethoscope, 
  GraduationCap, 
  Users,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useState } from "react";

const professions = [
  {
    id: "freelancer",
    title: "Freelancer/Consultant",
    description: "Independent professionals and consultants",
    icon: Briefcase,
    color: "from-blue-500 to-blue-600",
    popular: true
  },
  {
    id: "corporate",
    title: "Corporate Professional",
    description: "Executives, managers, and office workers",
    icon: Users,
    color: "from-purple-500 to-purple-600",
    popular: false
  },
  {
    id: "creative",
    title: "Creative Artist",
    description: "Designers, photographers, and artists",
    icon: Palette,
    color: "from-pink-500 to-pink-600",
    popular: false
  },
  {
    id: "healthcare",
    title: "Healthcare Provider",
    description: "Doctors, nurses, and medical professionals",
    icon: Stethoscope,
    color: "from-green-500 to-green-600",
    popular: false
  },
  {
    id: "tech",
    title: "Tech Specialist",
    description: "Developers, engineers, and IT professionals",
    icon: Code,
    color: "from-orange-500 to-orange-600",
    popular: true
  },
  {
    id: "education",
    title: "Student/Educator",
    description: "Teachers, professors, and students",
    icon: GraduationCap,
    color: "from-teal-500 to-teal-600",
    popular: false
  }
];

const ProfessionSelector = () => {
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleStartOnboarding = () => {
    setIsVisible(true);
  };

  const handleProfessionSelect = (professionId: string) => {
    setSelectedProfession(professionId);
    console.log(`Selected profession: ${professionId}`);
  };

  if (!isVisible) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our AI guide you through creating the perfect digital business card for your profession.
          </p>
          <button
            onClick={handleStartOnboarding}
            className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-brand-50 border border-brand-200 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium text-brand-700">AI-Powered Onboarding</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Let's create your perfect{" "}
            <span className="text-gradient">digital identity!</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            What best describes what you do? This helps us personalize your experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {professions.map((profession, index) => {
            const Icon = profession.icon;
            const isSelected = selectedProfession === profession.id;
            
            return (
              <Card
                key={profession.id}
                className={`relative p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in ${
                  isSelected 
                    ? 'ring-2 ring-brand-500 shadow-lg bg-brand-50/50' 
                    : 'hover:shadow-md'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleProfessionSelect(profession.id)}
              >
                {profession.popular && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Popular
                  </div>
                )}
                
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${profession.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {profession.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {profession.description}
                </p>

                {isSelected && (
                  <div className="mt-4 flex items-center text-brand-600 text-sm font-medium">
                    <span>Selected</span>
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {selectedProfession && (
          <div className="text-center mt-12 animate-fade-in">
            <button className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg">
              Continue Setup
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfessionSelector;
