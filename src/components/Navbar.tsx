"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, HeartHandshake, Search } from 'lucide-react';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleResetRole = () => {
    localStorage.removeItem('mentorlink_role');
    router.push('/');
  };

  const isPublicPage = pathname === '/donations';

  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
            <HeartHandshake className="text-white w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">MentorLink</span>
        </Link>
        
        <div className="flex items-center gap-2">
          {!isPublicPage && (
            <Link href="/donations">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-primary">
                <Search className="w-4 h-4 mr-2" />
                View Public List
              </Button>
            </Link>
          )}
          
          <Button variant="ghost" size="sm" onClick={handleResetRole} className="text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4 mr-2" />
            Switch Role
          </Button>
        </div>
      </div>
    </nav>
  );
}
