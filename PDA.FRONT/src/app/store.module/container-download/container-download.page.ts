import { ContainerService, ICaseLabelStatus } from '../container-load/container-load.service';
import { Component, computed, inject, signal } from '@angular/core'; 
import { PagePDA, Scanner } from '@appShared/tools'; 

@Component({
    selector: 'container-download-page',
    templateUrl: './container-download.page.html', 
    standalone: false
})
export class ContainerDownloadPage extends PagePDA {  
 
    constructor() { super('MM_IN0601') }  

    //Inject    
    private containerService = inject(ContainerService);  

    
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
    protected async GetDataSource(scanner: string) {      
        await this.Cancel(false);
        const response = await this.containerService.GetContainerDownload(scanner);
        
        if(response.ok) {  
            if(response.data.length > 0) { 
                if(response.data[0].CASE_LABEL_ID.equals('RELOAD CONTAINER')) {
                    await this.alert.WarningOk('Listo para recargar');
                }

                else {
                    response.data = response.data.map(item => ({ ...item, Status: 0 }));
                    this.dataSource.set(response.data); 
                }

                this.transaction.set(scanner);
            } 

            else this.translatory.alert.NoData(scanner);  
        }  
    }


    /** */
    protected async Check(scanner: string) {
        scanner = Scanner.DecodeProperty(scanner, 'LotNumber');

        const DATA_SOURCE = [...this.dataSource()];
        const CASE = DATA_SOURCE.find(x => x.CASE_LABEL_ID.equals(scanner)); 
         
        if(CASE) {
            CASE.Status = 1;
        }

        else {
            const confirm = await this.alert.WarningConfirm(`This Lot<br><b>${scanner}</b><br>Is not in the order<br>add?`);
            
            if(confirm) { 
                DATA_SOURCE.push({
                    CASE_LABEL_ID: scanner,
                    TYPE: 'NEW',
                    Status: 2
                });  
            }
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
        const aswer = await this.translatory.confirm.SaveTransaction(this.transaction(), this.dataSource().length);
         
        if(aswer) {
            this.isLoading.set(true); 

            const caseLabelList = this.dataSource().map(item => item.CASE_LABEL_ID);
            const message = await this.containerService.SetContainerDownload(this.transaction(), caseLabelList);

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
            const response = await this.translatory.confirm.CancelTransaction(this.transaction());
            if(!response) return; 
        }

        this.transaction.set('');
        this.dataSource.set([]); 
    }


    /** */
    protected indicator = computed(() => {
        return `${this.dataSource().filter(item => item.Status > 0).length} / ${ this.dataSource().length }`;
    });
}