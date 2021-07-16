import {Component} from '@angular/core';
import { ngxLocalStorage } from 'ngx-localstorage';

@Component({
  selector: 'app-decorator',
  templateUrl: './decorator.component.html',
  styleUrls: ['../base/base.scss']
})
export class DecoratorComponent {

  @ngxLocalStorage({key: 'cbox1', nullTransformer: () => false})
  boundBoolean: boolean;

  @ngxLocalStorage({key: 'txt1', prefix: 'demo'})
  boundText: string;
}
