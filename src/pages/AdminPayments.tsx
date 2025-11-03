
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowLeft, TrendingUp, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "@/contexts/UserContext";

const AdminPayments = () => {
  const navigate = useNavigate();
  const { users } = useUsers();

  const payments = users.filter(user => user.plan !== 'Free').map(user => ({
    id: Math.random().toString(36).substr(2, 9),
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    plan: user.plan,
    amount: user.plan === 'Pro' ? 29 : 99,
    status: 'Completed',
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
  }));

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const monthlyRevenue = payments.filter(payment => {
    const paymentDate = new Date(payment.date);
    const now = new Date();
    return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear();
  }).reduce((sum, payment) => sum + payment.amount, 0);

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
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">Payments Management</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Payments Management</h1>
          <p className="text-muted-foreground">Monitor and manage all payments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">${monthlyRevenue}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Payments</p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
              <CreditCard className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Payment</p>
                <p className="text-2xl font-bold">${payments.length > 0 ? Math.round(totalRevenue / payments.length) : 0}</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Payments Table */}
        <Card>
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">All Payments</h2>
          </div>
          <div className="p-6">
            {payments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No payments found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2">User</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">Plan</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-border/50">
                        <td className="py-3">{payment.userName}</td>
                        <td className="py-3 text-muted-foreground">{payment.userEmail}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.plan === 'Pro' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {payment.plan}
                          </span>
                        </td>
                        <td className="py-3 font-semibold">${payment.amount}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3 text-muted-foreground">
                          {payment.date.toLocaleDateString()}
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

export default AdminPayments;
