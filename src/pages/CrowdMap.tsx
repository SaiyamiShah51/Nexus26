import { useState } from 'react';
import { Map, MapPin, Users, Info, Coffee, DoorOpen, Cross } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockCrowdData } from '../lib/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';

export default function CrowdMap() {
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [showFacilities, setShowFacilities] = useState(false);

  const getZoneColor = (status: string) => {
    switch (status) {
      case 'High': return 'bg-destructive/80 border-destructive shadow-[0_0_15px_rgba(255,0,0,0.5)]';
      case 'Medium': return 'bg-yellow-500/80 border-yellow-500 shadow-[0_0_15px_rgba(255,200,0,0.5)]';
      case 'Low': return 'bg-primary/80 border-primary shadow-[0_0_15px_rgba(0,255,100,0.5)]';
      default: return 'bg-muted/80 border-muted';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Live Crowd Map</h1>
        <p className="text-muted-foreground">Interactive thermal density visualization</p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        <Card className="flex-1 glass flex flex-col overflow-hidden relative">
          <CardContent className="p-0 flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-background/50">
            {/* Abstract Stadium Map */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full max-w-md aspect-[3/4] border-4 border-border rounded-[100px] flex items-center justify-center bg-card/20 backdrop-blur-sm">
                <div className="w-2/3 h-1/2 border-2 border-primary/30 rounded-[40px] flex items-center justify-center">
                  <span className="text-muted-foreground font-bold tracking-widest text-sm">PITCH</span>
                </div>
                
                {/* Zones (Clickable overlays) */}
                <button 
                  onClick={() => { setSelectedZone(mockCrowdData.zones[0]); setShowFacilities(false); }}
                  className={`absolute top-0 w-3/4 h-1/4 rounded-t-[96px] border-2 transition-all hover:brightness-110 ${getZoneColor(mockCrowdData.zones[0].status)}`}
                />
                <button 
                  onClick={() => { setSelectedZone(mockCrowdData.zones[1]); setShowFacilities(false); }}
                  className={`absolute bottom-0 w-3/4 h-1/4 rounded-b-[96px] border-2 transition-all hover:brightness-110 ${getZoneColor(mockCrowdData.zones[1].status)}`}
                />
                <button 
                  onClick={() => { setSelectedZone(mockCrowdData.zones[2]); setShowFacilities(false); }}
                  className={`absolute right-0 h-1/2 w-1/4 rounded-r-3xl border-2 transition-all hover:brightness-110 ${getZoneColor(mockCrowdData.zones[2].status)}`}
                />
                <button 
                  onClick={() => { setSelectedZone(mockCrowdData.zones[3]); setShowFacilities(false); }}
                  className={`absolute left-0 h-1/2 w-1/4 rounded-l-3xl border-2 transition-all hover:brightness-110 ${getZoneColor(mockCrowdData.zones[3].status)}`}
                />
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 p-3 rounded-lg glass flex gap-4 text-xs font-medium">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /> Low</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" /> Med</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive" /> High</div>
            </div>
          </CardContent>
        </Card>

        {/* Zone Details Panel */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {selectedZone ? (
              <motion.div
                key={selectedZone.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <Card className="glass h-full border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{selectedZone.name}</span>
                      <Badge variant="outline" className={selectedZone.status === 'High' ? 'text-destructive border-destructive' : ''}>
                        {selectedZone.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Current Density</div>
                      <div className="text-4xl font-bold font-mono">{selectedZone.density}%</div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <h4 className="text-sm font-bold flex items-center gap-2 mb-2 text-primary">
                        <Info className="w-4 h-4" /> AI Recommendation
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedZone.status === 'High' 
                          ? `This zone is currently crowded. Consider using restrooms in Zone B and avoid Gate 2 for exit.`
                          : `Traffic is flowing smoothly. Concessions in this area currently have less than 5 minutes wait time.`
                        }
                      </p>
                    </div>

                    {showFacilities ? (
                      <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between p-2 rounded bg-card/50">
                           <div className="flex items-center gap-2 text-sm"><Coffee className="w-4 h-4 text-primary"/> Food Court A</div>
                           <span className="text-xs text-green-500 font-bold">3 min wait</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-card/50">
                           <div className="flex items-center gap-2 text-sm"><DoorOpen className="w-4 h-4 text-primary"/> Restrooms</div>
                           <span className="text-xs text-yellow-500 font-bold">8 min wait</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-card/50">
                           <div className="flex items-center gap-2 text-sm"><Cross className="w-4 h-4 text-destructive"/> First Aid</div>
                           <span className="text-xs text-green-500 font-bold">Available</span>
                        </div>
                        <Button variant="outline" className="w-full mt-2" onClick={() => setShowFacilities(false)}>Hide Facilities</Button>
                      </div>
                    ) : (
                      <Button className="w-full neon-shadow-primary mt-auto" onClick={() => setShowFacilities(true)}>
                        View Facilities in Zone
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full glass rounded-xl flex flex-col items-center justify-center p-8 text-center border-dashed border-2 text-muted-foreground">
                <Map className="w-12 h-12 mb-4 opacity-50" />
                <p>Select a zone on the map to view live analytics and AI recommendations.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
