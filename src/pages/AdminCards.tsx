
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Trash2, ArrowLeft, Eye, Share } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCards } from "@/contexts/CardContext";
import { useUsers } from "@/contexts/UserContext";

const AdminCards = () => {
  const navigate = useNavigate();
  const { cards, deleteCard } = useCards();
  const { users } = useUsers();

  const handleDeleteCard = (cardId: string) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      deleteCard(cardId);
    }
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/admin")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">Cards Management</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Cards Management</h1>
          <p className="text-muted-foreground">Manage all business cards in the system</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cards</p>
                <p className="text-2xl font-bold">{cards.length}</p>
              </div>
              <CreditCard className="w-8 h-8 text-brand-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{cards.reduce((sum, card) => sum + card.views, 0)}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Shares</p>
                <p className="text-2xl font-bold">{cards.reduce((sum, card) => sum + card.shares, 0)}</p>
              </div>
              <Share className="w-8 h-8 text-green-500" />
            </div>
          </Card>
        </div>

        {/* Cards Table */}
        <Card>
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">All Cards</h2>
          </div>
          <div className="p-6">
            {cards.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No cards found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Owner</th>
                      <th className="text-left py-2">Company</th>
                      <th className="text-left py-2">Views</th>
                      <th className="text-left py-2">Shares</th>
                      <th className="text-left py-2">Created</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cards.map((card) => (
                      <tr key={card.id} className="border-b border-border/50">
                        <td className="py-3">{card.name}</td>
                        <td className="py-3 text-muted-foreground">{getUserName(card.userId)}</td>
                        <td className="py-3">{card.company}</td>
                        <td className="py-3">{card.views}</td>
                        <td className="py-3">{card.shares}</td>
                        <td className="py-3 text-muted-foreground">
                          {card.createdAt.toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/card/${card.id}/view`)}
                            >
                              View
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteCard(card.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AdminCards;
