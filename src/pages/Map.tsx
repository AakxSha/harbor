import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Search, 
  Filter, 
  Shield, 
  AlertTriangle, 
  Hospital, 
  Home,
  Navigation,
  Clock
} from 'lucide-react';
import { mockHazardReports, mockSafePlaces, hazardTypes, severityLevels } from '@/data/mockData';

const Map = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'hazards' | 'safe-places' | 'both'>('both');

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
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Interactive Map</h1>
          <p className="text-muted-foreground">Real-time hazards and safe places</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Hazard Type</label>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {hazardTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Severity</label>
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">View</label>
                <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Hazards & Safe Places</SelectItem>
                    <SelectItem value="hazards">Hazards Only</SelectItem>
                    <SelectItem value="safe-places">Safe Places Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 relative overflow-hidden rounded-lg flex items-center justify-center">
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
                        <div className={`w-4 h-4 rounded-full ${getSeverityColor(hazard.severity)} border-2 border-white shadow-lg pulse-emergency`} />
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
                        <div className="w-4 h-4 rounded-full bg-safe border-2 border-white shadow-lg" />
                      </div>
                    ))}
                  </div>
                  
                  {/* Map center indicator */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <MapPin className="w-6 h-6 text-primary" />
      <div className="text-xs text-center mt-1 text-primary font-medium">You</div>
    </div>
    
    {/* Interactive Map Placeholder Text */}
    <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
      Interactive map view • Click pins for details
    </div>
  </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            {selectedItem ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {'type' in selectedItem ? (
                      <AlertTriangle className="w-5 h-5 text-warning" />
                    ) : (
                      getSafePlaceIcon(selectedItem.type)
                    )}
                    {'type' in selectedItem ? 'Hazard Details' : 'Safe Place Details'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Hazard details */}
                  {'severity' in selectedItem && (
                    <>
                      <div>
                        <h3 className="font-semibold">{selectedItem.title}</h3>
                        <Badge className={`status-${getSeverityColor(selectedItem.severity)} w-fit mt-1`}>
                          {selectedItem.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedItem.description}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {selectedItem.location.address}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {new Date(selectedItem.timestamp).toLocaleString()}
                        </div>
                        <div>Reports: {selectedItem.reportCount}</div>
                        <div>Reporter: {selectedItem.userName} (Score: {selectedItem.userCredibility})</div>
                      </div>
                    </>
                  )}

                  {/* Safe place details */}
                  {'facilities' in selectedItem && (
                    <>
                      <div>
                        <h3 className="font-semibold">{selectedItem.name}</h3>
                        <Badge variant="outline" className="mt-1">
                          {selectedItem.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {selectedItem.location.address}
                        </div>
                        {selectedItem.contact && (
                          <div>Contact: {selectedItem.contact}</div>
                        )}
                        {selectedItem.capacity && (
                          <div>Capacity: {selectedItem.capacity} people</div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm mb-2">Facilities:</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedItem.facilities.map((facility: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <Button className="w-full" variant="coast">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Click on any pin on the map to view details and get directions.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Map Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-medium text-sm mb-2">Hazard Severity</div>
                  <div className="space-y-1">
                    {severityLevels.map((level) => (
                      <div key={level.value} className="flex items-center gap-2 text-sm">
                        <div className={`w-3 h-3 rounded-full bg-${level.color}`} />
                        {level.label}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm mb-2">Safe Places</div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-safe" />
                    Shelters, Hospitals, High Ground
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;