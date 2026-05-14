import { navigationSIGNAL } from "./navigation.signal";
import { Tools } from "hwmx-angular/tools";
import { computed } from "@angular/core";

export const navigationKeysSIGNAL = computed(() => {
    const NAVIGATION_KEYS = new Map<string, string>();

    for(const LV1 of navigationSIGNAL()) {
        
        //Level 1
        if(Tools.IsNotOnlyWhiteSpace(LV1?.Path)) {
            NAVIGATION_KEYS.set(LV1.Path!, (Tools.IsNotOnlyWhiteSpace(LV1.ActiveKey) ? `${LV1.ActiveKey!}`.toUpperCase() : '')); 
        }

        else if(Tools.IsNotNull(LV1.Items)) {            
            for(const LV2 of LV1.Items!) {
                //Level 2
                if(Tools.IsNotOnlyWhiteSpace(LV2?.Path)) {
                    NAVIGATION_KEYS.set(LV2.Path!, (Tools.IsNotOnlyWhiteSpace(LV2.ActiveKey) ? `${LV2.ActiveKey!}`.toUpperCase() : '')); 
                }

                else if(Tools.IsNotNull(LV2.Items)) {  
                    for(const LV3 of LV2.Items!) {
                        //Level 3
                        if(Tools.IsNotOnlyWhiteSpace(LV3?.Path)) {
                            NAVIGATION_KEYS.set(LV3.Path!, (Tools.IsNotOnlyWhiteSpace(LV3.ActiveKey) ? `${LV3.ActiveKey!}`.toUpperCase() : '')); 
                        }
                    }
                }
            }
        }
    }

    return NAVIGATION_KEYS;
}); 