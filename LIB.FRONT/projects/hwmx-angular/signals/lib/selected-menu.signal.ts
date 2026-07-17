import { signal } from "@angular/core";
import { IMenuSelected } from "hwmx-angular/interfaces";
export const selectedMenuSIGNAL = signal<IMenuSelected | null>(null);