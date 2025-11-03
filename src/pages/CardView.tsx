
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Globe, Share } from "lucide-react";
import { useCards } from "@/contexts/CardContext";
import { useEffect } from "react";

const CardView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCard, updateCard } = useCards();
  
  const card = id ? getCard(id) : null;

  useEffect(() => {
    // Increment view count when card is viewed
    if (card && id) {
      updateCard(id, { views: card.views + 1 });
    }
  }, [card, id, updateCard]);

  if (!card) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Card Not Found</h1>
          <p className="text-muted-foreground mb-6">The card you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
    if (id) {
      updateCard(id, { shares: card.shares + 1 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-background to-brand-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleShare} variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
        
        <Card className="p-8 bg-white shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold">
              {card.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{card.name}</h1>
            <p className="text-brand-600 font-medium text-lg">{card.title}</p>
            <p className="text-muted-foreground">{card.company}</p>
          </div>

          {card.bio && (
            <div className="mb-8 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">{card.bio}</p>
            </div>
          )}

          <div className="space-y-4">
            {card.email && (
              <a href={`mailto:${card.email}`} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <Mail className="w-6 h-6 text-brand-500" />
                <span className="font-medium">{card.email}</span>
              </a>
            )}
            {card.phone && (
              <a href={`tel:${card.phone}`} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <Phone className="w-6 h-6 text-brand-500" />
                <span className="font-medium">{card.phone}</span>
              </a>
            )}
            {card.location && (
              <div className="flex items-center space-x-4 p-4 rounded-lg">
                <MapPin className="w-6 h-6 text-brand-500" />
                <span className="font-medium">{card.location}</span>
              </div>
            )}
            {card.website && (
              <a href={card.website.startsWith('http') ? card.website : `https://${card.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <Globe className="w-6 h-6 text-brand-500" />
                <span className="font-medium">{card.website}</span>
              </a>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CardView;
