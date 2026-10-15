import { Component, inject, signal, viewChild } from "@angular/core";
import { MaterialFIFOService } from "./material-fifo.service";
import { LOT_INFORMATION_DTO } from "@appShared/interfaces"; 
import { WIAModal } from "hwmx-angular/components";
import { Section } from "hwmx-angular/tools";
import { Scanner } from "@appShared/tools";
import { ICallbackItem } from "hwmx-angular/interfaces";

@Component({
    selector: 'material-fifo',
    templateUrl: './material-fifo.component.html', 
    standalone: false
})
export class MaterialFIFO extends Section {

    //Elements
    protected modalRef = viewChild.required<WIAModal>('modalRef'); 

    //Inject   
    private service = inject(MaterialFIFOService);

    //Variables
    public readonly isOpen          = signal<boolean>(false);
    protected readonly defaultTitle = 'Material FIFO';
    protected readonly defaultIcon  = 'fa-solid fa-shapes'; 
    protected readonly title        = signal<string>(this.defaultTitle); 
    protected readonly dataSource   = signal<LOT_INFORMATION_DTO[]>([]);
  

    /** */
    public Open = () => this.modalRef().Open();
    

    /** */
    public Cancel() { 
        this.title.set(this.defaultTitle); 
        this.dataSource.set([]);
        this.isOpen.set(false);
    }


    /** */
    public async GetMaterialFIFO(scanner: string, exceptions: LOT_INFORMATION_DTO[]) {
        this.dataSource.set([]);
        let lotNumber = Scanner.DecodeProperty(scanner, 'LotNumber');
         
        let response = await this.service.GetMaterialFIFO(lotNumber); 
        
        response = [...response]
            .except(exceptions, 'LOT_NUMBER')
            .filter(item => !item.LOT_NUMBER.equals(lotNumber));

        if(response.length > 0) { 
            this.dataSource.set(response.map((item, index) => ({ ...item, index })));
            this.title.set(response[0].PART_NUMBER); 
        }

        else {
            this.title.set(this.defaultTitle); 
        }

        return [...this.dataSource()];
    }


    /** */
    protected color = (item: ICallbackItem<any>): any => { 
        return item.row.index == 0 ? 'success' : null;
    }
}