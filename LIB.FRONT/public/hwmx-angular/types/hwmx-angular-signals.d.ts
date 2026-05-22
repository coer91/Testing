import * as _angular_core from '@angular/core';
import { IEnvironments, IScreenSize, IMenuSelected, IMenu, IUser } from 'hwmx-angular/interfaces';

declare const environmentSIGNAL: _angular_core.WritableSignal<IEnvironments>;

declare const isLoadingSIGNAL: _angular_core.WritableSignal<boolean>;

declare const screenSizeSIGNAL: _angular_core.WritableSignal<IScreenSize>;

declare const selectedMenuSIGNAL: _angular_core.WritableSignal<IMenuSelected | null>;

declare const navigationKeysSIGNAL: _angular_core.Signal<Map<string, string>>;

declare const navigationSIGNAL: _angular_core.WritableSignal<IMenu[]>;

declare const userImageSIGNAL: _angular_core.WritableSignal<string>;

declare const userSIGNAL: _angular_core.WritableSignal<IUser | null>;

export { environmentSIGNAL, isLoadingSIGNAL, navigationKeysSIGNAL, navigationSIGNAL, screenSizeSIGNAL, selectedMenuSIGNAL, userImageSIGNAL, userSIGNAL };
