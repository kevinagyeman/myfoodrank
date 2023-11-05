import { scoreService } from '@/services/restaurant-score.service';
import { dishesListState, initDishData } from '@/store/dishes-store';
import {
  initRestaurantData,
  restaurantsListState,
} from '@/store/restaurants-store';
import { DishSchema } from '@/types/dish-schema';
import { RestaurantSchema } from '@/types/restaurant-schema';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { dishService } from '../services/dish.service';
import { restaurantService } from '../services/restaurant.service';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { ChevronRight, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Link } from 'react-router-dom';

export default function UpdateScore() {
  const [dishesList, setDishesList] = useRecoilState(dishesListState);
  const [restaurantsList, setRestaurantsList] =
    useRecoilState(restaurantsListState);
  const [isDishesListVisible, setIsDishesListVisible] =
    useState<boolean>(false);
  const [isRestaurantsListVisible, setIsRestaurantsListVisible] =
    useState<boolean>(false);
  const [dish, setDish] = useState<DishSchema>(initDishData);
  const [restaurant, setRestaurant] =
    useState<RestaurantSchema>(initRestaurantData);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

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

  const getByDishAndRestaurant = async (
    dishId: string,
    restaurantId: string
  ) => {
    const data = await scoreService.getByDishAndRestaurant(
      dishId,
      restaurantId
    );
    if (data) {
      return data;
    } else {
      console.log('id non trovato');
    }
  };

  const updateScore = async (operator: '+' | '-') => {
    const scoreId = await getByDishAndRestaurant(dish.id, restaurant.id);
    if (scoreId) {
      await scoreService.updateScore(scoreId, operator);
      setRestaurant(initRestaurantData);
      setDish(initDishData);
      setTimeout(() => {
        setHasVoted(false);
      }, 2000);
      setHasVoted(true);
    }
  };

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
          <h3 className='text-2xl font-semibold mb-1'>
            Che pizza hai mangiato?
          </h3>
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
                      onClick={() => setDish({ ...dish, id: dish.id })}
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
          <h3 className='text-2xl font-semibold mb-1'>In quale ristorante?</h3>
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
                        onClick={() =>
                          setRestaurant({ ...restaurant, id: restaurant.id })
                        }
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
        {restaurant.id && dish.id && (
          <div className='justify-center flex flex-row flex-wrap gap-3'>
            <Button
              className='p-10'
              variant='secondary'
              onClick={() => updateScore('+')}
            >
              <ThumbsUp className='h-10 w-10' />
            </Button>
            <Button
              className='p-10'
              variant='secondary'
              onClick={() => updateScore('-')}
            >
              <ThumbsDown className='h-10 w-10' />
            </Button>
          </div>
        )}
        {hasVoted && (
          <div className='justify-center flex'>
            <Alert>
              <AlertTitle>Votazione completa</AlertTitle>
              <AlertDescription>
                Grazie per aver contribuito alla votazione
              </AlertDescription>
            </Alert>
          </div>
        )}
        <div className='justify-end flex flex-row flex-wrap gap-3'>
          <Button size={'sm'} variant='outline'>
            <Link to='/'>Torna alla home</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
