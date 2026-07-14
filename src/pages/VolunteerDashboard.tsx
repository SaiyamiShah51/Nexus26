import { useState } from 'react';
import { Users, CheckCircle, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { mockVolunteerTasks } from '../lib/mockData';

export default function VolunteerDashboard() {
  const [tasks, setTasks] = useState(mockVolunteerTasks);
  const [backupRequested, setBackupRequested] = useState(false);

  const updateTaskStatus = (id: string, newStatus: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Volunteer Portal</h1>
          <p className="text-muted-foreground">Team Alpha • Area: North Concourse</p>
        </div>
        <Badge variant="outline" className="px-4 py-1.5 border-primary text-primary bg-primary/10">
          <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" /> On Duty
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-secondary" /> AI Assigned Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card/50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      task.priority === 'Critical' ? 'bg-destructive/20 text-destructive' :
                      task.priority === 'High' ? 'bg-secondary/20 text-secondary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-muted-foreground">{task.id}</span>
                  </div>
                  <h4 className={`font-bold ${task.status === 'Completed' ? 'line-through text-muted-foreground' : ''}`}>{task.title}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                    <MapPin className="w-3 h-3" /> {task.location}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {task.status === 'Pending' && (
                    <Button 
                      variant="secondary" 
                      className="w-full sm:w-auto neon-shadow-secondary" 
                      size="sm"
                      onClick={() => updateTaskStatus(task.id, 'Accepted')}
                    >
                      Accept
                    </Button>
                  )}
                  {task.status === 'Accepted' && (
                    <Button 
                      className="w-full sm:w-auto neon-shadow-primary" 
                      size="sm"
                      onClick={() => updateTaskStatus(task.id, 'Completed')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" /> Complete
                    </Button>
                  )}
                  {task.status === 'Completed' && (
                    <Badge variant="outline" className="text-primary border-primary">
                      Done
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Shift Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono mb-2">04:12</div>
              <div className="text-sm text-muted-foreground mb-4">Hours completed (Target: 8:00)</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[52%]" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-primary/20">
             <CardContent className="p-6">
               <h3 className="font-bold mb-2">{backupRequested ? 'Backup En Route' : 'Need Help?'}</h3>
               <p className="text-sm text-muted-foreground mb-4">
                 {backupRequested 
                   ? 'A nearby volunteer has been notified and is heading to your location.'
                   : 'Can\'t complete a task? Request backup or speak with the supervisor AI.'}
               </p>
               <Button 
                 variant={backupRequested ? "secondary" : "outline"}
                 className="w-full"
                 disabled={backupRequested}
                 onClick={() => setBackupRequested(true)}
               >
                 {backupRequested ? 'Requested' : 'Request Backup'}
               </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
