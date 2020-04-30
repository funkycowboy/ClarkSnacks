import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components
import { HomeComponent } from './home/home.component';
import { MaterialInspectionComponent } from './material-inspection/material-inspection.component';
import { DefaultHeaderComponent } from './headers/default-header.component';

// primeng
import { MenubarModule } from 'primeng/components/menubar/menubar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/components/button/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
        AppComponent,
        HomeComponent,
        MaterialInspectionComponent,
        DefaultHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    FormsModule,
    MenubarModule,
    InputSwitchModule,
    SelectButtonModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
      DialogModule,
      InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
