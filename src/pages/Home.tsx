import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin, Shield, Users, Plus, Bell } from 'lucide-react';
import { mockHazardReports, mockAlerts, mockUser } from '@/data/mockData';
import heroImage from '@/assets/harbor-hero.jpg';

const Home = () => {
  const [activeHazards] = useState(mockHazardReports.filter(report => report.verified));
  const [recentAlerts] = useState(mockAlerts.filter(alert => !alert.read));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'emergency';
      case 'high': return 'warning';
      case 'medium': return 'warning';
      case 'low': return 'safe';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-br from-primary to-secondary overflow-hidden">
        <img 
          src={heroImage} 
          alt="Harbor Emergency Response Platform"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Harbor
          </h1>
          <p className="text-white/90 text-lg mb-6 max-w-md">
            Coastal Emergency Response Platform
          </p>
          <Link to="/report">
            <Button variant="emergency" size="lg" className="shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              Report Hazard
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <AlertTriangle className="w-8 h-8 text-emergency mx-auto mb-2" />
              <div className="text-2xl font-bold text-emergency">{activeHazards.length}</div>
              <div className="text-sm text-muted-foreground">Active Hazards</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <Shield className="w-8 h-8 text-safe mx-auto mb-2" />
              <div className="text-2xl font-bold text-safe">4</div>
              <div className="text-sm text-muted-foreground">Safe Places</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">2.3k</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <MapPin className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-secondary">{mockUser.credibilityScore}</div>
              <div className="text-sm text-muted-foreground">Your Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        {recentAlerts.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Recent Alerts
                  </CardTitle>
                  <CardDescription>Important notifications in your area</CardDescription>
                </div>
                <Link to="/alerts">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.slice(0, 2).map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    alert.severity === 'emergency' ? 'bg-emergency pulse-emergency' :
                    alert.severity === 'warning' ? 'bg-warning' : 'bg-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <Badge variant={alert.severity === 'emergency' ? 'destructive' : 'secondary'} className="text-xs">
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Active Hazards */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Hazards</CardTitle>
                <CardDescription>Current verified reports in your area</CardDescription>
              </div>
              <Link to="/map">
                <Button variant="outline" size="sm">View on Map</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeHazards.slice(0, 3).map((hazard) => (
                <div key={hazard.id} className="flex items-start gap-4 p-4 rounded-lg border">
                  <div className={`w-4 h-4 rounded-full mt-1 ${
                    hazard.severity === 'critical' ? 'bg-emergency' :
                    hazard.severity === 'high' ? 'bg-warning' : 'bg-safe'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{hazard.title}</h3>
                      <Badge className={`status-${getSeverityColor(hazard.severity)}`}>
                        {hazard.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{hazard.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {hazard.location.address}
                      </span>
                      <span>{hazard.reportCount} reports</span>
                      <span>{new Date(hazard.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Report</CardTitle>
              <CardDescription>Report a hazard happening now</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/report" className="block">
                <Button variant="ocean" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Report New Hazard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Find Safety</CardTitle>
              <CardDescription>Locate safe places nearby</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/map" className="block">
                <Button variant="coast" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Safe Places
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;