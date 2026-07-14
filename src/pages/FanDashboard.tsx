import { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Ticket, MapPin, CloudSun, Car, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Link } from 'react-router-dom';
import { mockCrowdData, mockWeather, mockParkingData } from '../lib/mockData';

export default function FanDashboard() {
  const [isRerouted, setIsRerouted] = useState(false);
  const currentGate = mockCrowdData.gates.find(g => g.id === "G2");
  const myLot = mockParkingData.lots.find(l => l.id === "P2");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Welcome, Alex</h1>
          <p className="text-muted-foreground">Match Day: Mexico vs Brazil</p>
        </div>
        <Button render={<Link to="/ai-assistant" />} nativeButton={false} className="neon-shadow-primary gap-2">
          <Bot className="w-4 h-4" /> Ask AI Assistant
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Ticket Card */}
        <Card className="glass border-primary/20 lg:col-span-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-full bg-primary/10 -skew-x-12 translate-x-8 group-hover:translate-x-0 transition-transform" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-primary" /> Digital Pass
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Match 52</div>
                  <div className="text-2xl font-bold font-heading">MEX vs BRA</div>
                </div>
                <div className="flex gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground">Gate</div>
                    <div className="text-xl font-bold text-primary">2</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Block</div>
                    <div className="text-xl font-bold">114</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Row/Seat</div>
                    <div className="text-xl font-bold">G / 42</div>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block p-2 bg-white rounded-lg">
                {/* Mock QR Code */}
                <div className="w-20 h-20 bg-black/90 [mask-image:repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_4px)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="glass border-secondary/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
            <Bot className="w-24 h-24" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-secondary">
              <Bot className="w-5 h-5" /> AI Insight
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <p className="text-sm">
              {isRerouted ? (
                <>Your digital pass has been updated. Please proceed to <strong>Gate 4</strong> for faster entry.</>
              ) : (
                <>Gate 2 is experiencing <span className="text-destructive font-bold">High Traffic</span>. We recommend using <strong>Gate 4</strong> which currently has a 5-minute wait time.</>
              )}
            </p>
            {!isRerouted && (
              <Button 
                variant="secondary" 
                className="w-full neon-shadow-secondary" 
                size="sm"
                onClick={() => setIsRerouted(true)}
              >
                Reroute to Gate 4
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Crowd Level */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" /> Your Gate Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Gate 2</span>
                <span className="text-destructive font-bold">{currentGate?.density}% Capacity</span>
              </div>
              <Progress value={currentGate?.density} className="h-2 [&_[data-slot=progress-indicator]]:bg-destructive" />
              <p className="text-xs text-muted-foreground mt-2">Est. Wait: 25 mins</p>
            </div>
          </CardContent>
        </Card>

        {/* Parking */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5 text-muted-foreground" /> Reserved Parking
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Lot 2 (General)</span>
                <span className="text-primary font-bold">{myLot?.available} Spots Left</span>
              </div>
              <Progress value={((myLot!.total - myLot!.available) / myLot!.total) * 100} className="h-2" />
              <div className="flex justify-between mt-4">
                 <Link to="/navigation" className="text-sm text-primary flex items-center hover:underline">
                  Get Directions <ArrowRight className="w-3 h-3 ml-1" />
                 </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-muted-foreground" /> Stadium Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{mockWeather.temp}°C</div>
                <div className="text-muted-foreground">{mockWeather.condition}</div>
              </div>
              <div className="text-sm space-y-1 text-right text-muted-foreground">
                <div>Wind: {mockWeather.windSpeed} km/h</div>
                <div>Humidity: {mockWeather.humidity}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
