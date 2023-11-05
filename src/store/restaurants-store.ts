import { RestaurantSchema } from '@/types/restaurant-schema';
import { atom } from 'recoil';

const restaurantData: RestaurantSchema = {
  id: '',
};

export const initRestaurantData: RestaurantSchema = restaurantData;

export const restaurantDataState = atom({
  key: 'restaurantDataState',
  default: restaurantData,
});

const restaurantsList: RestaurantSchema[] = [];

export const restaurantsListState = atom({
  key: 'restaurantsListState',
  default: restaurantsList,
});
