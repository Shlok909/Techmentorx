
"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, HeartHandshake, Search } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleResetRole = () => {
    localStorage.removeItem('mentorlink_role');
    router.push('/');
  };

  const isPublicPage = pathname === '/donations';

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
            <HeartHandshake className="text-white w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">MentorLink</span>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {!isPublicPage && (
            <Link href="/donations">
              <Button variant="ghost" size="sm" className="hidden md:flex text-muted-foreground hover:text-primary">
                <Search className="w-4 h-4 mr-2" />
                View Public List
              </Button>
            </Link>
          )}
          
          <div className="flex items-center gap-2 border-l pl-2 sm:pl-4 sm:ml-2">
            <ModeToggle />
            <Button variant="ghost" size="sm" onClick={handleResetRole} className="text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Switch Role</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
