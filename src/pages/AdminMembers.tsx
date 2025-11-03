
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  createdAt: Date;
  password: string;
}

const AdminMembers = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState<AdminMember[]>([]);
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "Admin",
    password: "admin123"
  });

  // Load admin members from localStorage
  const loadAdminMembers = () => {
    const savedAdmins = localStorage.getItem('ZCard_admin_members');
    let adminMembers = [];
    
    if (savedAdmins) {
      const parsedAdmins = JSON.parse(savedAdmins);
      adminMembers = parsedAdmins.map((admin: any) => ({
        ...admin,
        createdAt: new Date(admin.createdAt)
      }));
    }
    
    // Always include the super admin
    const superAdmin = {
      id: 'admin-1',
      name: 'Super Admin',
      email: 'admin@gmail.com',
      role: 'Super Admin',
      status: 'Active' as const,
      createdAt: new Date('2024-01-01'),
      password: 'PASSWORD'
    };
    
    // Check if super admin already exists in the list
    const hasSuperAdmin = adminMembers.some((admin: AdminMember) => admin.id === 'admin-1');
    if (!hasSuperAdmin) {
      adminMembers.unshift(superAdmin);
    }
    
    setAdmins(adminMembers);
  };

  // Load admin members on component mount
  useEffect(() => {
    loadAdminMembers();
  }, []);

  // Save admin members to localStorage (excluding super admin)
  const saveAdminMembers = (adminList: AdminMember[]) => {
    const adminsToSave = adminList.filter(admin => admin.id !== 'admin-1').map(admin => ({
      ...admin,
      createdAt: admin.createdAt.toISOString()
    }));
    localStorage.setItem('ZCard_admin_members', JSON.stringify(adminsToSave));
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const admin: AdminMember = {
      ...newAdmin,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Active',
      createdAt: new Date()
    };
    
    const updatedAdmins = [...admins, admin];
    setAdmins(updatedAdmins);
    saveAdminMembers(updatedAdmins);
    
    setNewAdmin({ name: "", email: "", role: "Admin", password: "admin123" });
    setIsAddAdminOpen(false);
  };

  const handleDeleteAdmin = (adminId: string) => {
    if (adminId === 'admin-1') {
      alert('Cannot delete Super Admin');
      return;
    }
    if (window.confirm('Are you sure you want to delete this admin?')) {
      const updatedAdmins = admins.filter(admin => admin.id !== adminId);
      setAdmins(updatedAdmins);
      saveAdminMembers(updatedAdmins);
    }
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
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">Admin Members</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Members</h1>
            <p className="text-muted-foreground">Manage admin users and their permissions</p>
          </div>
          <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Admin</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={newAdmin.role}
                    onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Add Admin</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Admins</p>
                <p className="text-2xl font-bold">{admins.length}</p>
              </div>
              <Shield className="w-8 h-8 text-brand-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Admins</p>
                <p className="text-2xl font-bold">{admins.filter(a => a.status === 'Active').length}</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Super Admins</p>
                <p className="text-2xl font-bold">{admins.filter(a => a.role === 'Super Admin').length}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Admins Table */}
        <Card>
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">All Admin Members</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Role</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Created</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id} className="border-b border-border/50">
                      <td className="py-3">{admin.name}</td>
                      <td className="py-3 text-muted-foreground">{admin.email}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          admin.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {admin.role}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {admin.status}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {admin.createdAt.toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        <div className="flex space-x-2">
                          {admin.id !== 'admin-1' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteAdmin(admin.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                          {admin.id === 'admin-1' && (
                            <span className="text-xs text-muted-foreground">Protected</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AdminMembers;
