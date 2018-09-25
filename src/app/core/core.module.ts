import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaycheckRepository } from './repositories/paycheck-repository.repository';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [PaycheckRepository],
  declarations: []
})
export class CoreModule { }
