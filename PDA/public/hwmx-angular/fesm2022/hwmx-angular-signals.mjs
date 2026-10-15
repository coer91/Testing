import { signal } from '@angular/core';
import { Screen } from 'hwmx-angular/tools';

const dateServerSIGNAL = signal(null, ...(ngDevMode ? [{ debugName: "dateServerSIGNAL" }] : /* istanbul ignore next */ []));
const dateUtcServerSIGNAL = signal(null, ...(ngDevMode ? [{ debugName: "dateUtcServerSIGNAL" }] : /* istanbul ignore next */ []));

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

export { dateServerSIGNAL, dateUtcServerSIGNAL, environmentSIGNAL, isLoadingSIGNAL, navigationSIGNAL, screenSizeSIGNAL, selectedMenuSIGNAL, userImageSIGNAL, userSIGNAL };
//# sourceMappingURL=hwmx-angular-signals.mjs.map
