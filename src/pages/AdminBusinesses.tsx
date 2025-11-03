
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, ArrowLeft, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminBusinesses = () => {
  const navigate = useNavigate();

  // Mock data for businesses (in real app, this would come from a context or API)
  const businesses = [
    {
      id: '1',
      name: 'Tech Corp',
      email: 'contact@techcorp.com',
      plan: 'Business',
      employees: 25,
      status: 'Active',
      createdAt: new Date('2024-02-15')
    },
    {
      id: '2',
      name: 'Design Studio',
      email: 'hello@designstudio.com',
      plan: 'Business',
      employees: 12,
      status: 'Active',
      createdAt: new Date('2024-03-01')
    }
  ];

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
                  <Building className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">Businesses Management</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Businesses Management</h1>
          <p className="text-muted-foreground">Manage business accounts and their teams</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Businesses</p>
                <p className="text-2xl font-bold">{businesses.length}</p>
              </div>
              <Building className="w-8 h-8 text-brand-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Businesses</p>
                <p className="text-2xl font-bold">{businesses.filter(b => b.status === 'Active').length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{businesses.reduce((sum, b) => sum + b.employees, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Team Size</p>
                <p className="text-2xl font-bold">{businesses.length > 0 ? Math.round(businesses.reduce((sum, b) => sum + b.employees, 0) / businesses.length) : 0}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Businesses Table */}
        <Card>
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">All Businesses</h2>
          </div>
          <div className="p-6">
            {businesses.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No businesses found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2">Business Name</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">Plan</th>
                      <th className="text-left py-2">Employees</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Created</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businesses.map((business) => (
                      <tr key={business.id} className="border-b border-border/50">
                        <td className="py-3">{business.name}</td>
                        <td className="py-3 text-muted-foreground">{business.email}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                            {business.plan}
                          </span>
                        </td>
                        <td className="py-3">{business.employees}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            {business.status}
                          </span>
                        </td>
                        <td className="py-3 text-muted-foreground">
                          {business.createdAt.toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
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

export default AdminBusinesses;
