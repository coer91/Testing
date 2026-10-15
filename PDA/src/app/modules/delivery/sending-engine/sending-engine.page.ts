import { ENGINE_DTO, GLOVIS_ORDER_DTO, SendingEngineService } from './sending-engine.service';
import { Component, computed, inject, signal } from '@angular/core';    
import { DataSessionService } from '@appShared/services';
import { PagePDA } from '@appShared/tools';  
import { ICallbackItem } from 'hwmx-angular/interfaces';
import { Access, Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'sending-engine.page-page',
    templateUrl: './sending-engine.page.html', 
    standalone: false
})
export class SendingEnginePage extends PagePDA {  
 
    constructor() { super('MM_OT0901') } 
     
    //Inject     
    private service = inject(SendingEngineService);  
    private dataSessionService = inject(DataSessionService);  
 
    //Variables
    private readonly FACTORY: string = Access.GetUser()?.Factory || '';
    private readonly PAGE_CODE = '[MM_OT0901]SendingEngine';
    protected readonly orderNumber = signal<GLOVIS_ORDER_DTO | null>(null);
    protected readonly orderNumberList = signal<GLOVIS_ORDER_DTO[]>([]);
    protected readonly dataSource = signal<ENGINE_DTO[]>([]);

     
    /** */
    protected override async StartPage() {   
        super.StartPage();
        await this.GetOrderNumberList();  
    } 
    
    
    /** On Scann Code */
    protected override async OnScanCode(scanner: string) {
        if(Tools.IsNull(this.orderNumber())) return;
        
        this.isLoading.set(true);
        
        scanner = scanner.trim(); 
        
        if(this.dataSource().find(x => x.SERIAL_NUMBER?.equals(scanner))) {
            this.translatory.alert.LotAlreadyScanned(scanner);
            this.isLoading.set(false);
            return;      
        }
         
        const orderNumber = this.orderNumber()!.ORDER_NUMBER;
        const engine = await this.service.GetEngineByOrder(orderNumber, scanner);

        if(engine) { 
            if(Tools.IsNotOnlyWhiteSpace(engine.SERIAL_NUMBER) && Tools.IsNotOnlyWhiteSpace(engine.ENGINE_TYPE) && Tools.IsNotOnlyWhiteSpace(engine.ENGINE_NUMBER)) {
                const response = await this.dataSessionService.AddDataSession(this.PAGE_CODE, orderNumber, scanner, JSON.stringify(engine));
                if(response.equals('OK')) this.dataSource.update(data => [engine, ...data]);
            }            

            else this.alert.Warning('No engine data');
        }  

        this.isLoading.set(false);
    }   


    /** */
    protected async GetOrderNumberList() { 
        this.isLoading.set(true);

        this.dataSource.set([]);
        this.orderNumber.set(null);  
        const response = await this.service.GetOrderList();
        this.orderNumberList.set(response); 

        if(this.orderNumberList().length > 0) {
            this.orderNumber.set(this.orderNumberList()[0]);
            
            const engineList = await this.dataSessionService.GetDataSession(this.PAGE_CODE, this.orderNumber()!.ORDER_NUMBER);
            this.dataSource.update(data => [
                ...data, 
                ...(engineList.map(item => JSON.parse(item.DETAIL_JSON)) as any)
            ]);  
        }           
        
        this.isLoading.set(false);
    } 



    /** */
    protected async Save() { 
        const orderNumber = this.orderNumber()?.ORDER_NUMBER;
        const aswer = await this.alert.SuccessConfirm(`Confirm order<br>#<b>${orderNumber}</b><br>${this.dataSource().length} Engines?`, 'save');
         
        if(aswer) {
            this.isLoading.set(true);  

            const response = await this.service.SetGlovisOrder(orderNumber!);
    
            if(response.ok) {
                this.alert.Success(response.data, orderNumber, 'save', 0);
                await this.Cancel(false);
            }  
            
            else this.isLoading.set(false);
        }
    } 


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.orderNumber())
            && this.IsNotOnlyWhiteSpace(this.orderNumberList())
            && this.dataSource().length > 0 
    });


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const response = await this.translatory.confirm.CancelTransaction(this.orderNumber()?.ORDER_NUMBER, this.dataSource().length);
            if(!response) return; 
              
            if(this.orderNumber() && Tools.IsNotOnlyWhiteSpace(this.orderNumber()?.ORDER_NUMBER)) {
                await this.dataSessionService.ClearDataSession(this.PAGE_CODE, this.orderNumber()!.ORDER_NUMBER);  
            }
        }
          
        await this.GetOrderNumberList();
    }


    /** */
    protected async Remove(engine: ENGINE_DTO) {
        const answer = await this.alert.WarningConfirm(`Remove engine<br><b>${engine.SERIAL_NUMBER}</b>?`, 'delete');

        if(answer && this.orderNumber()) {
            this.isLoading.set(true);

            const operation = this.orderNumber()!.ORDER_NUMBER; 
            const detail    = engine.SERIAL_NUMBER;
            const response = await this.dataSessionService.DeleteDataSession(this.PAGE_CODE, operation, detail);
            if(response.ok) {
                this.dataSource.update(data => [ ...data.filter(item => !item.SERIAL_NUMBER.equals(detail)) ]);
                this.alert.Success(`Engine <b>${engine.SERIAL_NUMBER}</b> has been deleted`, 'Deleted', 'delete');
            }             

            this.isLoading.set(false);
        } 
    }


    /** */
    protected counter = computed<string>(() => {  
        return `
            <h4 class="width-100 flex-middle-between color-gray">
                <span> ${this.FACTORY.equals('A') ? 'GLOVIS W / H' : 'WIA GROUND'} </span>

                <span> 
                    ${this.showSaveButton() 
                        ? `${this.dataSource().length} <i class="iw-engine font-size-20px"></i>`
                        : ''
                    }                     
                </span>
            </h4>
        `; 
    }); 


    /** */
    protected template = (item: ICallbackItem<ENGINE_DTO>): string => {
        return `
            <span>${item.value}<span>
            ${item.row.IMPORT?.equals('Y') 
                ? '<i class="iw-exclamation-circle-fill color-navigation position-relative" style="top: -1px"><i>' 
                : ''
            }
        `.cleanUpBlanks();
    }
}