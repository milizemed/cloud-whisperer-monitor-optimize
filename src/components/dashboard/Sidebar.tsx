
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Cloud, 
  BarChart3, 
  Bell, 
  Settings, 
  Server, 
  Database, 
  Globe, 
  ShieldCheck,
  Moon,
  Sun
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Sidebar = ({ className, isDarkMode, onToggleDarkMode }: SidebarProps) => {
  const navItems = [
    { icon: <BarChart3 className="h-5 w-5" />, label: 'Dashboard', href: '/' },
    { icon: <Server className="h-5 w-5" />, label: 'Compute', href: '/compute' },
    { icon: <Database className="h-5 w-5" />, label: 'Storage', href: '/storage' },
    { icon: <Globe className="h-5 w-5" />, label: 'Network', href: '/network' },
    { icon: <ShieldCheck className="h-5 w-5" />, label: 'Security', href: '/security' },
    { icon: <Bell className="h-5 w-5" />, label: 'Alerts', href: '/alerts' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className={cn("flex flex-col border-r bg-sidebar h-screen", className)}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8">
          <Cloud className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">CloudWhisperer</h1>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              to={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start gap-2"
          onClick={onToggleDarkMode}
        >
          {isDarkMode ? (
            <>
              <Sun className="h-4 w-4" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              <span>Dark Mode</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
