import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { NavBarComponent } from './nav-bar.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    RouterModule.forRoot([]),
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  providers: [RouterModule],
  exports: [NavBarComponent],
  declarations: [NavBarComponent]
})
export class NavBarModule { }
