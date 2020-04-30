import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components
import { HomeComponent } from './home/home.component';
import { DefaultHeaderComponent } from './headers/default-header.component';

// primeng
import {MenubarModule} from 'primeng/components/menubar/menubar';

@NgModule({
  declarations: [
        AppComponent,
        HomeComponent,
        DefaultHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
