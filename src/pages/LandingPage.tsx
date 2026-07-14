import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Bot, Map, ShieldAlert, Activity, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const features = [
    { icon: Bot, title: "AI Assistant", desc: "Real-time answers for gates, food, and washrooms." },
    { icon: Map, title: "Smart Navigation", desc: "Live crowd density and turn-by-turn routing." },
    { icon: ShieldAlert, title: "Emergency Center", desc: "Instant SOS and volunteer coordination." },
    { icon: Activity, title: "Operations Hub", desc: "Stadium analytics and sustainability tracking." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary neon-shadow-primary flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tighter">
              NEXUS<span className="text-primary">26</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#live" className="hover:text-primary transition-colors">Live Match</a>
          </div>
          <Button render={<Link to="/fan-dashboard" />} nativeButton={false} className="neon-shadow-primary font-bold">
            Enter Stadium <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_20%)] opacity-20 blur-[100px]" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              World Cup 2026 Smart Stadium Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter leading-tight mb-8">
              Experience the Future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Football Operations
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              AI-powered crowd management, real-time navigation, and proactive emergency response 
              for a seamless World Cup experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button render={<Link to="/ai-assistant" />} nativeButton={false} size="lg" className="w-full sm:w-auto h-14 px-8 text-lg neon-shadow-primary">
                <Bot className="w-5 h-5 mr-2" /> Talk to AI
              </Button>
              <Button render={<Link to="/operations" />} nativeButton={false} size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg glass border-border/50">
                <Activity className="w-5 h-5 mr-2" /> View Analytics
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Match Banner */}
      <section id="live" className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 blur-[80px] rounded-full" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-2">Quarter Finals - Match 52</h3>
                <p className="text-muted-foreground">Stadium Azteca • 65,000 Attendees</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold">MEX</div>
                </div>
                <div className="px-4 py-2 bg-background/50 rounded-xl font-mono text-2xl font-bold border border-border">
                  2 - 1
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">BRA</div>
                </div>
              </div>
              <Button render={<Link to="/fan-dashboard" />} nativeButton={false} variant="secondary" className="neon-shadow-secondary">
                My Tickets
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Powered by Gemini AI</h2>
            <p className="text-muted-foreground text-lg">Comprehensive tools for every role in the stadium.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-3xl border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <feat.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-muted-foreground">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 text-center text-muted-foreground glass">
        <p>Prototype built for FIFA World Cup 2026 Hackathon • Powered by Google Gemini</p>
      </footer>
    </div>
  );
}
