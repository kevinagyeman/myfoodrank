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
const restaurantsScoreCollection = collection(db, '/restaurantsScore');
const dishesCollection = collection(db, '/dishes');
const dishesCollectionId = doc(db, 'dishes', 'KkDvNkd1h6CZI8HkHSq4');

const mappedRestaurants = (data: QuerySnapshot<DocumentData, DocumentData>) => {
  const result = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return result;
};

const mappedRestaurants2 = (
  data: QuerySnapshot<DocumentData, DocumentData>
) => {
  const result = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return result;
};

export const service = {
  getAll: async () => {
    try {
      const data = await getDocs(query(restaurantsCollection));
      console.log(mappedRestaurants(data));
      return mappedRestaurants(data);
    } catch (error) {
      console.error(error);
    }
  },

  getRankedRestaurants: async () => {
    try {
      const data = await getDocs(
        query(
          restaurantsScoreCollection,
          where('dishId', '==', dishesCollectionId)
        )
      );
      console.log(mappedRestaurants2(data));

      return mappedRestaurants2(data);
    } catch (error) {
      console.error(error);
    }
  },
};
