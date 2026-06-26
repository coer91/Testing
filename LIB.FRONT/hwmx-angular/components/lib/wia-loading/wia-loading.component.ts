import { Component, input } from '@angular/core'; 

@Component({
    selector: 'wia-loading',
    templateUrl: './wia-loading.component.html', 
    styleUrl: './wia-loading.component.scss', 
    standalone: false
})
export class WIALoading  {    
    
    //Inputs
    public isLoading = input<boolean>(false);
    public position  = input<'absolute' | 'sticky'>('absolute'); 
}