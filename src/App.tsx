
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CardProvider } from "@/contexts/CardContext";
import { UserProvider } from "@/contexts/UserContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCards from "./pages/AdminCards";
import AdminPayments from "./pages/AdminPayments";
import AdminMembers from "./pages/AdminMembers";
import AdminBusinesses from "./pages/AdminBusinesses";
import BusinessDashboard from "./pages/BusinessDashboard";
import CardBuilder from "./pages/CardBuilder";
import CardView from "./pages/CardView";
import CardEdit from "./pages/CardEdit";
import UserManagement from "./pages/UserManagement";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <UserProvider>
          <CardProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/cards" element={<AdminCards />} />
                <Route path="/admin/payments" element={<AdminPayments />} />
                <Route path="/admin/members" element={<AdminMembers />} />
                <Route path="/admin/businesses" element={<AdminBusinesses />} />
                <Route path="/business-dashboard" element={<BusinessDashboard />} />
                <Route path="/card-builder" element={<CardBuilder />} />
                <Route path="/card/:id/view" element={<CardView />} />
                <Route path="/card/:id/edit" element={<CardEdit />} />
                <Route path="/profile" element={<Profile />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CardProvider>
        </UserProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
