import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

const budgetModuleRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(budgetModuleRoutes)],
    exports: [RouterModule],
})
export class BgtRoutesModule { }
