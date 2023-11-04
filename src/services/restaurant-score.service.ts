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
  runTransaction,
} from 'firebase/firestore';
import { db } from '../firebase';
import { restaurantService } from './restaurant.service';
import { dishService } from './dish.service';
import { RestaurantScoreSchema } from '@/types/restaurant-score-schema';
import { WhereSchema } from './query-schema';

const restaurantsCollection = collection(db, '/restaurants');
const restaurantsScoreCollection = collection(db, '/restaurantsScore');
const dishesCollection = collection(db, '/dishes');
const dishesCollectionId = doc(db, 'dishes', '7zvOdpeKjaexkQudl3fx');
const restaurantsCollectionId = doc(db, 'restaurants', '88SPgU48YiEGVIjIr599');

const getById = async (docRef: DocumentReference) => {
  try {
    const data = await getDoc(docRef);
    const result = { ...data.data(), id: data.id };
    return result;
  } catch (error) {
    console.error(error);
  }
};

const mappedRestaurants = (data: QuerySnapshot<DocumentData, DocumentData>) => {
  const result = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return result;
};

export const scoreService = {
  updateScore: async (restaurantScoreId: string, operator: '+' | '-') => {
    try {
      const data = doc(restaurantsScoreCollection, restaurantScoreId);
      await runTransaction(db, async (transaction) => {
        const result = await transaction.get(data);
        if (result.exists()) {
          let newScore;
          if (operator === '-') {
            if (result.data().score > 0) {
              newScore = result.data().score - 1;
            } else {
              console.log('non puoi andare sotto 0');
            }
          } else {
            newScore = result.data().score + 1;
          }
          transaction.update(data, { score: newScore });
        }
      });
    } catch (error) {
      console.error(error);
    }
  },

  // update: async (
  //   restaurantScoreId: string,
  //   restaurantScore: RestaurantScoreSchema,
  //   count: number
  // ) => {
  //   try {
  //     const data = doc(restaurantsScoreCollection, restaurantScoreId);
  //     await updateDoc(data, {
  //       ...restaurantScore,
  //       score: count,
  //       updatedAt: new Date(),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },

  getByDishAndRestaurant: async (
    restaurantId?: DocumentReference,
    whereValue?: WhereSchema
  ) => {
    try {
      const data = await getDocs(
        query(
          restaurantsScoreCollection,
          where('restaurantId', '==', restaurantsCollectionId),
          where('dishId', '==', dishesCollectionId)
        )
      );
      const result = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(result);
      return result;
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

      const result = await Promise.all(
        data.docs.map(async (doc) => {
          const restaurant = await restaurantService.getById(
            doc.data().restaurantId
          );
          const dish = await dishService.getById(doc.data().dishId);

          return {
            id: doc.id,
            score: doc.data().score,
            restaurant: restaurant,
            dish: dish,
          };
        })
      );

      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  },
};
