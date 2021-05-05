import { NgModule } from '@angular/core';
import { EnderecoComponent } from './endereco.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [EnderecoComponent],
  exports: [EnderecoComponent]
})
export class EnderecoModule { }
