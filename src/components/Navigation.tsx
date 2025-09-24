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
    { path: '/report', icon: Plus, label: 'Report', variant: 'emergency' as const, isCenter: true },
    { path: '/alerts', icon: Bell, label: 'Alerts', badge: 2 },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border/50 z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-3 pb-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          if (item.isCenter) {
            return (
              <Link key={item.path} to={item.path} className="relative">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                  isActive ? 'gradient-emergency scale-110' : 'gradient-emergency'
                } transition-all duration-200 active:scale-95`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-foreground">
                  {item.label}
                </span>
              </Link>
            );
          }
          
          return (
            <Link key={item.path} to={item.path} className="flex flex-col items-center py-2 px-3 min-w-0 relative">
              <div className="relative">
                <div className={`p-3 rounded-xl transition-all duration-200 active:scale-95 ${
                  isActive 
                    ? 'bg-primary/10 text-primary scale-110' 
                    : 'text-muted-foreground active:bg-muted/50'
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-sm' : ''}`} />
                </div>
                {item.badge && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-emergency text-white pulse-emergency">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs mt-2 transition-colors ${
                isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
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