import { signal } from '@angular/core';
import { Screen } from 'hwmx-angular/tools';

const environmentSIGNAL = signal({
    info: '',
    isDevelopment: false,
    isStaging: false,
    isProduction: false
}, ...(ngDevMode ? [{ debugName: "environmentSIGNAL" }] : /* istanbul ignore next */ []));

const isLoadingSIGNAL = signal(false, ...(ngDevMode ? [{ debugName: "isLoadingSIGNAL" }] : /* istanbul ignore next */ []));

const screenSizeSIGNAL = signal({
    width: Screen.WINDOW_WIDTH,
    height: Screen.WINDOW_HEIGHT,
    breakpoint: Screen.BREAKPOINT
}, ...(ngDevMode ? [{ debugName: "screenSizeSIGNAL" }] : /* istanbul ignore next */ []));

const selectedMenuSIGNAL = signal(null, ...(ngDevMode ? [{ debugName: "selectedMenuSIGNAL" }] : /* istanbul ignore next */ []));

const navigationSIGNAL = signal([], ...(ngDevMode ? [{ debugName: "navigationSIGNAL" }] : /* istanbul ignore next */ []));

const userImageSIGNAL = signal('', ...(ngDevMode ? [{ debugName: "userImageSIGNAL" }] : /* istanbul ignore next */ []));

const userSIGNAL = signal(null, ...(ngDevMode ? [{ debugName: "userSIGNAL" }] : /* istanbul ignore next */ []));

/**
 * Generated bundle index. Do not edit.
 */

export { environmentSIGNAL, isLoadingSIGNAL, navigationSIGNAL, screenSizeSIGNAL, selectedMenuSIGNAL, userImageSIGNAL, userSIGNAL };
//# sourceMappingURL=hwmx-angular-signals.mjs.map
