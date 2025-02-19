import { Ticket } from '../../models/Ticket';
import { InferSchemaType } from 'mongoose';
enum Products {
  IPAD = 'iPad',
  IPOD = 'iPod',
  IMAC = 'iMac',
  MACBOOKPRO = 'Macbook Pro',
  IPHONE = 'iPhone',
}
export interface CreateTicketDto {
  product: Products;
  description: string;
}

export type UpdateTicketDto = Partial<InferSchemaType<typeof Ticket>>;
