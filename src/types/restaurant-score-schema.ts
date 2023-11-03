import { Timestamp } from 'firebase/firestore';

export type RestaurantScoreSchema = {
  id: string;
  restaurantId: string;
  dishId: string;
  score: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
