import { Leaf, Droplets, Zap, Recycle, Wind, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

export default function SustainabilityDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight text-primary">Green Goal 2026</h1>
        <p className="text-muted-foreground">Live sustainability tracking for Match 52</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Zap, label: 'Energy from Solar', value: '68%', target: '70%' },
          { icon: Droplets, label: 'Water Recycled', value: '45k L', target: '50k L' },
          { icon: Recycle, label: 'Waste Diverted', value: '82%', target: '90%' },
          { icon: Wind, label: 'Carbon Offset', value: '120t', target: '150t' }
        ].map((metric, i) => (
          <Card key={i} className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
                {metric.label}
                <metric.icon className="w-4 h-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono text-primary mb-2">{metric.value}</div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>Target: {metric.target}</span>
              </div>
              <Progress value={75 + i * 5} className="h-1.5" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" /> AI Sustainability Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <ArrowDown className="w-4 h-4 text-primary" /> HVAC Optimization Suggested
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Based on the current weather (24°C, Clear) and stadium occupancy (64,500), 
              the AI recommends reducing AC output in Zones B and C by 15%. This will not affect fan 
              comfort and will save approximately 400 kWh over the next 2 hours.
            </p>
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg neon-shadow-primary">
                Apply Optimization
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <h4 className="font-bold mb-1">Smart Lighting</h4>
              <p className="text-sm text-muted-foreground">
                Corridor lights in empty zones have been automatically dimmed, saving 45 kWh.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <h4 className="font-bold mb-1">Waste Sorting Alert</h4>
              <p className="text-sm text-muted-foreground">
                Contamination detected in recyclables at Food Court East. Volunteers notified.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
