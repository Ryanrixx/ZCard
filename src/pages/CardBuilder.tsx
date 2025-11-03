
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, ArrowLeft, Save, Mail, Phone, MapPin, Globe } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCards } from "@/contexts/CardContext";
import { useToast } from "@/components/ui/use-toast";

const CardBuilder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cards, addCard, updateCard, getCard } = useCards();
  const { toast } = useToast();
  
  const existingCard = id ? getCard(id) : null;
  
  const [cardData, setCardData] = useState({
    name: existingCard?.name || "",
    title: existingCard?.title || "",
    company: existingCard?.company || "",
    email: existingCard?.email || "",
    phone: existingCard?.phone || "",
    location: existingCard?.location || "",
    website: existingCard?.website || "",
    bio: existingCard?.bio || ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    if (!cardData.name || !cardData.email) {
      toast({
        title: "Error",
        description: "Name and email are required fields.",
        variant: "destructive"
      });
      return;
    }

    if (id && existingCard) {
      updateCard(id, cardData);
      toast({
        title: "Success",
        description: "Card updated successfully!",
      });
    } else {
      addCard(cardData);
      toast({
        title: "Success",
        description: "Card created successfully!",
      });
    }
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">Card Builder</span>
              </div>
            </div>
            <Button onClick={handleSave} className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              {id ? 'Update Card' : 'Save Card'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <h1 className="text-2xl font-bold mb-6">
              {id ? 'Edit Your Digital Business Card' : 'Create Your Digital Business Card'}
            </h1>
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={cardData.name}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={cardData.title}
                      onChange={handleInputChange}
                      placeholder="Senior Product Designer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={cardData.company}
                      onChange={handleInputChange}
                      placeholder="TechCorp Solutions"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={cardData.bio}
                      onChange={handleInputChange}
                      placeholder="Brief description about yourself..."
                      rows={3}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={cardData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={cardData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={cardData.location}
                      onChange={handleInputChange}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={cardData.website}
                      onChange={handleInputChange}
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-8">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
            <Card className="p-6 bg-gradient-to-br from-brand-50 to-background">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {cardData.name ? cardData.name.split(' ').map(n => n[0]).join('') : 'JS'}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{cardData.name || 'Your Name'}</h3>
                  <p className="text-brand-600 font-medium">{cardData.title || 'Your Title'}</p>
                  <p className="text-muted-foreground text-sm">{cardData.company || 'Your Company'}</p>
                </div>

                {cardData.bio && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground text-center">{cardData.bio}</p>
                  </div>
                )}

                <div className="space-y-3">
                  {cardData.email && (
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Mail className="w-5 h-5 text-brand-500" />
                      <span className="text-sm">{cardData.email}</span>
                    </div>
                  )}
                  {cardData.phone && (
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Phone className="w-5 h-5 text-brand-500" />
                      <span className="text-sm">{cardData.phone}</span>
                    </div>
                  )}
                  {cardData.location && (
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <MapPin className="w-5 h-5 text-brand-500" />
                      <span className="text-sm">{cardData.location}</span>
                    </div>
                  )}
                  {cardData.website && (
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Globe className="w-5 h-5 text-brand-500" />
                      <span className="text-sm">{cardData.website}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CardBuilder;
