import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { DOCUMENT } from '@angular/common';
import { SelectItem } from 'primeng/api';

// models
import { Lot } from '../models/lot';

// services
import { VendorService } from '../services/vendor-service';
import { MaterialCategoryService } from '../services/material-category-service';
import { ItemService } from '../services/item-service';
import { PageScrollService } from 'ngx-page-scroll-core';


@Component({
  selector: 'app-lot-tracking',
  templateUrl: './lot-tracking.component.html',
  styleUrls: ['./lot-tracking.component.css']
})
export class LotTrackingComponent implements OnInit {

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

    lots: Lot[] = [];

    displayDialog: boolean;


    constructor(private fb: FormBuilder,
        private vendorService: VendorService,
        private materialCategoryService: MaterialCategoryService,
        private itemService: ItemService,
        private pageScrollService: PageScrollService,
        @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit() {
        this.loadOptions();
  }

    materialCategoryChange(event): void {
        this.selectedMaterialCategory = event.value;;
        this.loadItems(this.selectedMaterialCategory);
    }

    //vendorChange(event) {
    //    debugger
    //    this.selectedSupplier = event.value;
    //    this.selectedSupplierLabelImageName = event.value.name.replace(" ", "-").toLowerCase();
    //    this.loadLots(this.selectedSupplier.id);
    //    this.loadItems(this.selectedSupplier.id);
    //}

    itemChange(event: any) {
        this.selectedItem = event.value.id;
        this.loadLots(this.selectedItem)
        //this.selectedItemCategory = MaterialCategoryEnum[event.value.materialCategoryId];
    }

    lotNumberChange(event): void {
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
                    this.materialCategoryOptions.push({ label: item.name, value: item.id });
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

        this.lotOptions = [];
        this.lotOptions.push({ label: '-Select One-', value: '' });

        let lot = new Lot();
        lot.id = 123;
        lot.lotNumber = "LT123456";
        lot.itemId = 290;
        lot.vendorId = 2;
        lot.dateReceived = Date.now.toString();
        lot.quantity = 100;
        lot.bolShipmentNumber = "x6s4x5sx15"
        lot.StatusId = 1;

        this.lots.push(lot);

        this.lots.filter((lot) => lot.itemId == selectedItem).forEach((lot) => {
            this.lotOptions.push({ label: lot.lotNumber, value: { id: lot.id, lotNumber: lot.lotNumber, itemId: lot.itemId} });
        });

    }

}
