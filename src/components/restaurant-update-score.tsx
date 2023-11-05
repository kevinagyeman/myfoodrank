import { scoreService } from '@/services/restaurant-score.service';
import { dishesListState } from '@/store/dishes-store';
import { restaurantsScoreListState } from '@/store/restaurants-score-store';
import { DishSchema } from '@/types/dish-schema';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dishService } from '../services/dish.service';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { restaurantsListState } from '@/store/restaurants-store';
import { restaurantService } from '../services/restaurant.service';
import { RestaurantSchema } from '@/types/restaurant-schema';

export default function UpdateScore() {
  const [dishesList, setDishesList] = useRecoilState(dishesListState);
  const [restaurantsList, setRestaurantsList] =
    useRecoilState(restaurantsListState);
  const [isDishesListVisible, setIsDishesListVisible] =
    useState<boolean>(false);
  const [isRestaurantsListVisible, setIsRestaurantsListVisible] =
    useState<boolean>(false);
  const [dishId, setDishId] = useState<string>('');
  const [restaurantId, setRestaurantId] = useState<string>('');
  const [restaurantScoreId, setRestaurantScoreId] = useState<string>('');

  const getDishesList = async () => {
    const data = await dishService.getAll({
      fieldPath: 'name',
      directionStr: 'asc',
    });
    if (data) {
      setDishesList(data);
    }
  };

  const getRestaurantsList = async () => {
    const data = await restaurantService.getAll({
      fieldPath: 'name',
      directionStr: 'asc',
    });
    if (data) {
      setRestaurantsList(data);
    }
  };

  const getByDishAndRestaurant = async () => {
    const data = await scoreService.getByDishAndRestaurant(
      dishId,
      restaurantId
    );
    if (data) {
      setRestaurantScoreId(data);
    } else {
      console.log('id non trovato');
    }
  };

  // const getScorex = async () => {
  //   await scoreService.updateScore();
  // };

  useEffect(() => {
    getRestaurantsList();
    getDishesList();
  }, []);

  return (
    <>
      <div className='container max-w-3xl flex flex-col gap-y-5 py-10'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold lg:text-5xl mb-5'>
            Valuta una pizza
          </h1>
          <p className='text-muted-foreground text-lg'>Trova una pizza</p>
        </div>
        <div>
          <h3 className='text-2xl font-semibold mb-1'>Che pizza?</h3>
          <Command
            className='rounded-lg border shadow-md'
            onMouseEnter={() => setIsDishesListVisible(true)}
            onMouseLeave={() => setIsDishesListVisible(false)}
          >
            <CommandInput placeholder='Type a command or search...' />
            {isDishesListVisible && (
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {dishesList.map((dish: DishSchema, index: number) => (
                  <CommandItem key={index}>
                    <button
                      className='w-full text-left'
                      onClick={() => setDishId(dish.id)}
                    >
                      {dish.name}
                    </button>
                  </CommandItem>
                ))}
              </CommandList>
            )}
          </Command>
        </div>
        <div>
          <h3 className='text-2xl font-semibold mb-1'>Che ristorante?</h3>
          <Command
            className='rounded-lg border shadow-md'
            onMouseEnter={() => setIsRestaurantsListVisible(true)}
            onMouseLeave={() => setIsRestaurantsListVisible(false)}
          >
            <CommandInput placeholder='Type a command or search...' />
            {isRestaurantsListVisible && (
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {restaurantsList.map(
                  (restaurant: RestaurantSchema, index: number) => (
                    <CommandItem key={index}>
                      <button
                        className='w-full text-left'
                        onClick={() => setRestaurantId(restaurant.id)}
                      >
                        {restaurant.name}
                      </button>
                    </CommandItem>
                  )
                )}
              </CommandList>
            )}
          </Command>
        </div>
        <div className='mx-auto'>
          <Button size={'lg'}>Cerca Piatto</Button>
        </div>
      </div>
    </>
  );
}
