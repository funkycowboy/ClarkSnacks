import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


declare var require: any
var moment = require('moment-timezone');

import { DOCUMENT } from '@angular/common';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';

import { Table, EditableColumn, EditableRow } from 'primeng/table';
import { GalleriaModule } from 'primeng/galleria';

// models
import { Lot, ProcessedLot } from '../models/lot';
import { InspectionItem } from '../models/inspection';

// services
import { VendorService } from '../services/vendor-service';
import { MaterialCategoryService } from '../services/material-category-service';
import { ItemService } from '../services/item-service';
import { PageScrollService } from 'ngx-page-scroll-core';
import { LotService } from '../services/lot-service';
import { OperatorService } from '../services/operator-service';


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
    materialCategoryOptionsForLog: SelectItem[] = [];
    operatorOptions: SelectItem[] = [];

    selectedItem: any;
    selectedItemDescription: string;
    selectedMaterialCategory: any;
    selectedSupplier: any;
    selectedSupplierLabelImageName: string;
    selectedLotNumber: string;
    lotNumberManuallyEntered: boolean;
    selectedOperator: any;

    lastCaseOnPaletteChecked: boolean;

    lots: any[] = [];
    lotLogs: ProcessedLot[] = [];
    cols: any[];

    displayDialog: boolean;

    lotTrackingForm: FormGroup;

    responsiveOptions: any[]
    supplierShippingLabelImages: any[] = [];
    supplierLabelList: any[] = [];

    productionLine: string;

    constructor(private fb: FormBuilder,
        private vendorService: VendorService,
        private materialCategoryService: MaterialCategoryService,
        private itemService: ItemService,
        private operatorService: OperatorService,
        private lotService: LotService,
        private pageScrollService: PageScrollService,
        @Inject(DOCUMENT) private document: any,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private route: ActivatedRoute
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
        this.initializeLotLogHeaders();
        this.productionLine = this.route.snapshot.queryParamMap.get("pl")
    }

    configureForm(): void {
        this.lotTrackingForm = new FormGroup({
            operator: new FormControl('', Validators.required),
            materialCategory: new FormControl('', Validators.required),
            item: new FormControl('', Validators.required),
            lotNumber: new FormControl('', Validators.required),
            lastCaseOnPalette: new FormControl(''),
            filterLotLogBy: new FormControl('')
        });
    }

    initializeLotLogHeaders(): void {
        this.cols = [
            { field: 'dateProcessed', header: 'Date/Time Logged' },
            { field: 'operatorId', header: 'Operator' },
            { field: 'materialCategoryName', header: 'Material' },
            { field: 'itemDescription', header: 'Item Name' },
            { field: 'lotNumber', header: 'Lot Number' },
            { field: '', header: '' }
        ];
    }

    setUserCategoryValidators(): void {
        this.lotTrackingForm.get('lotNumber').valueChanges
            .subscribe(x => {                
                if (typeof x === 'string') {
                    this.selectedLotNumber = x;
                    this.lotNumberManuallyEntered = true;
                } 
            });
    }

    loadVendorLableImages(materialCategoryId: number): void {

      this.supplierShippingLabelImages = [];
      debugger
      this.vendorService.getVendorsByMaterialCategory(materialCategoryId)
        .then(vendors => {
          (<any>vendors).forEach((vendor) => {
            if (vendor) {
              let image = new Object();
              (<any>image).previewImageSrc = vendor.name.split(" ").join("-").toLowerCase();
              (<any>image).title = vendor.name;
              (<any>image).alt = vendor.name + " Shipping Label";

              this.supplierShippingLabelImages.push(image);
            }
          });
        });
    }

    // Begin Change Events

    operatorChange(event): void {
        this.selectedOperator = event.value;
    }

    materialCategoryChange(event): void {
      this.selectedMaterialCategory = event.value.id;
      this.loadItems(this.selectedMaterialCategory);
      this.filterLotLog(event.value.name);
      this.loadVendorLableImages(this.selectedMaterialCategory);
    }

    vendorChange(event): void {
        this.selectedSupplier = event.value;
        this.loadLots(this.selectedSupplier.id);
        this.loadItems(this.selectedSupplier.id);
    }

    itemChange(event: any): void {
        let lastLotLogged = <any>this.lotLogs[0];
        if (lastLotLogged.itemDescription.split(" - ")[1] !== event.value.description) {
            this.confirmationService.confirm({
                message: 'The item selected is different than the item of the last lot processed. Are you sure you want to continue?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.selectedItem = event.value.id;
                    this.loadLots(this.selectedItem)
                },
                reject: () => {
                    this.selectedItem = null;
                  this.selectedLotNumber = null;
                  this.lotTrackingForm.get('item').setValue(null);
                }
            });
        } else {
            this.selectedItem = event.value.id;
            this.loadLots(this.selectedItem)
        }
    }

    lotNumberChange(event): void {

      let lastLotLogged = <any>this.lotLogs[0];
      if (lastLotLogged.lotNumber !== event.value.lotNumber) {
        this.confirmationService.confirm({
          message: 'The lot number entered/selected is different from the last lot processed. Are you sure you want to continue?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            if (typeof event.value === 'string') {
              this.selectedLotNumber = event.value;
              this.lotNumberManuallyEntered = true;
            } else {
              this.selectedLotNumber = event.value.lotNumber;
            }
          },
          reject: () => {
            this.selectedLotNumber = null;
            this.lotTrackingForm.get('lotNumber').setValue(null);
          }
        });
      } else {
        if (typeof event.value === 'string') {
          this.selectedLotNumber = event.value;
          this.lotNumberManuallyEntered = true;
        } else {
          this.selectedLotNumber = event.value.lotNumber;
        }
      }

        
  }

    filterLotLog(materialCategory: any): void {
      // enable/disable ui-state-active class
      var list: string[] = ["Carton", "Bag", "Overwrap Film", "Contact Film"];

      list.forEach(x => {
        if (x === materialCategory) {
          document.querySelectorAll('div[aria-label="' + x + '"]')[0].classList.add("ui-state-active");
        } else {
          document.querySelectorAll('div[aria-label="' + x + '"]')[0].classList.remove("ui-state-active");
        }
      });

      // filter lot log dynamically
      this.pLotLog.filter(materialCategory, "materialCategoryName", "");
    }

    // End Change Events

    // Begin dialog methods

    showLabelInfo(): void {
        this.showLabelInfoDialog();
    }

    showLabelInfoDialog(): void {
        this.displayDialog = true;
    }

    closeLabelInfoDialog() : void {
        this.displayDialog = false;
    }

      // End dialog methods

      // Begin load data methods

    loadOptions(): void {
          this.loadVendors();
          this.loadOperators();
          this.loadMaterialCategories();
      }

    loadVendors(): void {
      this.vendorService.getVendors()
        .then(vendors => {
          (<any>vendors).forEach((vendor) => {
            this.supplierLabelList.push(vendor.name);
          });
        });        
    }

    loadOperators(): void {
        this.operatorOptions = [];
        this.operatorOptions.push({ label: '-Select One-', value: '' });
        this.operatorService.getOperators()
            .then(operators => {

                (<any>operators).forEach((operator) => {
                    this.operatorOptions.push({
                        label: operator.employeeNumber + " - " + operator.employeeName,
                        value: operator.id
                    });
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
                this.materialCategoryOptionsForLog = this.materialCategoryOptions.filter(x => x.value !== "");
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

        this.lotOptions = this.lotOptions.filter(x => x.value === '');

        this.lotService.getLots()
            .then(lots => {
                this.lots = <any>lots;
                this.lots.push({ label: '-Select One-', value: '' });
                this.lots.filter((lot) => lot.itemId == selectedItem).forEach((lot) => {

                    let labelValue = lot.vendorName == null
                      ? lot.lotNumber + " [lot manually entered]"
                      : lot.lotNumber + " - " + lot.vendorName + " - " + moment.utc(lot.dateReceived).tz("America/New_York").format("MM/DD/YYYY, hh:mm a")

                    this.lotOptions.push({
                        label: labelValue,
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
               (<any>x).dateProcessed = moment.utc((<any>x).dateProcessed).tz("America/New_York").format("MM/DD/YYYY, hh:mm a");
               (<any>x).itemDescription = (<any>x).vendorItemId + " - " + (<any>x).itemDescription
               })
               this.pLotLog.reset();
               this.lotTrackingForm.reset();
              
        });
    }

    // End load data methods

    validateLotNumber(event: any): void {
        if (event.target.value !== this.selectedLotNumber) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The entered lot numbers do not match.' });     
        }
    }

    onSubmit(value: any) {
        let processedLot = new ProcessedLot();
        processedLot.lotId = value.lotNumber.id;
        processedLot.lotNumber = this.selectedLotNumber;
        processedLot.itemId = this.selectedItem;
        processedLot.processedByUserId = this.selectedOperator;
        processedLot.lastCaseOnPalette = this.lastCaseOnPaletteChecked;
        processedLot.lotManuallyEntered = this.lotNumberManuallyEntered;

        this.lotService.saveProcessedLot(processedLot)
            .then(() => {
                this.messageService.add({ severity: 'info', summary: 'Confirmation', detail: 'The selected lot has been processed.' });

                // refresh table
                this.loadLotLog();

                // Clear out select lists
                this.itemOptions = this.itemOptions.filter(x => x.value === '');
                this.lotOptions = this.lotOptions.filter(x => x.value === '');
                this.lotTrackingForm.reset();

                //reset
                this.lotNumberManuallyEntered = false;
                this.selectedMaterialCategory = null;
                this.selectedLotNumber = null;
                this.selectedItem = null;


            });
    }

    deleteProcessedLot(index: number): void {

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

    filterByMaterialCategory(event: any) {
      this.pLotLog.filter(event.value.name, "materialCategoryName", "");
    }
}
