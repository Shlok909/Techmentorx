
"use client";

import { Donation } from '@/types/donation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Package, Clock, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DonationListProps {
  donations: Donation[];
  role: 'donor' | 'volunteer';
  onClaim?: (id: string) => void;
}

export function DonationList({ donations, role, onClaim }: DonationListProps) {
  if (donations.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-dashed">
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
        <h3 className="text-lg font-medium text-muted-foreground">No donations posted yet</h3>
        <p className="text-sm text-muted-foreground/60">Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {donations.map((donation) => (
        <Card key={donation.id} className={`overflow-hidden transition-all ${donation.status === 'Claimed' ? 'opacity-60 bg-muted/30' : 'hover:shadow-md'}`}>
          <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className={`p-3 rounded-full shrink-0 h-fit ${donation.status === 'Claimed' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                <Package className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-lg leading-none">{donation.itemName}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {donation.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(donation.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge 
                variant={donation.status === 'Posted' ? 'default' : 'outline'}
                className={donation.status === 'Posted' ? 'bg-secondary text-secondary-foreground font-medium' : ''}
              >
                {donation.status}
              </Badge>
              
              {role === 'volunteer' && donation.status === 'Posted' && (
                <Button 
                  size="sm" 
                  onClick={() => onClaim?.(donation.id)}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Claim
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
