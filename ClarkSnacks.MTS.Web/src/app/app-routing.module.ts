import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from './home/home.component';
import { MaterialInspectionComponent } from './material-inspection/material-inspection.component';
import { LotTrackingComponent } from './lot-tracking/lot-tracking.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'material-inspection', component: MaterialInspectionComponent },
    { path: 'lot-tracking', component: LotTrackingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
