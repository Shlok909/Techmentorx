
export type DonationStatus = 'POSTED' | 'ACCEPTED' | 'PICKED_UP' | 'DELIVERED';

export interface Donation {
  id: string;
  itemName: string;
  location: string;
  status: DonationStatus;
  createdAt: string;
}
