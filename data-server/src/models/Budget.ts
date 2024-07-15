import { db } from '../config/database';

export interface Budget {
    id?: number;
    name: string;
    amount: bigint;
}

