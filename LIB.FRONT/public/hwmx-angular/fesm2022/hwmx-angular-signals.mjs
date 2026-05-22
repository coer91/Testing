import { signal, computed } from '@angular/core';
import { Screen, Tools } from 'hwmx-angular/tools';

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

const navigationKeysSIGNAL = computed(() => {
    const NAVIGATION_KEYS = new Map();
    for (const LV1 of navigationSIGNAL()) {
        //Level 1
        if (Tools.IsNotOnlyWhiteSpace(LV1?.Path)) {
            NAVIGATION_KEYS.set(LV1.Path, (Tools.IsNotOnlyWhiteSpace(LV1.ActiveKey) ? `${LV1.ActiveKey}`.toUpperCase() : ''));
        }
        else if (Tools.IsNotNull(LV1.Items)) {
            for (const LV2 of LV1.Items) {
                //Level 2
                if (Tools.IsNotOnlyWhiteSpace(LV2?.Path)) {
                    NAVIGATION_KEYS.set(LV2.Path, (Tools.IsNotOnlyWhiteSpace(LV2.ActiveKey) ? `${LV2.ActiveKey}`.toUpperCase() : ''));
                }
                else if (Tools.IsNotNull(LV2.Items)) {
                    for (const LV3 of LV2.Items) {
                        //Level 3
                        if (Tools.IsNotOnlyWhiteSpace(LV3?.Path)) {
                            NAVIGATION_KEYS.set(LV3.Path, (Tools.IsNotOnlyWhiteSpace(LV3.ActiveKey) ? `${LV3.ActiveKey}`.toUpperCase() : ''));
                        }
                    }
                }
            }
        }
    }
    return NAVIGATION_KEYS;
}, ...(ngDevMode ? [{ debugName: "navigationKeysSIGNAL" }] : /* istanbul ignore next */ []));

const userImageSIGNAL = signal('', ...(ngDevMode ? [{ debugName: "userImageSIGNAL" }] : /* istanbul ignore next */ []));

const userSIGNAL = signal(null, ...(ngDevMode ? [{ debugName: "userSIGNAL" }] : /* istanbul ignore next */ []));

/**
 * Generated bundle index. Do not edit.
 */

export { environmentSIGNAL, isLoadingSIGNAL, navigationKeysSIGNAL, navigationSIGNAL, screenSizeSIGNAL, selectedMenuSIGNAL, userImageSIGNAL, userSIGNAL };
//# sourceMappingURL=hwmx-angular-signals.mjs.map
