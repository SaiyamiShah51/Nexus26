import { Activity, Users, CloudRain, Shield, Trash2, Zap, AlertTriangle, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';
import { mockCrowdData } from '../lib/mockData';

const timeData = [
  { time: '12:00', attendance: 15000 },
  { time: '13:00', attendance: 25000 },
  { time: '14:00', attendance: 45000 },
  { time: '15:00', attendance: 58000 },
  { time: '16:00', attendance: 64500 },
  { time: '17:00', attendance: 65000 },
];

export default function OperationsDashboard() {
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    // Also scroll the layout container if it's handling the scrolling
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16 relative">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Operations Command Center</h1>
        <p className="text-muted-foreground">Real-time stadium telemetry and AI insights</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Attendance', value: '64,500', color: 'text-primary' },
          { icon: Shield, label: 'Active Alerts', value: '3', color: 'text-destructive' },
          { icon: Zap, label: 'Energy Load', value: '84%', color: 'text-secondary' },
          { icon: CloudRain, label: 'Weather', value: 'Clear', color: 'text-muted-foreground' }
        ].map((stat, i) => (
          <Card key={i} className="glass">
            <CardContent className="p-6">
              <stat.icon className={`w-6 h-6 mb-4 ${stat.color}`} />
              <div className="text-3xl font-bold font-mono">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle>Attendance Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeData}>
                  <defs>
                    <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--primary)' }}
                  />
                  <Area type="monotone" dataKey="attendance" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorAttendance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Gate Density</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockCrowdData.gates} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                    cursor={{ fill: 'var(--muted)' }}
                  />
                  <Bar dataKey="density" fill="var(--secondary)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass lg:col-span-3 border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" /> Active Security & Medical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {[
                 { time: '16:42', type: 'Medical', loc: 'Block 114', desc: 'Heat exhaustion reported. Medics dispatched.', status: 'In Progress' },
                 { time: '16:35', type: 'Crowd Surge', loc: 'Gate 2', desc: 'Density exceeded 85%. Rerouting suggested.', status: 'Automated Response' },
               ].map((alert, i) => (
                 <div key={i} className="flex items-start justify-between p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                   <div>
                     <div className="flex items-center gap-3 mb-1">
                       <span className="font-bold text-destructive">{alert.type}</span>
                       <span className="text-xs text-muted-foreground">{alert.time}</span>
                     </div>
                     <div className="text-sm">{alert.desc}</div>
                     <div className="text-xs text-muted-foreground mt-2">Location: {alert.loc}</div>
                   </div>
                   <div className="text-xs font-bold px-2 py-1 rounded bg-background border border-border">
                     {alert.status}
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={scrollToBottom}
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg md:hidden z-50 neon-shadow-primary p-0 flex items-center justify-center"
      >
        <ArrowDown className="w-5 h-5" />
      </Button>
    </div>
  );
}
