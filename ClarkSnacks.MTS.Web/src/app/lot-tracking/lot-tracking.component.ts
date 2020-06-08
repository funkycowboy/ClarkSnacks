import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DOCUMENT } from '@angular/common';
import { SelectItem, MessageService } from 'primeng/api';

import { Table, EditableColumn, EditableRow } from 'primeng/table';

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

    showLotLog: boolean;

    //paging
    first = 0;
    rows = 10;


    constructor(private fb: FormBuilder,
        private vendorService: VendorService,
        private materialCategoryService: MaterialCategoryService,
        private itemService: ItemService,
        private lotService: LotService,
        private pageScrollService: PageScrollService,
        @Inject(DOCUMENT) private document: any,
        private messageService: MessageService) {
    }

    ngOnInit() {
        this.configureForm();
        this.setUserCategoryValidators();
        this.loadOptions();
        this.loadLotLog();

        this.cols = [
            { field: 'dateProcessed', header: 'Date/Time Logged' },
            { field: 'materialCategoryName', header: 'Material' },
            { field: 'lotNumber', header: 'Lot Number' },
            { field: 'itemDescription', header: 'Item Name' }
        ];

  }

    configureForm(): void {
        this.lotTrackingForm = new FormGroup({
            materialCategory: new FormControl('', Validators.required),
            item: new FormControl('', Validators.required),
            lotNumber: new FormControl('', Validators.required),
            lotNumberConfirm: new FormControl(''),                       
        });
    }

    setUserCategoryValidators(): void {
        debugger
        this.lotTrackingForm.get('lotNumber').valueChanges
            .subscribe(x => {                
                if (typeof x === 'string') {
                    debugger
                    this.lotTrackingForm.get('lotNumberConfirm').setValidators([Validators.required]);
                    this.selectedLotNumber = x;
                    this.lotNumberManuallyEntered = true;
                } else {
                    this.lotTrackingForm.get('lotNumberConfirm').clearValidators();
                    this.lotTrackingForm.get('lotNumberConfirm').updateValueAndValidity();
                }
            });
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
                (<any>categories).forEach((item) => {
                    this.materialCategoryOptions.push({ label: item.name, value: { id: item.id, name: item.name } });
                });
            });
    }

    loadItems(materialCategoryId) : void {

        this.itemOptions = [];
        this.itemOptions.push({ label: '-Select One-', value: '' });
        this.itemService.getItemsByMaterialCategory(materialCategoryId)
            .then(items => {

                (<any>items).forEach((item) => {
                    this.itemOptions.push({ label: item.vendorItemId + " - " + item.description, value: { id: item.id, vendorId: item.vendorItemId, description: item.description, materialCategoryId: item.materialCategoryId } });
                });
            });
    }

    loadLots(selectedItem) : void {

        this.lotService.getLots()
            .then(lots => {
                this.lots = <any>lots;
                this.lots.filter((lot) => lot.itemId == selectedItem).forEach((lot) => {
                    this.lotOptions.push({ label: lot.lotNumber, value: { id: lot.id, lotNumber: lot.lotNumber, itemId: lot.itemId } });
                });
            });

        

    }

    loadLotLog(): void {

       this.lotService.getProcessedLots()
           .then(lots => {
                    debugger
                    this.lotLogs = (<any>lots);
                });

        this.showLotLog = true;

        //this.pLotLog.reset();
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

        this.lotService.saveProcessedLot(processedLot);
        this.lotLogs.push(processedLot);

        this.loadLotLog();

        this.lotTrackingForm.reset();
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
