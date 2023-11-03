import { Timestamp } from 'firebase/firestore';

export type RestaurantSchema = {
  id: string;
  name?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  additionalInfo?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
