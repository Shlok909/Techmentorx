
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RoleCard } from '@/components/RoleCard';
import { DonationList } from '@/components/DonationList';
import { useDonations } from '@/hooks/use-donations';
import { Heart, GraduationCap, HeartHandshake, Info } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HomePage() {
  const router = useRouter();
  const { donations, isLoaded } = useDonations();

  useEffect(() => {
    const role = localStorage.getItem('mentorlink_role');
    if (role === 'donor') router.push('/donor');
    if (role === 'volunteer') router.push('/volunteer');
  }, [router]);

  const selectRole = (role: 'donor' | 'volunteer') => {
    localStorage.setItem('mentorlink_role', role);
    router.push(`/${role}`);
  };

  const donorImg = PlaceHolderImages.find(i => i.id === 'donor-img')?.imageUrl || '';
  const volunteerImg = PlaceHolderImages.find(i => i.id === 'volunteer-img')?.imageUrl || '';

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6">
      <div className="max-w-4xl w-full text-center space-y-12 py-12">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="bg-primary p-3 rounded-2xl shadow-lg">
              <HeartHandshake className="text-white w-10 h-10" />
            </div>
          </div>
          <h1 className="text-5xl font-headline font-black text-primary tracking-tight">MentorLink</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connecting generous donors with dedicated student volunteers to empower education and community support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <RoleCard
            title="I am a Donor"
            description="I want to donate items like books, electronics, or equipment to students in need."
            icon={Heart}
            imageUrl={donorImg}
            variant="primary"
            onClick={() => selectRole('donor')}
          />
          <RoleCard
            title="I am a Volunteer"
            description="I am a student looking to claim donated items or volunteer my time to help the community."
            icon={GraduationCap}
            imageUrl={volunteerImg}
            variant="secondary"
            onClick={() => selectRole('volunteer')}
          />
        </div>

        {isLoaded && (
          <div className="mt-20 w-full text-left space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <Info className="text-primary w-6 h-6" />
                <h2 className="text-3xl font-headline font-bold">Available Donations</h2>
              </div>
              <p className="text-sm text-muted-foreground bg-white px-3 py-1 rounded-full border shadow-sm">
                Public View • Read Only
              </p>
            </div>
            
            <div className="bg-white/50 p-6 rounded-3xl border border-dashed border-primary/20">
              <DonationList donations={donations} role="donor" />
            </div>
          </div>
        )}
        
        <div className="pt-12 text-sm text-muted-foreground font-medium">
          Simple. Local. Community-focused.
        </div>
      </div>
    </div>
  );
}
