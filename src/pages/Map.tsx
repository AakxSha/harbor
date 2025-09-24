import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Search, 
  Filter, 
  Shield, 
  AlertTriangle, 
  Hospital, 
  Home,
  Navigation,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { mockHazardReports, mockSafePlaces, hazardTypes, severityLevels } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const Map = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'hazards' | 'safe-places' | 'both'>('both');
  const [showFilters, setShowFilters] = useState(false);

  const filteredHazards = mockHazardReports.filter(hazard => {
    const matchesType = selectedFilter === 'all' || hazard.type === selectedFilter;
    const matchesSeverity = selectedSeverity === 'all' || hazard.severity === selectedSeverity;
    const matchesSearch = hazard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hazard.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSeverity && matchesSearch && hazard.verified;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-emergency';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-safe';
      default: return 'bg-secondary';
    }
  };

  const getSafePlaceIcon = (type: string) => {
    switch (type) {
      case 'hospital': return <Hospital className="w-4 h-4" />;
      case 'shelter': return <Home className="w-4 h-4" />;
      case 'high-ground': return <MapPin className="w-4 h-4" />;
      case 'emergency-center': return <Shield className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
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
            <h1 className="text-lg font-bold">Live Map</h1>
            <p className="text-sm text-muted-foreground">Hazards & Safe Places</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="p-2">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search hazards or places..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-muted/50 border-b border-border">
          <div className="px-4 py-4 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={viewMode === 'both' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('both')}
                className="text-xs"
              >
                All
              </Button>
              <Button
                variant={viewMode === 'hazards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('hazards')}
                className="text-xs"
              >
                Hazards
              </Button>
              <Button
                variant={viewMode === 'safe-places' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('safe-places')}
                className="text-xs"
              >
                Safe Places
              </Button>
            </div>
            
            {/* Quick filter buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={selectedSeverity === 'critical' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => setSelectedSeverity(selectedSeverity === 'critical' ? 'all' : 'critical')}
                className="whitespace-nowrap"
              >
                Critical
              </Button>
              <Button
                variant={selectedSeverity === 'high' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSeverity(selectedSeverity === 'high' ? 'all' : 'high')}
                className="whitespace-nowrap"
              >
                High Risk
              </Button>
              <Button
                variant={selectedFilter === 'flood' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(selectedFilter === 'flood' ? 'all' : 'flood')}
                className="whitespace-nowrap"
              >
                Floods
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[calc(100vh-140px)]">
        {/* Map Area */}
        <div className="flex-1 relative">
          <Card className="h-full rounded-none border-x-0">
            <CardContent className="p-0 h-full">
              <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 relative overflow-hidden">
                {/* Mock map background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,.1)_10px,rgba(0,0,0,.1)_20px)]" />
                </div>
                
                {/* Map pins simulation */}
                <div className="relative z-10 w-full h-full">
                  {/* Hazard pins */}
                  {(viewMode === 'both' || viewMode === 'hazards') && filteredHazards.map((hazard, index) => (
                    <div
                      key={hazard.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${20 + (index % 3) * 30}%`,
                        top: `${30 + (index % 2) * 40}%`,
                      }}
                      onClick={() => setSelectedItem(hazard)}
                    >
                      <div className={`w-6 h-6 rounded-full ${getSeverityColor(hazard.severity)} border-2 border-white shadow-lg ${hazard.severity === 'critical' ? 'pulse-emergency' : ''} active:scale-110 transition-transform`} />
                    </div>
                  ))}
                  
                  {/* Safe place pins */}
                  {(viewMode === 'both' || viewMode === 'safe-places') && mockSafePlaces.map((place, index) => (
                    <div
                      key={place.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${60 + (index % 2) * 20}%`,
                        top: `${25 + (index % 3) * 25}%`,
                      }}
                      onClick={() => setSelectedItem(place)}
                    >
                      <div className="w-6 h-6 rounded-full bg-safe border-2 border-white shadow-lg active:scale-110 transition-transform" />
                    </div>
                  ))}
                  
                  {/* Current location */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg" />
                    <div className="text-xs text-center mt-1 text-primary font-medium">You</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Sheet - Selected Item Details */}
        {selectedItem && (
          <div className="bg-background border-t border-border">
            <div className="p-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {'severity' in selectedItem ? (
                      <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-safe/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {getSafePlaceIcon(selectedItem.type)}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm leading-tight">
                          {'title' in selectedItem ? selectedItem.title : selectedItem.name}
                        </h3>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)} className="p-1">
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {'severity' in selectedItem && (
                        <Badge className={`status-${getSeverityColor(selectedItem.severity).replace('bg-', '')} text-xs mb-2`}>
                          {selectedItem.severity.toUpperCase()}
                        </Badge>
                      )}
                      
                      <p className="text-xs text-muted-foreground mb-3">
                        {'description' in selectedItem ? selectedItem.description : 
                         'facilities' in selectedItem ? `Facilities: ${selectedItem.facilities.slice(0, 2).join(', ')}` : ''}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {selectedItem.location.address.split(',')[0]}
                        </span>
                        {'timestamp' in selectedItem && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(selectedItem.timestamp).toLocaleTimeString()}
                          </span>
                        )}
                      </div>
                      
                      <Button size="sm" variant="coast" className="w-full">
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Quick Stats Bar */}
        {!selectedItem && (
          <div className="bg-background/95 backdrop-blur-lg border-t border-border">
            <div className="px-4 py-3">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-emergency">{filteredHazards.length}</div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-safe">{mockSafePlaces.length}</div>
                  <div className="text-xs text-muted-foreground">Safe Places</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">5km</div>
                  <div className="text-xs text-muted-foreground">Radius</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;