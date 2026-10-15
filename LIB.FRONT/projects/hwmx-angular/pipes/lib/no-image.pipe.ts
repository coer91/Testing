import { Pipe, PipeTransform } from '@angular/core'; 
import { Tools } from 'hwmx-angular/tools';

@Pipe({ name: 'noImage', standalone: false })
export class NoImagePipe implements PipeTransform {

    transform(value: string | File | null | undefined, defaultImage: 'IMAGE' | 'USER' = 'IMAGE'): string {

        if (typeof value == 'string' && value.trim().toUpperCase() == 'LOADING')
            return 'coersystem/images/loading.gif';

        let NO_IMAGE = (defaultImage === 'IMAGE') 
            ? 'hwmx-angular/images/no-image.png'
            : 'hwmx-angular/images/no-user.png';

        if(Tools.IsOnlyWhiteSpace(value) ) {
            return NO_IMAGE;
        }

        else if (typeof value === 'string') {
            return value;
        }

        //Files.ConvertToBase64(value as File).then(base64 => { return base64 });
        return NO_IMAGE;
    }
}