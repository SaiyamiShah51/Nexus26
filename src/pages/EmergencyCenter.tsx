import { useState } from 'react';
import { ShieldAlert, Flame, Stethoscope, Search, Activity, Phone, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function EmergencyCenter() {
  const [reportedType, setReportedType] = useState<string | null>(null);
  const [isSosActive, setIsSosActive] = useState(false);

  const emergencies = [
    { icon: Stethoscope, title: "Medical", desc: "Heatstroke, injuries, allergic reactions", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30", btnColor: "border-blue-500" },
    { icon: Flame, title: "Fire / Smoke", desc: "Fire hazards, smoke detection", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30", btnColor: "border-orange-500" },
    { icon: Search, title: "Lost Child", desc: "Report separated family members", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30", btnColor: "border-purple-500" },
    { icon: Activity, title: "Crowd Surge", desc: "Dangerous crowding or crushing", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", btnColor: "border-destructive" },
    { icon: ShieldAlert, title: "Suspicious", desc: "Unattended bags, suspicious behavior", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30", btnColor: "border-yellow-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="text-center space-y-2 mb-10">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-4xl font-heading font-bold tracking-tight text-destructive">Emergency Center</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          If you or someone around you is in immediate danger, use the buttons below to alert the nearest response team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emergencies.map((em, idx) => (
          <Card key={idx} className={`glass border-border hover:${em.border} transition-colors cursor-pointer group`}>
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-xl ${em.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <em.icon className={`w-6 h-6 ${em.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">{em.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{em.desc}</p>
              
              {reportedType === em.title ? (
                <Button variant="secondary" className="w-full bg-green-500/20 text-green-500 border-none">
                  <CheckCircle className="w-4 h-4 mr-2" /> Dispatched
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className={`w-full ${em.btnColor}`}
                  onClick={() => setReportedType(em.title)}
                >
                  Report {em.title}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className={`glass mt-12 transition-colors ${isSosActive ? 'bg-destructive/20 border-destructive shadow-[0_0_30px_rgba(255,0,0,0.3)]' : 'border-destructive bg-destructive/5'}`}>
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{isSosActive ? 'SOS Dispatched' : 'Automated SOS'}</h3>
            <p className="text-sm text-muted-foreground">
              {isSosActive 
                ? 'Response teams have been alerted with your exact location. Stay where you are if it is safe to do so.'
                : 'Pressing the SOS button will immediately dispatch the nearest medical and security personnel to your exact GPS location.'}
            </p>
          </div>
          <Button 
            size="lg" 
            onClick={() => setIsSosActive(true)}
            disabled={isSosActive}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-16 px-12 text-xl font-bold neon-shadow-primary w-full md:w-auto rounded-full"
          >
            {isSosActive ? (
              <><CheckCircle className="w-6 h-6 mr-3" /> TEAM EN ROUTE</>
            ) : (
              <><Phone className="w-6 h-6 mr-3" /> HOLD FOR SOS</>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
