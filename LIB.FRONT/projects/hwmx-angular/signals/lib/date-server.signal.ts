import { signal } from '@angular/core';  

export const dateServerSIGNAL    = signal<Date | null>(null);
export const dateUtcServerSIGNAL = signal<Date | null>(null);