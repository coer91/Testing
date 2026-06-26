import { ContainerService, ICaseLabelStatus } from './container-load.service';
import { Component, computed, inject, signal } from '@angular/core';   
import { MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools'; 

@Component({
    selector: 'container-load-page',
    templateUrl: './container-load.page.html', 
    standalone: false
})
export class ContainerLoadPage extends PagePDA {  
 
    constructor() { super('MM_IN0701') }  

    //Inject    
    private containerService = inject(ContainerService);  
    private masterService    = inject(MasterService); 

    
    //Variables       
    protected readonly dataSource = signal<ICaseLabelStatus[]>([]); 


    /**  */
    protected override async OnScanCode(scanner: string) {
       
        this.isLoading.set(true);      

        if(this.transaction().isOnlyWhiteSpace()) { 
            await this.GetDataSource(scanner);
        }

        else {
            await this.Check(scanner);
        } 

        this.isLoading.set(false);         
    }


    /** */
    protected indicator = computed(() => {
        return `${this.dataSource().filter(item => item.Status > 0).length} / ${ this.dataSource().length }`;
    });

    
    /** */
    protected async GetDataSource(scanner: string) {         
        
        this.dataSource.set([]);
        const response = await this.containerService.GetContainerLoad(scanner);
        
        if(response.ok) {  
            if(response.data.length > 0) { 
                if(response.data[0].CASE_LABEL_ID.equals('RELOAD CONTAINER')) {
                    await this.alert.WarningOk('Listo para recargar');
                }

                else {
                    this.dataSource.set(response.data); 
                }

                this.transaction.set(scanner);
            } 

            else this.alert.Warning('No Data', scanner, 'barcode'); 
        }  
    }


    /** */
    protected async Check(scanner: string) {
        scanner = Scanner.DecodeProperty(scanner, 'lotNumber');
        
        const DATA_SOURCE = [...this.dataSource()];
        const CASE = DATA_SOURCE.find(x => x.CASE_LABEL_ID.equals(scanner)); 
         
        if(CASE) {
            CASE.Status = 1;
        }

        else {
            const response = await this.masterService.GetCaseLabel(scanner);

            if(response.length > 0) {
                if(response[0].StorageCode.endsWith('000')) {
                    this.alert.Warning(`Este case ya esta en CY en el contenedor ${response[0].Location}`, scanner, 'barcode');
                }

                else { 
                    await this.containerService.CheckOrder(this.transaction(), scanner);
                }
            }

            else this.alert.Warning(`Lot not found`, scanner, 'barcode');
        }

        this.dataSource.set(DATA_SOURCE);
    }

    
    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().every(x => x.Status > 0)
            && this.dataSource().length > 0
             
    }); 


    /** */
    protected async Save() { 
        const aswer = await this.alert.SuccessConfirm(`Confirm transaction<br>#<b>${this.transaction()}</b><br>${this.dataSource().length} lots?`, 'save');
         
        if(aswer) {
            this.isLoading.set(true); 

            const caseLabelList = this.dataSource().map(item => item.CASE_LABEL_ID);
            const message = await this.containerService.SetContainerLoad(this.transaction(), caseLabelList);

            if(message.isNotOnlyWhiteSpace()) {
                this.alert.Success(message, this.transaction(), 'barcode');
                this.Cancel(false);
            }
            
            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const response = await this.alert.WarningConfirm(`Cancel order<br>#<b>${this.transaction()}</b> ?`);
            if(!response) return; 
        }

        this.transaction.set('');
        this.dataSource.set([]); 
    }
}