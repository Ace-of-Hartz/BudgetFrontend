import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BudgetComponent } from './bgt.component';
import { NavBarModule } from './core/nav-bar/nav-bar.module';
import { RouterModule } from '@angular/router';
import { budgetModuleRoutes } from './routes';
import { DashboardComponent } from './core/dashboard/dashboard.component';

@NgModule({
  declarations: [
    BudgetComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavBarModule,
    RouterModule.forRoot(budgetModuleRoutes),
  ],
  providers: [],
  bootstrap: [BudgetComponent]
})
export class AppModule { }
