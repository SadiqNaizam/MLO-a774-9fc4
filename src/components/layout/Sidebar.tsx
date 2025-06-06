import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // For conditional class names
import { LayoutDashboard, Users, BarChart3, Settings, FileText } from 'lucide-react'; // Example icons

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
}

interface SidebarProps {
  className?: string;
  navItems?: NavItem[]; // Allow custom nav items
}

const defaultNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ className, navItems = defaultNavItems }) => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  return (
    <aside className={cn("h-screen w-64 border-r border-gray-200 bg-gray-50 flex flex-col fixed left-0 top-16 pt-4", className)}> {/* Adjust top-16 if nav height changes */}
      <ScrollArea className="flex-grow px-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.href
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
              aria-disabled={item.disabled}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      {/* Optional: Footer section in sidebar */}
      {/* <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} YourApp</p>
      </div> */}
    </aside>
  );
};

export default Sidebar;