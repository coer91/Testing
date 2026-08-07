import { Component, signal, viewChild } from '@angular/core';   
import { WIAGrid, WIAModal } from 'hwmx-angular/components';
import { ICallbackItem, ICellNumberBox, ICellSelectBox } from 'hwmx-angular/interfaces';
import { Page } from 'hwmx-angular/tools';
 
@Component({
    selector: 'coer-grid-page',
    templateUrl: './coer-grid.page.html', 
    standalone: false
})
export class CoerGridPage extends Page {  

    protected readonly grid = viewChild<WIAGrid<any>>('grid')
    protected readonly modalFilters = viewChild<WIAModal>('modalFilters'); 

    //Variables 
    protected readonly dataSource = signal<any[]>([]);
    protected readonly drop = signal<any>(null);
    protected readonly showColumn = signal<boolean>(true);

    protected readonly dataSourceSELECTION = signal<any[]>([
        { id: 0, name: '' },
        { id: 1, name: '123456  Banamex' },
        { id: 2, name: '33322   Banamex' },
        { id: 3, name: '555555  Banamex' },
        { id: 4, name: '123456  Banamex' },
        { id: 5, name: '123456  Banamex' },
        { id: 6, name: '123456  Banamex' },
        { id: 7, name: '123456  HSBC'    },
        { id: 8, name: '123456  Banamex' },
        { id: 9, name: '123456  Banamex' },
        { id: 0, name: '' },
        { id: 1, name: '123456  Banamex' },
        { id: 2, name: '33322   Banamex' },
        { id: 3, name: '555555  Banamex' },
        { id: 4, name: '123456  Banamex' },
        { id: 5, name: '123456  Banamex' },
        { id: 6, name: '123456  Banamex' },
        { id: 7, name: '123456  HSBC'    },
        { id: 8, name: '123456  Banamex' },
        { id: 9, name: '123456  Banamex' },
        { id: 0, name: '' },
        { id: 1, name: '123456  Banamex' },
        { id: 2, name: '33322   Banamex' },
        { id: 3, name: '555555  Banamex' },
        { id: 4, name: '123456  Banamex' },
        { id: 5, name: '123456  Banamex' },
        { id: 6, name: '123456  Banamex' },
        { id: 7, name: '123456  HSBC'    },
        { id: 8, name: '123456  Banamex' },
        { id: 9, name: '123456  Banamex' },
        { id: 0, name: '' },
        { id: 1, name: '123456  Banamex' },
        { id: 2, name: '33322   Banamex' },
        { id: 3, name: '555555  Banamex' },
        { id: 4, name: '123456  Banamex' },
        { id: 5, name: '123456  Banamex' },
        { id: 6, name: '123456  Banamex' },
        { id: 7, name: '123456  HSBC'    },
        { id: 8, name: '123456  Banamex' },
        { id: 9, name: '123456  Banamex' },
        { id: 0, name: '' },
        { id: 1, name: '123456  Banamex' },
        { id: 2, name: '33322   Banamex' },
        { id: 3, name: '555555  Banamex' },
        { id: 4, name: '123456  Banamex' },
        { id: 5, name: '123456  Banamex' },
        { id: 6, name: '123456  Banamex' },
        { id: 7, name: '123456  HSBC'    },
        { id: 8, name: '123456  Banamex' },
        { id: 9, name: '123456  Banamex' },
        { id: 0, name: '' },
        { id: 1, name: '123456  Banamex' },
        { id: 2, name: '33322   Banamex' },
        { id: 3, name: '555555  Banamex' },
        { id: 4, name: '123456  Banamex' },
        { id: 5, name: '123456  Banamex' },
        { id: 6, name: '123456  Banamex' },
        { id: 7, name: '123456  HSBC'    },
        { id: 8, name: '123456  Banamex' },
        { id: 9, name: '123456  Banamex' },
        { id: 0, name: '' },
        { id: 1, name: '123456  Banamex' },
        { id: 2, name: '33322   Banamex' },
        { id: 3, name: '555555  Banamex' },
        { id: 4, name: '123456  Banamex' },
        { id: 5, name: '123456  Banamex' },
        { id: 6, name: '123456  Banamex' },
        { id: 7, name: '123456  HSBC'    },
        { id: 8, name: '123456  Banamex' },
        { id: 9, name: '123456  Banamex' },
     ]);

    constructor() { 
        super('coer-grid');

        


        // setTimeout(() => {
        //     for(let i = 1; i <= 10; i++) { 
        //         this.dataSource.update(x => x.concat([
        //             { 
        //                 id: i, 
        //                 name: `item ${i}`,  
        //                 option: null
        //             }
        //         ]));
        //     }

        //     this.isLoading.set(!this.isLoading());
        // }, 1000)


        // setTimeout(() => {
        //         this.modalFilters()?.Open();
        // }, 6000)

        // this.dataSource.set([
        //     { id: 1, name: 'First',  case: '2026-03-01 00:00:00', case2: '2026-03-01 00:00:00', case3: '2026-03-01 00:00:00' },
        //     { id: 2, name: 'Second', case: '2026-03-01 12:00:00', case2: '2026-03-01 12:00:00', case3: '2026-03-01 12:00:00' },
        //     { id: 3, name: 'Third',  case: '2026-03-01 00:00:00', case2: '2026-03-01 00:00:00', case3: '2026-03-01 00:00:00' },
        //     { id: 4, name: 'Fourth', case: '2026-04-01 00:00:00', case2: '2026-04-01 00:00:00', case3: '2026-04-01 00:00:00' },
        //     { id: 5, name: 'Fifth',  case: '2026-03-01 00:00:00', case2: '2026-03-01 00:00:00', case3: '2026-03-01 00:00:00' }
        // ]);

        //this.dataSource.update(x => x.concat([{ id: 999999, name: `dfg` }]));
    }


    path = (item: ICallbackItem<any>) => { 
        return `/home/${item.row.id}`;
    } 


    color = (item: ICallbackItem<any>) => {
        return item.row.id % 2 == 0 ? 'dark' : null;
    }

    inputTextbox = (item: ICallbackItem<any>) => ({
        showInput: true,
       
    })


    inputSelectbox = (item: ICallbackItem<any>): ICellSelectBox<any> => ({
        showInput: true,
        dataSource: this.dataSourceSELECTION(),
        // isValid: false,
         isInvalid: item.value == null,
        // placeholder: '',
        // textPosition: 'center',
        // displayProperty: 'name',
        // useIconProperty: true,
    })

    inputNumberbox = (item: ICallbackItem<any>): ICellNumberBox => ({
        showInput: true, 
        // isValid: false,
         selectOnFocus: true,
         format: 'number',
         decimals: 2,
        // placeholder: '',
        // textPosition: 'center',
        // displayProperty: 'name',
        // useIconProperty: true,
    })


    Test() {
        this.dataSourceSELECTION.update(data => [...data, { id: 0, name: '' }])
    }
}