import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';

// components
import { HomeComponent } from './home/home.component';
import { MaterialInspectionComponent } from './material-inspection/material-inspection.component';
import { LotTrackingComponent } from './lot-tracking/lot-tracking.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'material-inspection', component: MaterialInspectionComponent, canActivate: [AuthGuard] },
    { path: 'lot-tracking', component: LotTrackingComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
