import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Camera, AlertTriangle, Send, X, CheckCircle } from 'lucide-react';
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
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border safe-area-inset-top">
        <div className="flex items-center gap-4 px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold">Report Hazard</h1>
            <p className="text-sm text-muted-foreground">Help keep your community safe</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 pb-24">
        {/* Emergency Warning */}
        <Card className="mb-6 border-emergency/20 bg-emergency/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emergency/10 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-emergency" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-emergency">Emergency Guidelines</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  If life-threatening, call emergency services first. Then report here to help others.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hazard Type */}
          <Card>
            <CardHeader className="pb-4">
              <Label className="text-base font-semibold">What type of hazard? *</Label>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-3">
                {hazardTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                    className={`p-4 rounded-xl border-2 text-left transition-all active:scale-95 ${
                      formData.type === type.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-medium text-sm">{type.label}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Severity Level */}
          <Card>
            <CardHeader className="pb-4">
              <Label className="text-base font-semibold">How severe is it? *</Label>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {severityLevels.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, severity: level.value }))}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all active:scale-95 ${
                      formData.severity === level.value
                        ? `border-${level.color} bg-${level.color}/10`
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full bg-${level.color}`} />
                      <div>
                        <div className="font-medium text-sm">{level.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {level.value === 'critical' && 'Immediate danger to life/property'}
                          {level.value === 'high' && 'Significant risk, avoid area'}
                          {level.value === 'medium' && 'Moderate risk, use caution'}
                          {level.value === 'low' && 'Minor risk, be aware'}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Title & Description */}
          <Card>
            <CardHeader className="pb-4">
              <Label className="text-base font-semibold">Describe what you see *</Label>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm text-muted-foreground">Brief title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Street flooding on Marine Drive"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-sm text-muted-foreground">Details (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you're observing in detail..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader className="pb-4">
              <Label className="text-base font-semibold">Location</Label>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Current Location</div>
                  <div className="text-xs text-muted-foreground">{formData.location.address}</div>
                </div>
                <div className="w-2 h-2 bg-safe rounded-full" />
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card>
            <CardHeader className="pb-4">
              <Label className="text-base font-semibold">Add Photo/Video</Label>
              <p className="text-sm text-muted-foreground">Optional but helps verification</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center">
                <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-4">
                  Tap to add photos or videos of the hazard
                </p>
                <Button type="button" variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="sticky bottom-20 bg-background/95 backdrop-blur-lg -mx-4 px-4 py-4 border-t border-border">
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold"
              variant={formData.severity === 'critical' ? 'emergency' : 'ocean'}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Submitting Report...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-3" />
                  Submit Emergency Report
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-safe" />
              Reporting Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Be as specific as possible with your description</p>
              <p>• Include photos or videos when safe to do so</p>
              <p>• Report only what you can directly observe</p>
              <p>• Choose the appropriate severity level honestly</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;