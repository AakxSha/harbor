import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Camera, AlertTriangle, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { hazardTypes, severityLevels } from '@/data/mockData';

const Report = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    severity: '',
    title: '',
    description: '',
    location: {
      address: 'Marine Drive, Mumbai, Maharashtra', // Mock current location
      lat: 19.0760,
      lng: 72.8777
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.severity || !formData.title) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Report Submitted Successfully",
      description: "Your hazard report has been submitted and is being verified.",
      variant: "default",
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  const getSeverityColor = (severity: string) => {
    const level = severityLevels.find(s => s.value === severity);
    return level?.color || 'secondary';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Report Hazard</h1>
            <p className="text-muted-foreground">Help keep your community safe</p>
          </div>
        </div>

        {/* Report Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Hazard Report Form
            </CardTitle>
            <CardDescription>
              Provide accurate information to help authorities respond effectively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hazard Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Hazard Type *</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hazard type" />
                  </SelectTrigger>
                  <SelectContent>
                    {hazardTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <span className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          {type.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Severity */}
              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level *</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity level" />
                  </SelectTrigger>
                  <SelectContent>
                    {severityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${level.color}`} />
                          {level.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.severity && (
                  <Badge className={`status-${getSeverityColor(formData.severity)} w-fit`}>
                    {formData.severity.toUpperCase()} SEVERITY
                  </Badge>
                )}
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Report Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief, descriptive title of the hazard"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of what you're observing..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Current Location</Label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{formData.location.address}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Location detected automatically. Make sure this is accurate.
                </p>
              </div>

              {/* Media Upload */}
              <div className="space-y-2">
                <Label>Add Photo/Video (Optional)</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Tap to add photos or videos of the hazard
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Add Media
                  </Button>
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="w-full"
                  variant={formData.severity === 'critical' ? 'emergency' : 'ocean'}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Your report will be verified by our team and other users. 
                  Accurate reports improve your credibility score.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="max-w-2xl mx-auto mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Reporting Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be as specific as possible with your description</li>
              <li>• Include photos or videos when safe to do so</li>
              <li>• Report only what you can directly observe</li>
              <li>• Choose the appropriate severity level honestly</li>
              <li>• Ensure your location is accurate for proper alerts</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;