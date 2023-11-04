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
import { OrderBySchema, WhereSchema } from './query-schema';

const restaurantsCollection = collection(db, '/restaurants');

const mappedRestaurants = (data: QuerySnapshot<DocumentData, DocumentData>) => {
  const result: RestaurantSchema[] = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return result;
};

export const restaurantService = {
  getAll: async (orderByValue: OrderBySchema, whereValue?: WhereSchema) => {
    try {
      const orderByQuery = orderBy(
        orderByValue.fieldPath,
        orderByValue.directionStr
      );
      if (whereValue) {
        const whereQuery = where(
          whereValue.fieldPath,
          whereValue.opStr,
          whereValue.value
        );
        const data = await getDocs(
          query(restaurantsCollection, whereQuery, orderByQuery)
        );
        return mappedRestaurants(data);
      } else {
        const data = await getDocs(query(restaurantsCollection, orderByQuery));
        console.log(mappedRestaurants(data));
        return mappedRestaurants(data);
      }
    } catch (error) {
      console.error(error);
    }
  },

  //   create: async (project: ProjectSchema) => {
  //     try {
  //       await addDoc(projectsCollection, {
  //         ...project,
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },

  //   delete: async (id: string) => {
  //     try {
  //       const data = doc(projectsCollection, id);
  //       await deleteDoc(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },

  //   update: async (projectId: string, project: ProjectSchema) => {
  //     try {
  //       const data = doc(projectsCollection, projectId);
  //       await updateDoc(data, {
  //         ...project,
  //         updatedAt: new Date(),
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },

  getById: async (restaurantId: DocumentReference) => {
    try {
      const data = await getDoc(restaurantId);
      if (data.exists()) {
        const result: RestaurantSchema = { ...data.data(), id: data.id };
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  },
};
