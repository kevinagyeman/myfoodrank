import { Timestamp } from 'firebase/firestore';

export type DishSchema = {
  id: string;
  name?: string;
  additionalInfo?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
