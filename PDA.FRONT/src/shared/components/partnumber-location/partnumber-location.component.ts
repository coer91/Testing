import { Component, inject, signal, viewChild } from "@angular/core";
import { MasterService } from "@appShared/services";
import { Scanner } from "@appShared/tools";
import { WIAModal } from "hwmx-angular/components";
import { Section } from "hwmx-angular/tools";

@Component({
    selector: 'partnumber-location',
    templateUrl: './partnumber-location.component.html', 
    standalone: false
})
export class PartNumberLocation extends Section {

    //Elements
    protected modalRef = viewChild.required<WIAModal>('modalRef'); 

    //Inject   
    private masterService = inject(MasterService);

    //Variables
    public readonly isOpen          = signal<boolean>(false);
    protected readonly defaultTitle = 'Location by Material';
    protected readonly defaultIcon  = 'iw-location';
    protected readonly title        = signal<string>(this.defaultTitle);
    protected readonly icon         = signal<string>(this.defaultIcon);
    protected readonly dataSource   = signal<any[]>([]);
  

    /** */
    public Open = () => this.modalRef().Open();
    

    /** */
    protected Cancel() {
        this.title.set(this.defaultTitle);
        this.icon.set(this.defaultIcon);
        this.dataSource.set([]);
        this.isOpen.set(false);
    }


    /** */
    public async GetMaterialLocation(scanner: string) {
        this.alert.CloseAllAlerts();

        this.dataSource.set([]);
        let partNumber = Scanner.DecodeProperty(scanner, 'PartNumber');
        if(partNumber.includes('TP'))  partNumber = partNumber.replaceAll('TP' , ''); 
        if(partNumber.includes('MTP')) partNumber = partNumber.replaceAll('MTP', ''); 
         
        const response = await this.masterService.GetLocationByMaterial(partNumber);

        if(response.length > 0) {
            this.title.set(partNumber);
            this.icon.set('iw-box-fill');
            this.dataSource.set(response);
        }

        else {
            this.alert.Warning('No Data', partNumber, 'iw-box-fill');
            this.title.set(this.defaultTitle);
            this.icon.set(this.defaultIcon);
        }
    }
}