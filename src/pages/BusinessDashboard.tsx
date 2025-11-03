
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Users, BarChart3, Building, LogOut, Settings, Plus, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCards } from "@/contexts/CardContext";

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const { cards } = useCards();

  const handleLogout = () => {
    navigate("/");
  };

  const handleCreateCard = () => {
    navigate("/card-builder");
  };

  const totalViews = cards.reduce((sum, card) => sum + card.views, 0);
  const totalShares = cards.reduce((sum, card) => sum + card.shares, 0);
  const teamMembers = 5; // Mock team size

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">ZCard Business</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Team Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Business Dashboard</h1>
          <p className="text-muted-foreground">Manage your team's digital business cards</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Cards</p>
                <p className="text-2xl font-bold">{cards.length}</p>
              </div>
              <CreditCard className="w-8 h-8 text-brand-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{totalViews}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold">{teamMembers}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-bold">+25%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Business Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Team Management</h3>
            <p className="text-muted-foreground mb-4">Manage your team members and their digital business cards.</p>
            <Button className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Manage Team
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Brand Templates</h3>
            <p className="text-muted-foreground mb-4">Create branded templates for consistent company identity.</p>
            <Button className="w-full" onClick={() => navigate("/templates")}>
              <Building className="w-4 h-4 mr-2" />
              Manage Templates
            </Button>
          </Card>
        </div>

        {/* Team Cards */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Team Cards</h2>
          <Button onClick={handleCreateCard} className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Team Card
          </Button>
        </div>

        {cards.length === 0 ? (
          <Card className="p-12 text-center">
            <Building className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No team cards yet</h3>
            <p className="text-muted-foreground mb-6">Create your first team member's digital business card.</p>
            <Button onClick={handleCreateCard} className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create First Team Card
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Card key={card.id} className="overflow-hidden">
                <div className="bg-gradient-to-br from-brand-500 to-brand-600 p-6 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-lg font-bold">
                    {card.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-lg font-semibold text-center">{card.name}</h3>
                  <p className="text-sm text-center opacity-90">{card.title}</p>
                  <p className="text-xs text-center opacity-75">{card.company}</p>
                </div>
                <div className="p-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>{card.views} views</span>
                    <span>{card.shares} shares</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Manage
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BusinessDashboard;
