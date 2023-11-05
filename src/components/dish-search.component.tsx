import { dishesListState } from '@/store/dishes-store';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './ui/command';
import { useRecoilState } from 'recoil';
import { dishService } from '../services/dish.service';
import { useEffect, useState } from 'react';
import { DishSchema } from '@/types/dish-schema';
import { Button } from './ui/button';
import { restaurantsListState } from '../store/restaurants-store';
import { restaurantService } from '../services/restaurant.service';
import { scoreService } from '@/services/restaurant-score.service';

export default function DishSearch() {
  const [dishesList, setDishesList] = useRecoilState(dishesListState);
  const [restaurantsList, setRestaurantsList] =
    useRecoilState(restaurantsListState);
  const [searchValue, setSearchValue] = useState<string>('');
  const [dishId, setDishId] = useState<string>('');

  const getDishesList = async () => {
    const data = await dishService.getAll({
      fieldPath: 'name',
      directionStr: 'asc',
    });
    if (data) {
      setDishesList(data);
    }
  };

  const getRankedRestaurants = async (dishId: string) => {
    const data = await scoreService.getRankedRestaurants(dishId);
    if (data) {
      setRestaurantsList(data);
    }
  };

  useEffect(() => {
    getDishesList();
  }, []);

  return (
    <>
      <div className='container max-w-3xl flex flex-col gap-y-5 py-10'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold lg:text-5xl mb-5'>
            Trova un pizza
          </h1>
          <p className='text-muted-foreground text-lg'>Trova una pizza</p>
        </div>
        <div>
          <Command className='rounded-lg border shadow-md'>
            <CommandInput placeholder='Type a command or search...' />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {dishesList.map((dish: DishSchema, index: number) => (
                <CommandItem key={index}>
                  <button
                    className='w-full text-left'
                    onClick={() => {
                      getRankedRestaurants(dish.id);
                    }}
                  >
                    {dish.name}
                  </button>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </div>
        <div className='mx-auto'>
          <Button size={'lg'}>Cerca Piatto</Button>
        </div>
      </div>
    </>
  );
}
