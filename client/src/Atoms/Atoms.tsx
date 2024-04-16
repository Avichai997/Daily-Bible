import { IUser } from '@ApiService/Interfaces/IUser';
import { atom } from 'jotai';

// @ts-expect-error
export const UserAtom: IUser | null = atom(null);
