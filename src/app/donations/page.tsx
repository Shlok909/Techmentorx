"use client";

import { Navbar } from '@/components/Navbar';
import { DonationList } from '@/components/DonationList';
import { useDonations } from '@/hooks/use-donations';
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PublicDonationsPage() {
  const { donations, isLoaded } = useDonations();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Search className="text-primary w-6 h-6" />
                <h1 className="text-3xl font-headline font-bold">Available Donations</h1>
              </div>
              <p className="text-muted-foreground">
                Browse educational resources available in your community.
              </p>
            </div>
            
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          {!isLoaded ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground animate-pulse font-medium">Loading available donations...</p>
            </div>
          ) : (
            <div className="bg-white/50 p-6 rounded-3xl border border-dashed border-primary/20">
              <DonationList donations={donations} role="donor" />
            </div>
          )}

          <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              How to get these items?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you see something you need, our student volunteers are working hard to deliver them. 
              Items are delivered to common campus locations or shared pick-up points. 
              Keep an eye on the status to see when an item is "In Transit" or "Delivered".
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
