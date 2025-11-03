
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Users, BarChart3, DollarSign, LogOut, Settings, Plus, Trash2, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "@/contexts/UserContext";
import { useCards } from "@/contexts/CardContext";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { users, deleteUser } = useUsers();
  const { cards } = useCards();

  const handleLogout = () => {
    navigate("/");
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  const totalRevenue = users.reduce((sum, user) => {
    const revenue = user.plan === 'Pro' ? 29 : user.plan === 'Business' ? 99 : 0;
    return sum + revenue;
  }, 0);

  const growthRate = 15; // Mock growth rate

  const sidebarItems = [
    {
      title: "Users",
      action: () => navigate("/admin/users"),
      icon: Users,
    },
    {
      title: "Cards",
      action: () => navigate("/admin/cards"),
      icon: CreditCard,
    },
    {
      title: "Payments",
      action: () => navigate("/admin/payments"),
      icon: DollarSign,
    },
    {
      title: "Admin Members",
      action: () => navigate("/admin/members"),
      icon: Settings,
    },
    {
      title: "Businesses",
      action: () => navigate("/admin/businesses"),
      icon: BarChart3,
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton onClick={item.action}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          {/* Header */}
          <header className="border-b border-border bg-background/80 backdrop-blur-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger />
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gradient">ZCard Admin</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
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
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage users, analytics, and system settings</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{users.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-brand-500" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Cards</p>
                    <p className="text-2xl font-bold">{cards.length}</p>
                  </div>
                  <CreditCard className="w-8 h-8 text-blue-500" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <p className="text-2xl font-bold">${totalRevenue}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Growth Rate</p>
                    <p className="text-2xl font-bold">+{growthRate}%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-500" />
                </div>
              </Card>
            </div>

            {/* Recent Users */}
            <Card className="mb-8">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent Users</h2>
                  <Button onClick={() => navigate("/admin/users")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Manage All Users
                  </Button>
                </div>
              </div>
              <div className="p-6">
                {users.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No users found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2">Name</th>
                          <th className="text-left py-2">Email</th>
                          <th className="text-left py-2">Plan</th>
                          <th className="text-left py-2">Status</th>
                          <th className="text-left py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.slice(0, 5).map((user) => (
                          <tr key={user.id} className="border-b border-border/50">
                            <td className="py-3">{user.name}</td>
                            <td className="py-3 text-muted-foreground">{user.email}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.plan === 'Pro' ? 'bg-blue-100 text-blue-800' :
                                user.plan === 'Business' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {user.plan}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDeleteUser(user.id)}
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
