import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin, Shield, Users, Plus, Bell, RefreshCw, Zap } from 'lucide-react';
import { mockHazardReports, mockAlerts, mockUser } from '@/data/mockData';
import heroImage from '@/assets/harbor-hero.jpg';

const Home = () => {
  const [activeHazards] = useState(mockHazardReports.filter(report => report.verified));
  const [recentAlerts] = useState(mockAlerts.filter(alert => !alert.read));
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'emergency';
      case 'high': return 'warning';
      case 'medium': return 'warning';
      case 'low': return 'safe';
      default: return 'secondary';
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header with Status Bar */}
      <div className="relative bg-gradient-ocean text-white safe-area-inset-top">
        <div className="px-4 py-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Harbor</h1>
              <p className="text-white/80 text-sm">Emergency Response</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Link to="/alerts">
                <div className="relative">
                  <Bell className="w-5 h-5 text-white" />
                  {recentAlerts.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emergency rounded-full pulse-emergency" />
                  )}
                </div>
              </Link>
            </div>
          </div>
          
          {/* Quick Emergency Button */}
          <Link to="/report">
            <Button className="w-full gradient-emergency text-white font-semibold py-4 text-lg shadow-lg active:scale-95 transition-transform">
              <Zap className="w-5 h-5 mr-2" />
              Report Emergency
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-4 relative z-10 pb-24">
        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-gradient-to-br from-emergency/5 to-emergency/10 border-emergency/20 slide-up">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 bg-emergency/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-emergency" />
                </div>
              </div>
              <div className="text-2xl font-bold text-emergency">{activeHazards.length}</div>
              <div className="text-xs text-muted-foreground">Active Hazards</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 slide-up">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="text-2xl font-bold text-primary">{mockUser.credibilityScore}</div>
              <div className="text-xs text-muted-foreground">Your Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Alerts */}
        {recentAlerts.length > 0 && (
          <Card className="mb-6 border-emergency/20 bg-emergency/5 fade-in-up">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emergency rounded-full pulse-emergency" />
                <CardTitle className="text-lg text-emergency">Live Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAlerts.slice(0, 2).map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-emergency/10">
                  <AlertTriangle className="w-4 h-4 text-emergency mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm leading-tight">{alert.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                    <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {alert.location.radius}km radius • {new Date(alert.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              <Link to="/alerts" className="block">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View All Alerts ({recentAlerts.length})
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Active Hazards List */}
        <Card className="mb-6 fade-in-up">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Nearby Hazards</CardTitle>
              <Link to="/map">
                <Button variant="outline" size="sm">View Map</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeHazards.slice(0, 3).map((hazard) => (
                <div key={hazard.id} className="flex items-start gap-3 p-4 rounded-xl border bg-muted/30 active:bg-muted/50 transition-colors touch-action-manipulation">
                  <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${
                    hazard.severity === 'critical' ? 'bg-emergency pulse-emergency' :
                    hazard.severity === 'high' ? 'bg-warning' : 'bg-safe'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm leading-tight">{hazard.title}</h3>
                      <Badge className={`status-${getSeverityColor(hazard.severity)} text-xs`}>
                        {hazard.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{hazard.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {hazard.location.address.split(',')[0]}
                      </span>
                      <span>{hazard.reportCount} reports</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link to="/map" className="block">
            <Card className="border-primary/20 bg-primary/5 active:bg-primary/10 transition-colors touch-action-manipulation">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Find Safety</h3>
                <p className="text-xs text-muted-foreground mt-1">Locate safe places</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/profile" className="block">
            <Card className="border-secondary/20 bg-secondary/5 active:bg-secondary/10 transition-colors touch-action-manipulation">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-sm">My Profile</h3>
                <p className="text-xs text-muted-foreground mt-1">Score: {mockUser.credibilityScore}</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Community Stats */}
        <Card className="fade-in-up">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Community Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-primary">2.3k</div>
                <div className="text-xs text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-xl font-bold text-safe">142</div>
                <div className="text-xs text-muted-foreground">Reports Today</div>
              </div>
              <div>
                <div className="text-xl font-bold text-secondary">4</div>
                <div className="text-xs text-muted-foreground">Safe Places</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;