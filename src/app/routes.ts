import { Routes } from "@angular/router";
import { DashboardComponent } from "./core/dashboard/dashboard.component";

export const budgetModuleRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];
