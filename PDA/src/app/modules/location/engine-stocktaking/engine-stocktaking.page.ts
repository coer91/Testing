import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { EngineStocktakingService, ST_PALLET_DTO } from './engine-stocktaking.service';
import { MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools';
import { Tools } from 'hwmx-angular/tools';
@Component({
    selector: 'engine-stocktaking.page',
    templateUrl: './engine-stocktaking.page.html',
    standalone: false
})
export class EngineStocktakingPage extends PagePDA {

    constructor() { super('MM_LM0601') }
    protected readonly dataSource = signal<ST_PALLET_DTO[]>([]);
    //Services 
    private readonly service = inject(EngineStocktakingService);

    /** */
    protected override async OnScanCode(scanner: string) {

        console.log("OnScanCode:", scanner);
        this.isLoading.set(true);

        if (Scanner.IsEncoded(scanner))
            await this.Check(scanner);
        else
            await this.GetDataSource(scanner);

        this.isLoading.set(false);
    }

    /** */
    protected async GetDataSource(scanner: string) {

        //pallet code longer than 14 characters
        if (scanner.length == 14) {
            const response = await this.service.Get3CPalletInfo(scanner);
            if (response.length > 0) {
                this.dataSource.update((prev) => {

                    // Serial_No values that already exist in the data source
                    const serialsInDataSource = new Set(
                        prev.map(x => x.Serial_No)
                    );

                    // In response, retrieve ALL rows
                    // whose Serial_No does not exist in the dataSource
                    const newRows = response.filter(x =>
                        !serialsInDataSource.has(x.Serial_No)
                    );

                    if (newRows.length <= 0)
                        this.translatory.alert.InvalidCode("The scanned code already exists");
                    return [...prev, ...newRows];
                });
                this.transaction.set(scanner);
            }
        }
        else {
            if (scanner.includes("#")) { // CVJ VOLVO
                scanner = scanner.substring(scanner.indexOf("#") + 1);
            }
            if (scanner.includes("HAMTA")) { // CVJ FORD
                scanner = scanner.substring(0, 16);
            }

            const newRow: ST_PALLET_DTO = {
                Serial_No: scanner,
                Pallet_Code: '',

            };
            this.dataSource.update((prev) => {
                // Serial_No values that already exist in the data source
                const serialsInDataSource = new Set(
                    prev.map(x => x.Serial_No)
                );

                if (serialsInDataSource.has(newRow.Serial_No)) {
                    this.translatory.alert.InvalidCode("The scanned code already exists");
                    return prev;
                }

                return [...prev, newRow];
            });
            this.transaction.set(scanner);
        }

    }

    protected async Save() {
        const aswer = await this.translatory.confirm.SaveTransaction("Would you like to complete the transaction for ", this.dataSource().length);

        if (aswer) {
            this.isLoading.set(true);

            const arr_ENG_NO: string[] = this.dataSource().map(x =>
                `${x.Serial_No}/${x.Pallet_Code}`
            );
            const response = await this.service.SetFinalStocktaking(arr_ENG_NO);

            if (response.ok) {
                this.alert.Success(response.data, 'OK', 'save');
                this.Cancel(false);
            }

            this.isLoading.set(false);
        }
    }

    /** */
    protected async Cancel(showAlert: boolean) {
        if (showAlert) {
            const quantity = this.dataSource().length;
            const response = await this.translatory.confirm.CancelTransaction("You would like to cancel the transaction for ", quantity);
            if (!response) return;
        }

        this.transaction.set('');
        this.dataSource.set([]);
    }

    protected async Check(scanner: string) {
        console.log(scanner);
        const parsedCode = Scanner.Decode(scanner);
        if (parsedCode.Message != 'OK') {
            this.translatory.alert.InvalidCode(parsedCode.Message);
            return;
        }
        this.GetDataSource(parsedCode.container);
        console.log(parsedCode);
    }

    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0;
    });

    /** */
    protected counter = computed<string>(() => {
        return this.transaction().isNotOnlyWhiteSpace() ? `
            <h4 class="width-100 text-align-right color-gray"> 
                ${this.dataSource().length}
                <i class="iw-barcode font-size-20px"></i>  
            </h4>
        ` : '';
    });
}