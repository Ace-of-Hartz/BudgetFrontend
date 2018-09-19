import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BgtRoutesModule } from './bgt-routes.module';
import { BudgetComponent } from './bgt.component';
import { NavBarModule } from './core/nav-bar/nav-bar.module';
import { DashboardModule } from './dashboard/dashboard.module';


@NgModule({
  declarations: [
    BudgetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavBarModule,
    BgtRoutesModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [BudgetComponent]
})
export class AppModule { }
