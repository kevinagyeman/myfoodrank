import { scoreService } from '@/services/restaurant-score.service';
import { dishesListState } from '@/store/dishes-store';
import { restaurantsScoreListState } from '@/store/restaurants-score-store';
import { DishSchema } from '@/types/dish-schema';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function DishSearch() {
  const [dishesList, setDishesList] = useRecoilState(dishesListState);
  const setRankedRestaurantsList = useSetRecoilState(restaurantsScoreListState);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDishesListVisible, setIsDishesListVisible] =
    useState<boolean>(false);

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
      setRankedRestaurantsList(data);
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
          <Command
            className='rounded-lg border shadow-md max-h-[300px] overflow-scroll'
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
                      onClick={() => {
                        getRankedRestaurants(dish.id);
                      }}
                    >
                      {dish.name}
                    </button>
                  </CommandItem>
                ))}
              </CommandList>
            )}
          </Command>
        </div>
        <div className='justify-center flex flex-row flex-wrap gap-3'>
          <Button size={'lg'}>Cerca un Piatto</Button>
          <Button size={'lg'} variant='secondary' asChild>
            <Link to='/update-score'>Valuta un Piatto</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
