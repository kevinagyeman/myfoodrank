import { RestaurantSchema } from '@/types/restaurant-schema';
import { RestaurantScoreSchema } from '@/types/restaurant-score-schema';
import { atom } from 'recoil';

const restaurantScoreData: RestaurantSchema = {
  id: '',
};

export const initRestaurantScoreData: RestaurantSchema = restaurantScoreData;

export const restaurantDataState = atom({
  key: 'restaurantScoreDataState',
  default: restaurantScoreData,
});

const restaurantsScoreList: RestaurantScoreSchema[] = [];

export const restaurantsScoreListState = atom({
  key: 'restaurantsScoreListState',
  default: restaurantsScoreList,
});
