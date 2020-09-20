import { Payment } from './payments.model';

export interface State {
    result: string;
    payments: Payment[];
    currentGrid: number[][];
    canLetterChange: boolean;
}