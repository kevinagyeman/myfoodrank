import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { RestaurantSchema } from '@/types/restaurant-schema';

const restaurantsCollection = collection(db, '/restaurants');

const mappedRestaurants = (data: QuerySnapshot<DocumentData, DocumentData>) => {
  const result: RestaurantSchema[] = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return result;
};

export const projectService = {
  getAll: async () => {
    try {
      const data = await getDocs(query(restaurantsCollection));
      return mappedRestaurants(data);
    } catch (error) {
      console.error(error);
    }
  },
};
