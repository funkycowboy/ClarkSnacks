import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// services
import { VendorService } from './services/vendor-service';
import { MaterialCategoryService } from './services/material-category-service';
import { ItemService } from './services/item-service';
import { LotService } from './services/lot-service';
import { OperatorService } from './services/operator-service';

// directives
import { AddRowDirective } from '../app/directives/add-row-directive';
import { AddRowDirective2 } from '../app/directives/add-row-directive2';

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
import { ChipsModule } from 'primeng/chips';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SpinnerModule } from 'primeng/spinner';
import { LotTrackingComponent } from './lot-tracking/lot-tracking.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { GalleriaModule } from 'primeng/galleria';


@NgModule({
  declarations: [
        AppComponent,
        HomeComponent,
        MaterialInspectionComponent,
        DefaultHeaderComponent,
        AddRowDirective,
        AddRowDirective2,
        LotTrackingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    InputSwitchModule,
    SelectButtonModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    InputTextareaModule,
    ChipsModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    SpinnerModule,
      HttpClientModule,
      NgxPageScrollCoreModule.forRoot({ scrollOffset: 130 }),
      ConfirmDialogModule,
      MessageModule,
      MessagesModule,
      ToastModule,
      SidebarModule,
      GalleriaModule
  ],
    providers: [
        VendorService,
        MaterialCategoryService,
        ItemService,
        OperatorService,
        LotService,
        ConfirmationService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
