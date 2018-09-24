import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BgtRoutesModule } from '../../bgt-routes.module';
import { NavBarComponent } from './nav-bar.component';


@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    BgtRoutesModule,
  ],
  exports: [NavBarComponent],
  declarations: [NavBarComponent]
})
export class NavBarModule { }
