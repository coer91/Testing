import { ContainerService, CONTAINER_DTO } from './container-load.service';
import { Component, computed, inject, signal } from '@angular/core';
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'container-load-page',
    templateUrl: './container-load.page.html',
    standalone: false
})
export class ContainerLoadPage extends PagePDA {

    constructor() { super('MM_IN0701') }

    //Inject    
    private containerService = inject(ContainerService);

    //Variables       
    protected readonly dataSource = signal<CONTAINER_DTO[]>([]);


    /**  */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);

        if (this.transaction().isOnlyWhiteSpace()) {
            await this.GetDataSource(scanner);
        }

        else {
            await this.Check(scanner);
        }

        this.isLoading.set(false);
    }


    /** */
    protected async GetDataSource(scanner: string) {
        this.dataSource.set([]);

        const response = await this.containerService.GetContainerLoad(scanner);

        if (response.length > 0) {
            this.dataSource.set(response);
            this.transaction.set(scanner);
        }
    }


    /** */
    protected async Check(scanner: string) {
        const DATA_SOURCE = [...this.dataSource()]; // Create a copy of the dataSource array to avoid direct mutation
        const item = DATA_SOURCE.find(item => item.CASE_LABEL_ID.equals(scanner));
       
        if (item) {
            if (item.STATUS == 3) {
                this.alert.Warning('Already Scanned', scanner, 'barcode');
            }

            item.STATUS = 3;
        }

        this.dataSource.set([...DATA_SOURCE]);
    }


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0
            && this.dataSource().every(x => x.STATUS == 3);
    });


    /** */
    protected async Save() {
        const aswer = await this.translatory.confirm.SaveTransaction(this.transaction(), this.dataSource().length);

        if (aswer) {
            this.isLoading.set(true);

            const response = await this.containerService.SetContainerLoad(this.transaction(), this.dataSource().map(x => x.CASE_LABEL_ID));

            if (response.ok) {
                this.alert.Success(response.data, this.transaction(), 'save');
                this.Cancel(false);
            }

            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if (showAlert) {
            const quantity = this.dataSource().length;
            const response = await this.translatory.confirm.CancelTransaction(this.transaction(), quantity);
            if (!response) return;
        }

        this.transaction.set('');
        this.dataSource.set([]);
    }


    /** */
    protected counter = computed<string>(() => {  
        return this.transaction().isNotOnlyWhiteSpace() ? `
            <h4 class="width-100 text-align-right color-gray"> 
                ${this.dataSource().filter(item => item.STATUS > 0).length} / ${this.dataSource().length}
                <i class="iw-barcode font-size-20px"></i>  
            </h4>
        ` : ''; 
    }); 
}