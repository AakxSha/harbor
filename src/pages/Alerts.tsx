import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  AlertTriangle, 
  Shield, 
  MapPin, 
  Clock,
  Filter,
  CheckCircle,
  Info,
  Settings
} from 'lucide-react';
import { mockAlerts } from '@/data/mockData';

const Alerts = () => {
  const [alerts] = useState(mockAlerts);
  const [activeTab, setActiveTab] = useState('all');

  const unreadAlerts = alerts.filter(alert => !alert.read);
  const emergencyAlerts = alerts.filter(alert => alert.severity === 'emergency');
  const warningAlerts = alerts.filter(alert => alert.severity === 'warning');

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'emergency': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <Bell className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency': return 'emergency';
      case 'warning': return 'warning';
      default: return 'primary';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'hazard': return 'emergency';
      case 'warning': return 'warning';
      case 'all-clear': return 'safe';
      default: return 'secondary';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const AlertCard = ({ alert }: { alert: typeof alerts[0] }) => (
    <Card className={`border-l-4 ${
      !alert.read ? 'bg-muted/20' : ''
    } ${
      alert.severity === 'emergency' ? 'border-l-emergency' :
      alert.severity === 'warning' ? 'border-l-warning' : 'border-l-primary'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full ${
            alert.severity === 'emergency' ? 'bg-emergency/10 text-emergency' :
            alert.severity === 'warning' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
          } ${alert.severity === 'emergency' && !alert.read ? 'pulse-emergency' : ''}`}>
            {getSeverityIcon(alert.severity)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{alert.title}</h3>
              {!alert.read && (
                <div className="w-2 h-2 bg-primary rounded-full" />
              )}
              <Badge className={`status-${getSeverityColor(alert.severity)}`}>
                {alert.severity.toUpperCase()}
              </Badge>
              <Badge variant="outline" className={`bg-${getAlertTypeColor(alert.type)}/10`}>
                {alert.type.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {alert.message}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTimeAgo(alert.timestamp)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {alert.location.radius}km radius
              </span>
            </div>
            
            {!alert.read && (
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">
                  Mark as Read
                </Button>
                <Button size="sm" variant="coast">
                  <MapPin className="w-4 h-4 mr-1" />
                  View on Map
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Alerts & Notifications</h1>
            <p className="text-muted-foreground">Stay informed about hazards in your area</p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Alert Settings
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Bell className="w-6 h-6 text-primary" />
                {unreadAlerts.length > 0 && (
                  <div className="w-3 h-3 bg-emergency rounded-full -ml-1 -mt-2 pulse-emergency" />
                )}
              </div>
              <div className="text-2xl font-bold text-primary">{unreadAlerts.length}</div>
              <div className="text-sm text-muted-foreground">Unread</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-6 h-6 text-emergency mx-auto mb-2" />
              <div className="text-2xl font-bold text-emergency">{emergencyAlerts.length}</div>
              <div className="text-sm text-muted-foreground">Emergency</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Bell className="w-6 h-6 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">{warningAlerts.length}</div>
              <div className="text-sm text-muted-foreground">Warning</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="w-6 h-6 text-safe mx-auto mb-2" />
              <div className="text-2xl font-bold text-safe">5km</div>
              <div className="text-sm text-muted-foreground">Alert Radius</div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="relative">
              All Alerts
              {alerts.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {alerts.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread" className="relative">
              Unread
              {unreadAlerts.length > 0 && (
                <Badge className="ml-2 text-xs bg-emergency text-white">
                  {unreadAlerts.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="emergency">
              Emergency
              {emergencyAlerts.length > 0 && (
                <Badge className="ml-2 text-xs bg-emergency text-white">
                  {emergencyAlerts.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="warnings">Warnings</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">All Alerts</h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Unread Alerts</h2>
              {unreadAlerts.length > 0 && (
                <Button variant="outline" size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              )}
            </div>
            {unreadAlerts.length > 0 ? (
              unreadAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-safe mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">You have no unread alerts.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="emergency" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-emergency" />
                Emergency Alerts
              </h2>
            </div>
            {emergencyAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </TabsContent>

          <TabsContent value="warnings" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5 text-warning" />
                Warning Alerts
              </h2>
            </div>
            {warningAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Alert Settings Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Alert Preferences
            </CardTitle>
            <CardDescription>
              Customize how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="font-medium text-sm">Notification Types</div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>• Hazard reports nearby</div>
                  <div>• Emergency alerts</div>
                  <div>• Weather warnings</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm">Alert Radius</div>
                <Badge className="bg-primary text-white">5 kilometers</Badge>
                <div className="text-xs text-muted-foreground">
                  Receive alerts within this distance
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm">Delivery Method</div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>• Push notifications</div>
                  <div>• In-app alerts</div>
                  <div>• Email summaries</div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="coast">
                <Settings className="w-4 h-4 mr-2" />
                Manage Alert Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;