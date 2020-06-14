import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

declare var require: any
var moment = require('moment-timezone');

import { DOCUMENT } from '@angular/common';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';

import { Table, EditableColumn, EditableRow } from 'primeng/table';
import { GalleriaModule } from 'primeng/galleria';

// models
import { Lot, ProcessedLot } from '../models/lot';

// services
import { VendorService } from '../services/vendor-service';
import { MaterialCategoryService } from '../services/material-category-service';
import { ItemService } from '../services/item-service';
import { PageScrollService } from 'ngx-page-scroll-core';
import { InspectionItem, InspectionLot } from '../models/inspection';
import { LotService } from '../services/lot-service';


@Component({
  selector: 'app-lot-tracking',
  templateUrl: './lot-tracking.component.html',
    styleUrls: ['./lot-tracking.component.css'],
    providers: [MessageService]
})
export class LotTrackingComponent implements OnInit {

    @ViewChild("dtLotLog", { static: false }) public pLotLog: Table;

    supplierOptions: SelectItem[] = [];
    itemOptions: SelectItem[] = [];
    lotOptions: SelectItem[] = [];
    materialCategoryOptions: SelectItem[] = [];

    selectedItem: string;
    selectedItemDescription: string;
    selectedMaterialCategory: any;
    selectedSupplier: any;
    selectedSupplierLabelImageName: string;
    selectedLotNumber: string;
    lotNumberManuallyEntered: boolean;


    lots: any[] = [];
    lotLogs: ProcessedLot[] = [];
    cols: any[];

    displayDialog: boolean;

    lotTrackingForm: FormGroup;

    //showLotLog: boolean;

    //paging
    first = 0;
    rows = 10;

    responsiveOptions: any[]

    supplierShippingLabelImages: any[] = [];

    constructor(private fb: FormBuilder,
        private vendorService: VendorService,
        private materialCategoryService: MaterialCategoryService,
        private itemService: ItemService,
        private lotService: LotService,
        private pageScrollService: PageScrollService,
        @Inject(DOCUMENT) private document: any,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
    ) {

        this.responsiveOptions =[
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
    }

    ngOnInit() {
        this.configureForm();
        this.setUserCategoryValidators();
        this.loadOptions();
        this.loadLotLog();
        this.loadImages();

        this.cols = [
            { field: 'dateProcessed', header: 'Date/Time Logged' },
            { field: 'materialCategoryName', header: 'Material' },
            { field: 'itemDescription', header: 'Item Name' },
            { field: 'lotNumber', header: 'Lot Number' },
            { field: '', header: '' }

        ];
        
  }

    configureForm(): void {
        this.lotTrackingForm = new FormGroup({
            materialCategory: new FormControl('', Validators.required),
            item: new FormControl('', Validators.required),
            lotNumber: new FormControl('', Validators.required)
        });
    }

    setUserCategoryValidators(): void {
        debugger
        this.lotTrackingForm.get('lotNumber').valueChanges
            .subscribe(x => {                
                if (typeof x === 'string') {
                    this.selectedLotNumber = x;
                    this.lotNumberManuallyEntered = true;
                } 
            });
    }

    loadImages(): void {

        let image = new Object();
        (<any>image).previewImageSrc = "/assets/supplier-labels/belnmark.jpg";
        (<any>image).thumbnailImageSrc = "/assets/supplier-labels/belnmark.jpg";
        (<any>image).title = "Belmark";
        (<any>image).alt = "Belmark Shipping Label";

        this.supplierShippingLabelImages.push(image);
    }

    materialCategoryChange(event): void {
        debugger;
        this.selectedMaterialCategory = event.value.id;;
        this.loadItems(this.selectedMaterialCategory);
        this.selectedSupplierLabelImageName = "belmark";
    }

    vendorChange(event) {
        debugger
        this.selectedSupplier = event.value;
        this.selectedSupplierLabelImageName = event.value.name.replace(" ", "-").toLowerCase();
        this.loadLots(this.selectedSupplier.id);
        this.loadItems(this.selectedSupplier.id);
    }

    itemChange(event: any) {
        this.selectedItem = event.value.id;
        this.loadLots(this.selectedItem)
        //this.selectedItemCategory = MaterialCategoryEnum[event.value.materialCategoryId];
    }

    lotNumberChange(event): void {
        debugger;
        if (typeof event.value === 'string') {
            this.selectedLotNumber = event.value;
            this.lotNumberManuallyEntered = true;
        }
    }

    showLabelInfo(): void {
        this.showLabelInfoDialog();
    }

    showLabelInfoDialog(): void {
        this.displayDialog = true;
    }

    closeLabelInfoDialog() : void {
        this.displayDialog = false;
    }

    loadOptions(): void {
        this.loadMaterialCategories();
    }

    loadVendors(): void {
        this.vendorService.getVendors()
            .then(vendors => {
                (<any>vendors).forEach((vendor) => {
                    this.supplierOptions.push({ label: vendor.name, value: { id: vendor.id, name: vendor.name} });
                });
            });
    }

    loadMaterialCategories(): void {
        this.materialCategoryService.getMaterialCategories()
            .then(categories => {
                this.materialCategoryOptions.push({ label: '-Select One-', value: '' });
                (<any>categories).forEach((item) => {
                    this.materialCategoryOptions.push({ label: item.name, value: { id: item.id, name: item.name } });
                });

                this.materialCategoryOptions
            });
    }

    loadItems(materialCategoryId) : void {

        this.itemOptions = [];
        this.itemOptions.push({ label: '-Select One-', value: '' });
        this.itemService.getItemsByMaterialCategory(materialCategoryId)
            .then(items => {

                (<any>items).forEach((item) => {
                    this.itemOptions.push({
                        label: item.vendorItemId + " - "  + item.description,
                        value: { id: item.id, vendorId: item.vendorItemId, description: item.description, materialCategoryId: item.materialCategoryId }
                    });
                });
            });
    }

    loadLots(selectedItem) : void {

        this.lotService.getLots()
            .then(lots => {
                this.lots = <any>lots;
                this.lots.push({ label: '-Select One-', value: '' });
                this.lots.filter((lot) => lot.itemId == selectedItem).forEach((lot) => {
                    debugger
                    let test = moment.utc(lot.dateReceived).tz("America/New_York");
                    this.lotOptions.push({
                        label: lot.lotNumber + " - " + lot.vendorName + " - " + moment.utc(lot.dateReceived).tz("America/New_York").format("MM/DD/YYYY, hh:mm a"),
                        value: { id: lot.id, lotNumber: lot.lotNumber, itemId: lot.itemId }
                    });
                });
            });

        

    }

    loadLotLog(): void {

       this.lotService.getProcessedLots()
           .then(lots => {
               this.lotLogs = (<any>lots);
               this.lotLogs.forEach((x) => {
                   (<any>x).dateProcessed = moment.utc((<any>x).dateProcessed).tz("America/New_York").format("MM/DD/YYYY, hh:mm a")
               })
               this.pLotLog.reset();
               this.lotTrackingForm.reset();
              
        });
    }

    validateLotNumber(event: any): void {
        if (event.target.value !== this.selectedLotNumber) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The entered lot numbers do not match.' });     
        }
    }

    onSubmit(value: any) {

        let processedLot = new ProcessedLot();
        processedLot.lotId = value.lotNumber.id,
        processedLot.processedByUserId = 1;

        this.lotService.saveProcessedLot(processedLot)
            .then(() => {
                this.messageService.add({ severity: 'info', summary: 'Confirmation', detail: 'The selected lot has been processed.' });

                this.loadLotLog();
            });

        // Clear out select lists
        this.itemOptions = this.itemOptions.filter(x => x.value === '');
        this.lotOptions = this.lotOptions.filter(x => x.value === '');
    }

    DeleteProcessedLot(index: number): void {

        this.confirmationService.confirm({
            message: 'Are you sure that you want to remove the selected entry?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.lotService.deleteProcessedLot(this.lotLogs[index].id)
                    .then(() => {
                        this.messageService.add({ severity: 'info', summary: 'Confirmation', detail: 'The selected lot entry has been removed.' });

                        this.loadLotLog();
                    });
            },
            reject: () => {
            }
        });

       
    }

    //Paging
    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.first === (this.lots.length - this.rows);
    }

    isFirstPage(): boolean {
        return this.first === 0;
    }
}
