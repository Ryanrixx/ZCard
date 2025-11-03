
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: 1,
    name: "Modern Professional",
    category: "Business",
    preview: "bg-gradient-to-br from-blue-500 to-blue-600",
    popular: true
  },
  {
    id: 2,
    name: "Creative Designer",
    category: "Creative",
    preview: "bg-gradient-to-br from-purple-500 to-pink-600",
    popular: false
  },
  {
    id: 3,
    name: "Tech Specialist",
    category: "Technology",
    preview: "bg-gradient-to-br from-green-500 to-teal-600",
    popular: true
  },
  {
    id: 4,
    name: "Healthcare Pro",
    category: "Healthcare",
    preview: "bg-gradient-to-br from-red-500 to-orange-600",
    popular: false
  },
  {
    id: 5,
    name: "Minimalist",
    category: "Business",
    preview: "bg-gradient-to-br from-gray-700 to-gray-900",
    popular: true
  },
  {
    id: 6,
    name: "Artistic Flair",
    category: "Creative",
    preview: "bg-gradient-to-br from-yellow-500 to-orange-600",
    popular: false
  }
];

const Templates = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (templateId: number) => {
    // Navigate to card builder with template pre-selected
    navigate(`/card-builder?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Choose Your Perfect <span className="text-gradient">Template</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional templates designed for every industry and style preference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`h-48 ${template.preview} relative`}>
                  {template.popular && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium">Popular</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-lg font-bold">JS</span>
                      </div>
                      <p className="text-sm">Preview</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                    <span className="text-xs bg-muted px-2 py-1 rounded">{template.category}</span>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    Use Template
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Templates;
