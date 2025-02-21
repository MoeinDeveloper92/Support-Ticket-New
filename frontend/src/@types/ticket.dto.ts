export enum Product {
  IPHONE = 'iPhone',
  IPAD = 'iPad',
  IPOD = 'iPod',
  IMAC = 'iMac',
  MACBOOKPRO = 'Macbook pro',
}

export interface ResponseFromServerAfterTicketCreation {
  data: Ticket | Ticket[];
  success: true;
}
export interface Ticket {
  _id?: string;
  product?: Product;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: string;
  status?: string;
  _v?: number;
}
export interface CreateTicketDto {
  product: Product;
  description: string;
}
