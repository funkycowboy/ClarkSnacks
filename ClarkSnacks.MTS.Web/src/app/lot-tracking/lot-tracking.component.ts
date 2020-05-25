import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { DOCUMENT } from '@angular/common';
import { SelectItem } from 'primeng/api';

// services
import { VendorService } from '../services/vendor-service';
import { CategoryService } from '../services/category-service';
import { ItemService } from '../services/item-service';
import { PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-lot-tracking',
  templateUrl: './lot-tracking.component.html',
  styleUrls: ['./lot-tracking.component.css']
})
export class LotTrackingComponent implements OnInit {

    supplierOptions: SelectItem[] = [];
    itemTypeOptions: SelectItem[] = [];
    itemOptions: SelectItem[] = [];

    selectedItem: string;
    selectedItemDescription: string;
    selectedSupplier: number;
    selectedLotNumber: string;

    constructor(private fb: FormBuilder,
        private vendorService: VendorService,
        private categoryService: CategoryService,
        private itemService: ItemService,
        private pageScrollService: PageScrollService,
        @Inject(DOCUMENT) private document: any) {

        this.loadOptions();
    }

    ngOnInit() {
        this.loadOptions();
  }

    vendorChange(event) {
        this.selectedSupplier = event.value;
        this.loadItems(this.selectedSupplier);

        // clear description
        this.selectedItemDescription = "";
    }

    itemChange(event: any) {
        //this.selectedItemType = event.value;

        //this.pTableItem.value[rowIndex].description = event.value.description;
        //this.pTableItem.reset();

        ////this.selectedItemDescription = event.value.description;
        //this.selectedItemCategory = MaterialCategoryEnum[event.value.materialCategoryId];
    }

    loadOptions(): void {

        // Data-driven options
        this.loadVendors();
        this.loadCategories();
    }

    loadVendors(): void {
        this.vendorService.getVendors()
            .then(vendors => {
                (<any>vendors).forEach((item) => {
                    this.supplierOptions.push({ label: item.name, value: item.id });
                });
            });
    }

    loadCategories(): void {
        this.categoryService.getCategories()
            .then(categories => {
                (<any>categories).forEach((item) => {
                    this.itemTypeOptions.push({ label: item.name, value: item.id });
                });
            });
    }

    loadItems(selectedSupplier) {

        this.itemOptions = [];
        this.itemOptions.push({ label: '-Select One-', value: '' });
        this.itemService.getItems(selectedSupplier)
            .then(items => {

                (<any>items).forEach((item) => {
                    this.itemOptions.push({ label: item.vendorItemId + " - " + item.description, value: { id: item.vendorItemId, description: item.description, materialCategoryId: item.materialCategoryId } });
                });
            });
    }

}
