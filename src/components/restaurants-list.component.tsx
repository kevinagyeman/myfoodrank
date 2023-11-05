import { scoreService } from '@/services/restaurant-score.service';
import { Button } from './ui/button';
import { restaurantService } from '@/services/restaurant.service';
import { dishService } from '@/services/dish.service';
import { useRecoilValue } from 'recoil';
import { restaurantsListState } from '@/store/restaurants-store';
import { RestaurantSchema } from '@/types/restaurant-schema';
import { RestaurantScoreSchema } from '@/types/restaurant-score-schema';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export default function RestaurantsList() {
  const rankedRestaurantsList = useRecoilValue(restaurantsListState);
  return (
    <>
      <div className='container max-w-3xl flex flex-col gap-y-5 py-10'>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant</TableHead>
              <TableHead>Dish</TableHead>
              <TableHead className='text-right'>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankedRestaurantsList.map(
              (restaurantScore: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>
                    {restaurantScore.restaurant.name}
                  </TableCell>
                  <TableCell className='font-medium'>
                    {restaurantScore.dish.name}
                  </TableCell>
                  <TableCell className='text-right'>
                    {restaurantScore.score}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
