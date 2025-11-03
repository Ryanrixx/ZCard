
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, User, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState<'individual' | 'superadmin'>('individual');
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const success = login(formData.email, formData.password, userType);
    
    if (success) {
      // Check for admin credentials (super admin or regular admin)
      if (formData.email === "admin@gmail.com" && formData.password === "PASSWORD") {
        navigate("/admin");
        return;
      }
      
      // Check if it's an admin member
      const adminMembersData = localStorage.getItem('ZCard_admin_members');
      const adminMembers = adminMembersData ? JSON.parse(adminMembersData) : [];
      const isAdminMember = adminMembers.find((admin: any) => 
        admin.email === formData.email && admin.password === formData.password
      );
      
      if (isAdminMember || userType === 'superadmin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError('These credentials don\'t match our records. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(""); // Clear error when user types
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-background to-brand-50/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">ZCard</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your ZCard account</p>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <Label className="text-sm font-medium mb-3 block">Sign in as:</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={userType === 'individual' ? 'default' : 'outline'}
              onClick={() => setUserType('individual')}
              className="flex items-center space-x-2 p-3"
            >
              <User className="w-4 h-4" />
              <span>Individual</span>
            </Button>
            <Button
              type="button"
              variant={userType === 'superadmin' ? 'default' : 'outline'}
              onClick={() => setUserType('superadmin')}
              className="flex items-center space-x-2 p-3"
            >
              <Shield className="w-4 h-4" />
              <span>Super Admin</span>
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white">
            Sign In
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-brand-600 hover:text-brand-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Demo credentials:<br />
            Super Admin: admin@gmail.com / PASSWORD<br />
            User created via admin: email / admin123<br />
            Admin created via admin: email / admin123
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
