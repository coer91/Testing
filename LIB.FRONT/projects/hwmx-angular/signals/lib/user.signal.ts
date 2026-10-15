import { signal } from '@angular/core'; 
import { IUser } from 'hwmx-angular/interfaces';
export const userSIGNAL = signal<IUser | null>(null);