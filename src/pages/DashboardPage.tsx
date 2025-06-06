import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Sidebar from '@/components/layout/Sidebar'; // Assuming Sidebar is fixed and NavigationMenu height is 16 (h-16 or 4rem)
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart, Users, Activity, DollarSign, Settings, LogOut, User as UserIcon } from 'lucide-react'; // For sidebar and card icons
import { useToast } from "@/components/ui/use-toast";

// Define NavItem type matching Sidebar.tsx for custom items if needed
interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  console.log('DashboardPage loaded');

  const placeholderUser = {
    name: 'Alice Wonderland',
    email: 'alice.w@example.com',
    avatarUrl: 'https://source.unsplash.com/random/100x100/?woman,portrait', // Placeholder avatar
  };

  const handleLogout = () => {
    console.log('User logging out');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  // Example custom nav items for sidebar (or rely on Sidebar's defaults)
  const sidebarNavItems: NavItem[] = [
    { href: "/dashboard", label: "Overview", icon: BarChart },
    { href: "/dashboard/users", label: "User Management", icon: Users },
    { href: "/dashboard/activity", label: "Activity Log", icon: Activity },
    { href: "/dashboard/billing", label: "Billing", icon: DollarSign },
    { href: "/dashboard/settings", label: "Account Settings", icon: Settings },
  ];


  return (
    <div className="flex flex-col h-screen">
      <NavigationMenu
        appName="MyApp Dashboard"
        user={placeholderUser}
        onLogout={handleLogout}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar navItems={sidebarNavItems} /> {/* Sidebar is fixed position, occupies w-64 */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6 pt-8 pl-[calc(theme(space.64)_+_theme(space.6))]"> {/* Adjust pl for sidebar width + padding */}
          <div className="container mx-auto px-0"> {/* No extra horizontal padding needed from container if main has it */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {placeholderUser.name}!</h1>

            {/* Stats Cards Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Signups</CardTitle>
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+120</div>
                  <p className="text-xs text-muted-foreground">+15% this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">57</div>
                  <p className="text-xs text-muted-foreground">3 urgent</p>
                </CardContent>
              </Card>
            </section>

            {/* Other Dashboard Sections */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>An overview of recent actions in your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <ul className="space-y-3">
                      {[...Array(10)].map((_, i) => (
                        <li key={i} className="text-sm p-2 border-b last:border-b-0">User X performed action Y - {new Date(Date.now() - i * 100000).toLocaleTimeString()}</li>
                      ))}
                    </ul>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks at your fingertips.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3">
                  <Button variant="outline">Create New Report</Button>
                  <Button variant="outline">Manage Users</Button>
                  <Button variant="outline">View Analytics</Button>
                  <Button>Upgrade Plan</Button>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;