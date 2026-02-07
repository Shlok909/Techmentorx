
"use client";

import { Donation, DonationStatus } from '@/types/donation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Package, Clock, CheckCircle2, Truck, Handshake, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DonationListProps {
  donations: Donation[];
  role: 'donor' | 'volunteer';
  onUpdateStatus?: (id: string, status: DonationStatus) => void;
}

export function DonationList({ donations, role, onUpdateStatus }: DonationListProps) {
  if (donations.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-dashed">
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
        <h3 className="text-lg font-medium text-muted-foreground">No donations posted yet</h3>
        <p className="text-sm text-muted-foreground/60">Be the first to share something!</p>
      </div>
    );
  }

  const getStatusConfig = (status: DonationStatus) => {
    switch (status) {
      case 'POSTED':
        return { label: 'Posted', variant: 'default' as const, color: 'bg-primary' };
      case 'ACCEPTED':
        return { label: 'Accepted', variant: 'secondary' as const, color: 'bg-blue-400' };
      case 'PICKED_UP':
        return { label: 'In Transit', variant: 'secondary' as const, color: 'bg-amber-400' };
      case 'DELIVERED':
        return { label: 'Delivered', variant: 'outline' as const, color: 'bg-green-500' };
      default:
        return { label: status, variant: 'outline' as const, color: 'bg-muted' };
    }
  };

  const getNextAction = (status: DonationStatus) => {
    switch (status) {
      case 'POSTED':
        return { label: 'Accept', nextStatus: 'ACCEPTED' as DonationStatus, icon: Handshake };
      case 'ACCEPTED':
        return { label: 'Pick Up', nextStatus: 'PICKED_UP' as DonationStatus, icon: Truck };
      case 'PICKED_UP':
        return { label: 'Deliver', nextStatus: 'DELIVERED' as DonationStatus, icon: CheckCircle };
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-4">
      {donations.map((donation) => {
        const statusConfig = getStatusConfig(donation.status);
        const action = getNextAction(donation.status);

        return (
          <Card key={donation.id} className={`overflow-hidden transition-all ${donation.status === 'DELIVERED' ? 'opacity-70 bg-muted/30' : 'hover:shadow-md'}`}>
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-4">
                <div className={`p-3 rounded-full shrink-0 h-fit ${donation.status === 'DELIVERED' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
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
                  variant={statusConfig.variant}
                  className={donation.status === 'POSTED' ? 'bg-secondary text-secondary-foreground font-medium' : ''}
                >
                  {statusConfig.label}
                </Badge>
                
                {role === 'volunteer' && action && (
                  <Button 
                    size="sm" 
                    onClick={() => onUpdateStatus?.(donation.id, action.nextStatus)}
                    className="bg-primary hover:bg-primary/90 text-white min-w-[100px]"
                  >
                    <action.icon className="w-4 h-4 mr-2" />
                    {action.label}
                  </Button>
                )}
                
                {donation.status === 'DELIVERED' && (
                  <div className="text-green-600 flex items-center gap-1 text-sm font-semibold px-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Complete
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
