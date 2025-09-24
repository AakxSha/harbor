import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Award, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  AlertTriangle,
  Settings,
  Bell
} from 'lucide-react';
import { mockUser, mockHazardReports } from '@/data/mockData';

const Profile = () => {
  const [user] = useState(mockUser);
  const userReports = mockHazardReports.filter(report => report.userId === user.id);

  const getCredibilityLevel = (score: number) => {
    if (score >= 90) return { level: 'Expert', color: 'bg-safe', description: 'Highly trusted reporter' };
    if (score >= 75) return { level: 'Trusted', color: 'bg-primary', description: 'Reliable community member' };
    if (score >= 60) return { level: 'Active', color: 'bg-warning', description: 'Contributing member' };
    return { level: 'New', color: 'bg-secondary', description: 'Building reputation' };
  };

  const credibilityInfo = getCredibilityLevel(user.credibilityScore);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Your Harbor community profile</p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Info Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${credibilityInfo.color} text-white`}>
                        {credibilityInfo.level} Reporter
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Member since {new Date(user.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Credibility Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Credibility Score
                </CardTitle>
                <CardDescription>
                  Your trustworthiness as a community reporter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {user.credibilityScore}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {credibilityInfo.description}
                  </p>
                </div>
                
                <Progress value={user.credibilityScore} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-safe">{user.verifiedReports}</div>
                    <p className="text-sm text-muted-foreground">Verified Reports</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{user.totalReports}</div>
                    <p className="text-sm text-muted-foreground">Total Reports</p>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Accuracy Rate: <span className="font-medium text-safe">
                      {Math.round((user.verifiedReports / user.totalReports) * 100)}%
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>My Recent Reports</CardTitle>
                <CardDescription>Your latest hazard reports and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userReports.length > 0 ? userReports.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-start gap-4 p-4 rounded-lg border">
                      <div className={`w-4 h-4 rounded-full mt-1 ${
                        report.severity === 'critical' ? 'bg-emergency' :
                        report.severity === 'high' ? 'bg-warning' : 'bg-safe'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{report.title}</h3>
                          {report.verified ? (
                            <Badge className="bg-safe text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {report.location.address}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(report.timestamp).toLocaleDateString()}
                          </span>
                          <span>{report.reportCount} total reports</span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No reports yet</p>
                      <p className="text-sm text-muted-foreground">Start contributing to your community's safety</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {userReports.reduce((sum, report) => sum + report.reportCount, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">People helped by your reports</p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Month</span>
                    <Badge variant="outline">{userReports.length} reports</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <Badge className="bg-safe text-white">Fast</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Community Rank</span>
                    <Badge className="bg-primary text-white">Top 15%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 bg-safe rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">First Responder</p>
                    <p className="text-xs text-muted-foreground">Submitted 10+ verified reports</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Accuracy Expert</p>
                    <p className="text-xs text-muted-foreground">Maintained 80%+ accuracy</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-muted">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Community Hero</p>
                    <p className="text-xs text-muted-foreground">Help 100+ people (76/100)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Quick Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hazard Alerts</span>
                  <div className="w-8 h-4 bg-safe rounded-full relative">
                    <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alert Radius</span>
                  <Badge variant="outline">5 km</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emergency Only</span>
                  <div className="w-8 h-4 bg-muted rounded-full relative">
                    <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5" />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;