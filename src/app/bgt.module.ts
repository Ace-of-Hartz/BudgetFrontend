import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BgtRoutesModule } from './bgt-routes.module';
import { BudgetComponent } from './bgt.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';


@NgModule({
  declarations: [
    BudgetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    BgtRoutesModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [BudgetComponent]
})
export class AppModule { }
