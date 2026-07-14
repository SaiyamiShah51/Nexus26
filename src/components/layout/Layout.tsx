import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Map, 
  Navigation, 
  AlertTriangle, 
  Users, 
  Settings, 
  Bot, 
  Activity,
  Menu,
  Leaf
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { ScrollArea } from '../ui/scroll-area';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Fan Dashboard', path: '/fan-dashboard', icon: Home },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Bot },
    { name: 'Crowd Map', path: '/crowd-map', icon: Map },
    { name: 'Navigation', path: '/navigation', icon: Navigation },
    { name: 'Emergency', path: '/emergency', icon: AlertTriangle },
    { name: 'Volunteers', path: '/volunteer', icon: Users },
    { name: 'Operations', path: '/operations', icon: Activity },
    { name: 'Sustainability', path: '/sustainability', icon: Leaf },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card/50 backdrop-blur-xl border-r border-border">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary neon-shadow-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-foreground">FIFA AI</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-4">
        <nav className="flex flex-col gap-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                render={<Link to={item.path} onClick={() => setIsMobileMenuOpen(false)} />} nativeButton={false}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${isActive ? 'neon-shadow-primary' : ''}`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="p-4 mt-auto border-t border-border/50">
        <div className="flex items-center gap-3 px-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>FN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Fan Account</span>
            <span className="text-xs text-muted-foreground">VIP Access</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Navbar */}
        <header className="md:hidden h-16 border-b border-border/50 bg-card/50 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary neon-shadow-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold tracking-tight">FIFA AI</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => document.documentElement.classList.toggle('text-xl')} title="Toggle High Contrast / Accessibility">
              <span className="sr-only">Toggle Accessibility</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon"><Menu className="w-6 h-6" /></Button>} />
              <SheetContent side="left" className="p-0 w-72 bg-background border-r-border/50">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
