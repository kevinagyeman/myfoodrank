import { DishSchema } from '@/types/dish-schema';
import { atom } from 'recoil';

const dishData: DishSchema = {
  id: '',
};

export const initDishData: DishSchema = dishData;

export const dishDataState = atom({
  key: 'dishDataState',
  default: dishData,
});

const dishesList: DishSchema[] = [];

export const dishesListState = atom({
  key: 'dishesListState',
  default: dishesList,
});
