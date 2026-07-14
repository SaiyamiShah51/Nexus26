import { useState } from 'react';
import { Search, Navigation2, MapPin, Coffee, Car, DoorOpen, Cross } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export default function IndoorNavigation() {
  const [destination, setDestination] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const categories = [
    { id: 'seat', name: 'My Seat', icon: MapPin },
    { id: 'restroom', name: 'Washroom', icon: DoorOpen },
    { id: 'food', name: 'Food Court', icon: Coffee },
    { id: 'parking', name: 'Parking', icon: Car },
    { id: 'medical', name: 'Medical', icon: Cross },
    { id: 'exit', name: 'Nearest Exit', icon: DoorOpen },
  ];

  const steps = [
    "Walk straight for 50m towards Concourse A",
    "Turn right at the Official Merch Store",
    "Take the escalator to Level 2",
    "Your destination is on the left"
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Indoor Navigation</h1>
        <p className="text-muted-foreground">Turn-by-turn routing with AR-ready guidance</p>
      </div>

      <div className="flex-1 grid md:grid-cols-3 gap-6 min-h-0">
        <div className="flex flex-col gap-4 overflow-y-auto pr-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search destination..." 
              className="w-full bg-card/50 border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <Card 
                key={cat.id}
                className={`glass cursor-pointer transition-colors hover:border-primary/50 ${destination === cat.name ? 'border-primary bg-primary/10' : ''}`}
                onClick={() => {
                  setDestination(cat.name);
                  setIsNavigating(false);
                }}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                  <cat.icon className={`w-6 h-6 ${destination === cat.name ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="text-sm font-medium">{cat.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <AnimatePresence>
            {destination && !isNavigating && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <Card className="glass border-primary/30 mt-4">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-1">{destination}</h3>
                    <p className="text-sm text-muted-foreground mb-4">Estimated time: 4 mins (250m)</p>
                    <Button onClick={() => setIsNavigating(true)} className="w-full neon-shadow-primary gap-2">
                      <Navigation2 className="w-4 h-4" /> Start Navigation
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Card className="md:col-span-2 glass flex flex-col relative overflow-hidden">
          <CardContent className="p-0 flex-1 relative bg-black/20 flex flex-col">
            {/* Map Area */}
            <div className="flex-1 relative flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-background/50">
              {isNavigating ? (
                <div className="relative w-full max-w-sm aspect-square border-2 border-primary/20 rounded-full flex items-center justify-center bg-card/50 backdrop-blur-md">
                   <div className="absolute w-3 h-3 bg-primary rounded-full neon-shadow-primary z-10" />
                   {/* Simulated path */}
                   <svg className="absolute inset-0 w-full h-full text-primary/50" viewBox="0 0 100 100">
                     <path d="M50 50 L 70 30 L 80 40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_1s_linear_infinite]" />
                   </svg>
                   <style>{`
                     @keyframes dash {
                       to { stroke-dashoffset: -8; }
                     }
                   `}</style>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a destination to view the route.</p>
                </div>
              )}
            </div>

            {/* Turn by turn panel */}
            <AnimatePresence>
              {isNavigating && (
                <motion.div 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  className="absolute bottom-0 left-0 w-full bg-card/90 backdrop-blur-xl border-t border-border p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-2xl font-bold font-heading text-primary">Head straight</div>
                      <div className="text-muted-foreground">towards Concourse A • 50m</div>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                      <Navigation2 className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Next Steps</div>
                    {steps.slice(1).map((step, i) => (
                      <div key={i} className="flex gap-3 text-sm opacity-70">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5" />
                        {step}
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-6" onClick={() => setIsNavigating(false)}>
                    End Navigation
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
