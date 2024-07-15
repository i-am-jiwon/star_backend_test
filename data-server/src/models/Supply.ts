import { db } from '../config/database';

export interface Supply {
    id?: number;
    name: string;
    price: bigint;
}

