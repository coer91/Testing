import { signal } from '@angular/core'; 
import { IEnvironments } from 'hwmx-angular/interfaces';

export const environmentSIGNAL = signal<IEnvironments>({
    info: '' as any,
    isDevelopment: false,
    isStaging: false,
    isProduction: false 
});