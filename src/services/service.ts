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
  DocumentReference,
} from 'firebase/firestore';
import { db } from '../firebase';
import { RestaurantSchema } from '@/types/restaurant-schema';

const restaurantsCollection = collection(db, '/restaurants');
const restaurantsScoreCollection = collection(db, '/restaurantsScore');
const dishesCollection = collection(db, '/dishes');
const dishesCollectionId = doc(db, 'dishes', '7zvOdpeKjaexkQudl3fx');

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

const getClubById = async (clubDocRef: DocumentReference) => {
  try {
    const data = await getDoc(clubDocRef);
    if (data.exists()) {
      const result = { ...data.data(), id: data.id };
      return result;
    }
  } catch (error) {
    console.error(error);
  }
};

const getById = async (projectId: string) => {
  try {
    const data = await getDoc(doc(dishesCollection, projectId));
    if (data.exists()) {
      const result = { ...data.data(), id: data.id };
      return result;
    }
  } catch (error) {
    console.error(error);
  }
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
          where('dishId', '==', dishesCollectionId),
          orderBy('score', 'desc')
        )
      );
      const result = data.docs.map((doc) => ({
        ...doc.data(),
        dishId: getClubById(doc.data().dishId),
        id: doc.id,
      }));
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  },
};
