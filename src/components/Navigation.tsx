import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  MapPin, 
  AlertTriangle, 
  Bell, 
  User,
  Plus
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/map', icon: MapPin, label: 'Map' },
    { path: '/report', icon: Plus, label: 'Report', variant: 'emergency' as const },
    { path: '/alerts', icon: Bell, label: 'Alerts', badge: 2 },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link key={item.path} to={item.path} className="flex flex-col items-center p-2">
              <div className="relative">
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive 
                    ? item.variant === 'emergency' 
                      ? 'bg-emergency text-emergency-foreground' 
                      : 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                {item.badge && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-emergency text-white">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs mt-1 ${
                isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;