import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnderecoComponent } from './endereco.component';

@NgModule({
  imports: [SharedModule, NgSelectModule, FormsModule],
  declarations: [EnderecoComponent],
  exports: [EnderecoComponent]
})
export class EnderecoModule { }
