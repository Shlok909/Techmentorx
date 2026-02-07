
export type DonationStatus = 'Posted' | 'Claimed';

export interface Donation {
  id: string;
  itemName: string;
  location: string;
  status: DonationStatus;
  createdAt: string;
}
