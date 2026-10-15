import { signal } from '@angular/core'; 
import { IScreenSize } from 'hwmx-angular/interfaces'; 
import { Screen } from 'hwmx-angular/tools';

export const screenSizeSIGNAL = signal<IScreenSize>({
    width: Screen.WINDOW_WIDTH,
    height: Screen.WINDOW_HEIGHT,
    breakpoint: Screen.BREAKPOINT
}); 