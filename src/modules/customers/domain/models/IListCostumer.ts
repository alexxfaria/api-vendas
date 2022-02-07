import Customers from '@modules/customers/infra/typeorm/entities/Customers';

export interface IListCostumer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customers[];
}
