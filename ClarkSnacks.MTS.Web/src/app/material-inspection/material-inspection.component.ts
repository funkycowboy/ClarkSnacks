import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, FormGroup, Validators, NgForm } from '@angular/forms';
import { PageScrollService } from 'ngx-page-scroll-core';
// primeng
import { ConfirmationService, Message, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { MaterialCategoryEnum } from '../models/category';
// class
import { InspectionItem, InspectionLot, Inspection, InspectionQuestions } from '../models/inspection';
import { ItemService } from '../services/item-service';
import { MaterialCategoryService } from '../services/material-category-service';
// services
import { VendorService } from '../services/vendor-service';
import { inspect } from 'util';
import { InspectionService } from '../services/inspection-service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-material-inspection',
  templateUrl: './material-inspection.component.html',
    styleUrls: ['./material-inspection.component.css'],
    providers: [ConfirmationService, MessageService]
})

export class MaterialInspectionComponent implements OnInit {

    // Define ViewChilds
    @ViewChild("dtItem", { static: false }) public pTableItem: Table;
    @ViewChild('addNewItem', { read: false, static: false }) addNewItemButton: ElementRef;
  @ViewChild('addNewLot', { read: false, static: false }) addNewLotButton: ElementRef;
  @ViewChild(FormGroupDirective, { read: false, static: false }) formGroupDirective: FormGroupDirective;
    

    // Define select list options
    resultOptions: SelectItem[];
    overallResultOptions: SelectItem[];
    supplierOptions: SelectItem[] = [];
    itemTypeOptions: SelectItem[] = [];
    itemOptions: SelectItem[] = [];
    dispositionOptions: SelectItem[];
    holdStatusOptions: SelectItem[];

    selectedOverallResult: any = {};
    selectedItemType: string;
    selectedItemDescription: string;
    selectedItemCategory: string;
    selectedSupplier: number;
    approvedSupplierChecked: boolean;
    selectedDateReceived: string;
    selectedLotNumber: string;

    selectedQ1Option: string = "";
    selectedQ2Option: string = "";
    selectedQ3Option: string = "";
    selectedQ4Option: string = "";
    selectedQ5Option: string = "";
    selectedQ6Option: string = "";
    selectedQ7Option: string = "";
    selectedQ8Option: string = "";
    selectedQ9Option: string = "";
    selectedQ10Option: string = "";

    inspectionItems: InspectionItem[] = [];

    displayDialog: boolean = false;

    resultDescription: string = "";

    inspectionForm: FormGroup;

    showStep1: boolean;
    showStep2: boolean;
    showStep3: boolean;

    lotCounter: number = 0;
    itemCounter: number = 0;

    msgs: Message[] = [];

    selectedQuestionAnswer: number;

    constructor(private fb: FormBuilder,
        private ref: ChangeDetectorRef,
        private vendorService: VendorService,
        private materialCategoryService: MaterialCategoryService,
        private itemService: ItemService,
        private pageScrollService: PageScrollService,
        @Inject(DOCUMENT) private document: any,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private inspectionService: InspectionService) {

        this.loadOptions();
    }

    ngOnInit() : void {
      this.configureForm();
      this.setInspectionFormStep2Validators();
      this.setInspectionFormStep4Validators();
    }

    continue() : void {
        this.displayDialog = true;
    }

    showDescription(event) {
        switch (event.value.code.toLowerCase()) {
            case "accepted":
                this.resultDescription = "All tests passed and the material is available for use.";
                break;

            case "rejected":
                this.resultDescription = "One or more of the test results are \"No\" and significantly affect food safety or quality.";
                break;

            case "deviation":
                this.resultDescription = "One or more of the test results are \"No\" and affect food safety or quality. ";
                break;
        }
    }

    loadOptions() : void {

        // Data-driven options
        this.loadVendors();
        this.loadCategories();        

        // Hard coded options
        this.overallResultOptions = [
            { label: 'Accepted', value: { id: 1, name: 'Accepted', code: 'accepted' } },
            { label: 'Rejected', value: { id: 2, name: 'Rejected', code: 'rejected' } },
            { label: 'Deviation', value: { id: 3, name: 'Deviation', code: 'deviation' } },
        ];
        this.resultOptions = [
            { label: 'Yes', value: 1},
            { label: 'No', value: 2},
            { label: 'N/A', value: 3},
        ];       
        this.dispositionOptions = [

            { label: '- Select a Disposition -', value: null },
            { label: 'Use As Is', value: 1},
            { label: 'Customer Approval To Use', value: 2},
            { label: 'Dispose', value: 3},
            { label: 'Rework', value: 4},
            { label: 'Return To Supplier', value: 5},
            { label: 'Other', value: 6}
        ];
        this.holdStatusOptions = [

            { label: '- Select a Hold Status -', value: null },
            { label: 'Level 1', value: 1},
            { label: 'Level 2', value: 2},
            { label: 'Not Applicable', value: 3}
        ];
    }

    configureForm() : void {
        this.inspectionForm = new FormGroup({
          supplier: new FormControl('', Validators.required),
          approvedSupplier: new FormControl(''),
          dateReceived: new FormControl('', Validators.required),
          bolShipmentNumber: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
          inspectionFormStep2: new FormGroup({
              item: new FormControl(),
              lotNumber: new FormControl(),
              itemQuantity: new FormControl(),
              comment: new FormControl('')
          }),
          inspectionFormStep3: new FormGroup({
              bagQuestion1: new FormControl(''),
              bagQuestion2: new FormControl(''),
              bagQuestion3: new FormControl(''),
              bagQuestion4: new FormControl(''),
              bagQuestion5: new FormControl(''),
              bagQuestion6: new FormControl(''),
              bagQuestion7: new FormControl(''),
              bagQuestion8: new FormControl(''),
              bagQuestion9: new FormControl(''),
              bagQuestion10: new FormControl(''),
              bagQuestion1Comment: new FormControl(''),
              bagQuestion2Comment: new FormControl(''),
              bagQuestion3Comment: new FormControl(''),
              bagQuestion4Comment: new FormControl(''),
              bagQuestion5Comment: new FormControl(''),
              bagQuestion6Comment: new FormControl(''),
              bagQuestion7Comment: new FormControl(''),
              bagQuestion8Comment: new FormControl(''),
              bagQuestion9Comment: new FormControl(''),
              bagQuestion10Comment: new FormControl(''),
              cartonQuestion1: new FormControl(''),
              cartonQuestion2: new FormControl(''),
              cartonQuestion3: new FormControl(''),
              cartonQuestion4: new FormControl(''),
              cartonQuestion5: new FormControl(''),
              cartonQuestion6: new FormControl(''),
              cartonQuestion7: new FormControl(''),
              cartonQuestion8: new FormControl(''),
              cartonQuestion1Comment: new FormControl(''),
              cartonQuestion2Comment: new FormControl(''),
              cartonQuestion3Comment: new FormControl(''),
              cartonQuestion4Comment: new FormControl(''),
              cartonQuestion5Comment: new FormControl(''),
              cartonQuestion6Comment: new FormControl(''),
              cartonQuestion7Comment: new FormControl(''),
              cartonQuestion8Comment: new FormControl(''),
              contactFilmQuestion1: new FormControl(''),
              contactFilmQuestion2: new FormControl(''),
              contactFilmQuestion3: new FormControl(''),
              contactFilmQuestion4: new FormControl(''),
              contactFilmQuestion5: new FormControl(''),
              contactFilmQuestion6: new FormControl(''),
              contactFilmQuestion7: new FormControl(''),
              contactFilmQuestion8: new FormControl(''),
              contactFilmQuestion9: new FormControl(''),
              contactFilmQuestion10: new FormControl(''),
              contactFilmQuestion1Comment: new FormControl(''),
              contactFilmQuestion2Comment: new FormControl(''),
              contactFilmQuestion3Comment: new FormControl(''),
              contactFilmQuestion4Comment: new FormControl(''),
              contactFilmQuestion5Comment: new FormControl(''),
              contactFilmQuestion6Comment: new FormControl(''),
              contactFilmQuestion7Comment: new FormControl(''),
              contactFilmQuestion8Comment: new FormControl(''),
              contactFilmQuestion9Comment: new FormControl(''),
              contactFilmQuestion10Comment: new FormControl(''),
              overwrapFilmQuestion1: new FormControl(''),
              overwrapFilmQuestion2: new FormControl(''),
              overwrapFilmQuestion3: new FormControl(''),
              overwrapFilmQuestion4: new FormControl(''),
              overwrapFilmQuestion5: new FormControl(''),
              overwrapFilmQuestion6: new FormControl(''),
              overwrapFilmQuestion7: new FormControl(''),
              overwrapFilmQuestion8: new FormControl(''),
              overwrapFilmQuestion1Comment: new FormControl(''),
              overwrapFilmQuestion2Comment: new FormControl(''),
              overwrapFilmQuestion3Comment: new FormControl(''),
              overwrapFilmQuestion4Comment: new FormControl(''),
              overwrapFilmQuestion5Comment: new FormControl(''),
              overwrapFilmQuestion6Comment: new FormControl(''),
              overwrapFilmQuestion7Comment: new FormControl(''),
              overwrapFilmQuestion8Comment: new FormControl('')
            }),
            inspectionFormStep4: new FormGroup({
              result: new FormControl(''),
              disposition: new FormControl(''),
              deviationNumber: new FormControl(''),
              holdStatus: new FormControl(),
              measuresToPreventRelease: new FormControl('')
            })
        });
    }

    setInspectionFormStep2Validators() : void {
       
        this.inspectionForm.get("inspectionFormStep2").get('item').valueChanges
            .subscribe(item => {

              if (item) {
                switch (item.materialCategoryId) {
                  case 1: // carton
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion1').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion2').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion3').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion4').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion5').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion6').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion7').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion8').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion1').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion2').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion3').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion4').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion5').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion6').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion7').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion8').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion9').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion10').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion1').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion2').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion3').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion4').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion5').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion6').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion7').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion8').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion9').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion10').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion1').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion2').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion3').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion4').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion5').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion6').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion7').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion8').setValidators(null);
                    break;
                  case 2: // Bag
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion1').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion2').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion3').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion4').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion5').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion6').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion7').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion8').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion9').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion10').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion1').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion2').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion3').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion4').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion5').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion6').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion7').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion8').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion1').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion2').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion3').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion4').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion5').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion6').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion7').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion8').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion9').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion10').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion1').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion2').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion3').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion4').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion5').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion6').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion7').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion8').setValidators(null);
                    break;
                  case 3: // Contact film
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion1').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion2').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion3').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion4').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion5').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion6').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion7').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion8').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion9').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion10').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion1').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion2').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion3').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion4').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion5').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion6').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion7').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion8').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion1').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion2').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion3').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion4').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion5').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion6').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion7').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion8').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion9').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion10').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion1').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion2').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion3').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion4').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion5').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion6').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion7').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion8').setValidators(null);

                    break;

                  case 4: // Overwrap Film
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion1').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion2').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion3').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion4').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion5').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion6').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion7').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion8').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion9').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('bagQuestion10').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion1').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion2').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion3').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion4').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion5').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion6').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion7').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion8').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion1').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion2').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion3').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion4').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion5').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion6').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion7').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion8').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion9').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion10').setValidators(null);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion2').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion3').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion4').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion5').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion6').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion7').setValidators([Validators.required]);
                    this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion8').setValidators([Validators.required]);

                    break;
                }

                this.inspectionForm.get("inspectionFormStep3").get('bagQuestion1').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('bagQuestion2').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('bagQuestion3').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('bagQuestion4').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('bagQuestion5').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('bagQuestion6').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('bagQuestion7').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('bagQuestion8').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('bagQuestion9').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('bagQuestion10').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion1').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion2').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion3').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion4').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion5').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion6').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion7').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('cartonQuestion8').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion1').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion2').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion3').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion4').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion5').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion6').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion7').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion8').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion9').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('contactFilmQuestion10').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion1').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion2').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion3').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion4').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion5').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion6').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion7').updateValueAndValidity();
                this.inspectionForm.get("inspectionFormStep3").get('overwrapFilmQuestion8').updateValueAndValidity();

              }
          });
    }

    setInspectionFormStep4Validators(): void {

      this.inspectionForm.get("inspectionFormStep4").get('result').valueChanges
        .subscribe(x => {
          
          if (x.name) {
            

            switch (x.name.toLowerCase()) {
              case "accepted":
                this.inspectionForm.get("inspectionFormStep4").get('deviationNumber').setValidators(null);
                this.inspectionForm.get("inspectionFormStep4").get('disposition').setValidators(null);
                this.inspectionForm.get("inspectionFormStep4").get('holdStatus').setValidators(null);
                this.inspectionForm.get("inspectionFormStep4").get('measuresToPreventRelease').setValidators(null);
                break;
              case "rejected":
                this.inspectionForm.get("inspectionFormStep4").get('deviationNumber').setValidators(null);
                this.inspectionForm.get("inspectionFormStep4").get('disposition').setValidators([Validators.required]);
                this.inspectionForm.get("inspectionFormStep4").get('holdStatus').setValidators([Validators.required]);
                this.inspectionForm.get("inspectionFormStep4").get('measuresToPreventRelease').setValidators([Validators.required]);
                break;
              case "deviation":
                this.inspectionForm.get("inspectionFormStep4").get('deviationNumber').setValidators([Validators.required]);
                this.inspectionForm.get("inspectionFormStep4").get('disposition').setValidators(null);
                this.inspectionForm.get("inspectionFormStep4").get('holdStatus').setValidators([Validators.required]);
                this.inspectionForm.get("inspectionFormStep4").get('measuresToPreventRelease').setValidators([Validators.required]);
                break;
            }

            this.inspectionForm.get("inspectionFormStep4").get('deviationNumber').updateValueAndValidity();
            this.inspectionForm.get("inspectionFormStep4").get('disposition').updateValueAndValidity();
            this.inspectionForm.get("inspectionFormStep4").get('holdStatus').updateValueAndValidity();
            this.inspectionForm.get("inspectionFormStep4").get('measuresToPreventRelease').updateValueAndValidity();
          }
        });
    }

    addNewItemTableRow() : void {
        this.itemCounter++;
        let inspectionItem = new InspectionItem();
        inspectionItem.id = this.itemCounter;

        // Uncomment if we are wanting to add a default inspect lot record initially
        //let inspectionLot = new InspectionLot
        //inspectionLot.id = this.lotCounter;
        //inspectionLot.comment = "";
        //inspectionLot.itemQuantity = null;
        //inspectionLot.lotNumber = "";

        //inspectionItem.inspectionLots.push(inspectionLot);

        this.pTableItem.value.push(inspectionItem);
        this.pTableItem.reset();
    }

    addNewLotTableRow(rowIndex: any) {

        this.lotCounter++;
        let inspectionLot = new InspectionLot
        inspectionLot.id = this.lotCounter;
        inspectionLot.comment = "";
        inspectionLot.quantity = null;
        inspectionLot.lotNumber = "";

        this.pTableItem.value[rowIndex].inspectionLots.push(inspectionLot)
        this.pTableItem.reset();
    }

    removeLot(itemRowIndex: any, lotRowIndex: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to remove the lot?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
                this.messageService.add({ severity: 'info', summary: 'Task Completed', detail: 'The lot has been removed.' });                

                var updatesLots = this.pTableItem.value[itemRowIndex].inspectionLots.slice(0, lotRowIndex).concat(this.pTableItem.value[itemRowIndex].inspectionLots.slice(lotRowIndex + 1));
                this.lotCounter--;
                this.pTableItem.value[itemRowIndex].inspectionLots = updatesLots;
                this.pTableItem.reset();

                this.updateItemQuantity(itemRowIndex);
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            }
        });
    }

    removeItem(itemRowIndex: any) {

        this.confirmationService.confirm({
            message: 'Are you sure that you want to remove the item?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
                this.messageService.add({ severity: 'info', summary: 'Task Completed', detail: 'The item has been removed.' });


                var updatedArray = this.pTableItem.value.slice(0, itemRowIndex).concat(this.pTableItem.value.slice(itemRowIndex + 1));
                this.itemCounter--;
                this.pTableItem.value = updatedArray;
                this.pTableItem.reset();
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            }
        });
    }

   // Begin Change Events

    vendorChange(event) {
        this.selectedSupplier = event.value;
        this.loadItems(this.selectedSupplier);

        // clear description
        this.selectedItemDescription = "";   
    }

    itemTypeChange(event: any, rowIndex: any) {
        this.selectedItemType = event.value;

        this.pTableItem.value[rowIndex].description = event.value.description;
        this.pTableItem.reset();

        //this.selectedItemDescription = event.value.description;
        this.selectedItemCategory = MaterialCategoryEnum[event.value.materialCategoryId];
    }

    lotNumberChange(event) {
        this.selectedLotNumber = event.value;
    }

    quantityChange(event: any, rowIndex: any) {
        this.updateItemQuantity(rowIndex);
    }    

    // Begin navigation methods

    goToStep1() : void {
        this.showStep1 = true;
        this.showStep2 = false;
        this.showStep3 = false;
    }

    goToStep2() : void {
        this.showStep1 = true;
        this.showStep2 = true;
        this.showStep3 = false;
        
        if (this.inspectionItems.length == 0) {
            this.addNewItemButton.nativeElement.click();

          setTimeout(() => {
              this.pageScrollService.scroll({
                  document: this.document,
                  scrollTarget: '.step2'
              });
          });
        }
    }

    goToStep3() : void {
        this.showStep1 = true;
        this.showStep2 = true;
        this.showStep3 = true;
        setTimeout(() => {
            this.pageScrollService.scroll({
                document: this.document,
                scrollTarget: '.step3',
            });
        });
    }

    goToStep4(): void {
      
      this.showStep1 = true;
      this.showStep2 = true;
      this.showStep3 = true;
      this.displayDialog = true;
    }

    // Begin load methods

  loadVendors(): void {
    this.supplierOptions = [];
    this.supplierOptions.push({ label: '-Select One-', value: '' });
    this.vendorService.getVendors()
        .then(vendors => {
            (<any>vendors).forEach((item) => {
                this.supplierOptions.push({ label: item.name, value: item.id });
            });
        });
    }

    loadCategories() : void {
        this.materialCategoryService.getMaterialCategories()
            .then(categories => {
                (<any>categories).forEach((item) => {
                    this.itemTypeOptions.push({ label: item.name, value: item.id });
                });
            });
    }

    loadItems(selectedSupplier): void {

        this.itemOptions = [];
        this.itemOptions.push({ label: '-Select One-', value: '' });
        this.itemService.getItems(selectedSupplier)
            .then(items => {
                
                (<any>items).forEach((item) => {
                    this.itemOptions.push({ label: item.vendorItemId + " - " + item.description, value: { id: item.id, description: item.description, materialCategoryId: item.materialCategoryId } });
                });
            });
  }

    updateItemQuantity(rowIndex: any): void {
      let lotCount: number = 0;
      this.pTableItem.value[rowIndex].inspectionLots.forEach((lot) => {
        lotCount = lotCount + lot.itemQuantity;
    });

    this.pTableItem.value[rowIndex].totalQuantity = lotCount;
    this.pTableItem.reset();
    }

    isFormValid(): boolean {
      return !(this.inspectionForm.valid && this.inspectionForm.get("inspectionFormStep2").dirty && this.inspectionForm.get("inspectionFormStep3").dirty)
  }

    onSubmit(value: NgForm) {
      
      let inspection = new Inspection();

      // Set shipment information
      inspection.bolShipmentNumber = this.inspectionForm.get("bolShipmentNumber").value;
      inspection.dateReceived = this.inspectionForm.get("dateReceived").value;
      inspection.supplierId = this.inspectionForm.get("supplier").value;
      inspection.isApprovedSupplier = this.inspectionForm.get("approvedSupplier").value;
      inspection.inspectedById = 1;

      // Set Item/Lot information
      let inspectionItems: InspectionItem[];
      inspectionItems = this.pTableItem.value;

      let lots: InspectionLot[] = [];
      inspectionItems.forEach(item => {
        item.inspectionLots.forEach(lot => {
          lot.itemId = (<any>item).item.id
          lot.createdByUserId = 1;
          lots.push(lot);
        });
      });
      inspection.lots = lots;

      // Set Questions
      let questions = new InspectionQuestions();

      //--Cartons
      questions.cartonQuestion1 = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion1").value;
      questions.cartonQuestion2 = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion2").value;
      questions.cartonQuestion3 = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion3").value;
      questions.cartonQuestion4 = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion4").value;
      questions.cartonQuestion5 = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion5").value;
      questions.cartonQuestion6 = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion6").value;
      questions.cartonQuestion7 = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion7").value;
      questions.cartonQuestion8 = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion8").value;
      questions.cartonQuestion1Comment = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion1Comment").value;
      questions.cartonQuestion2Comment = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion2Comment").value;
      questions.cartonQuestion3Comment = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion3Comment").value;
      questions.cartonQuestion4Comment = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion4Comment").value;
      questions.cartonQuestion5Comment = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion5Comment").value;
      questions.cartonQuestion6Comment = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion6Comment").value;
      questions.cartonQuestion7Comment = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion7Comment").value;
      questions.cartonQuestion8Comment = this.inspectionForm.get("inspectionFormStep3").get("cartonQuestion8Comment").value;;

      //--Bags
      questions.bagQuestion1 = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion1").value;
      questions.bagQuestion2 = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion2").value;
      questions.bagQuestion3 = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion3").value;
      questions.bagQuestion4 = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion4").value;
      questions.bagQuestion5 = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion5").value;
      questions.bagQuestion6 = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion6").value;
      questions.bagQuestion7 = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion7").value;
      questions.bagQuestion8 = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion8").value;
      questions.bagQuestion9 = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion9").value;
      questions.bagQuestion10 = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion10").value;
      questions.bagQuestion1Comment = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion1Comment").value;
      questions.bagQuestion2Comment = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion2Comment").value;
      questions.bagQuestion3Comment = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion3Comment").value;
      questions.bagQuestion4Comment = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion4Comment").value;
      questions.bagQuestion5Comment = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion5Comment").value;
      questions.bagQuestion6Comment = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion6Comment").value;
      questions.bagQuestion7Comment = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion7Comment").value;
      questions.bagQuestion8Comment = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion8Comment").value;
      questions.bagQuestion9Comment = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion9Comment").value;
      questions.bagQuestion10Comment = this.inspectionForm.get("inspectionFormStep3").get("bagQuestion10Comment").value;

      //--Contact Film
      questions.contactFilmQuestion1 = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion1").value;
      questions.contactFilmQuestion2 = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion2").value;
      questions.contactFilmQuestion3 = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion3").value;
      questions.contactFilmQuestion4 = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion4").value;
      questions.contactFilmQuestion5 = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion5").value;
      questions.contactFilmQuestion6 = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion6").value;
      questions.contactFilmQuestion7 = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion7").value;
      questions.contactFilmQuestion8 = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion8").value;
      questions.contactFilmQuestion9 = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion9").value;
      questions.contactFilmQuestion10 = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion10").value;
      questions.contactFilmQuestion1Comment = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion1Comment").value;
      questions.contactFilmQuestion2Comment = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion2Comment").value;
      questions.contactFilmQuestion3Comment = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion3Comment").value;
      questions.contactFilmQuestion4Comment = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion4Comment").value;
      questions.contactFilmQuestion5Comment = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion5Comment").value;
      questions.contactFilmQuestion6Comment = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion6Comment").value;
      questions.contactFilmQuestion7Comment = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion7Comment").value;
      questions.contactFilmQuestion8Comment = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion8Comment").value;
      questions.contactFilmQuestion9Comment = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion9Comment").value;
      questions.contactFilmQuestion10Comment = this.inspectionForm.get("inspectionFormStep3").get("contactFilmQuestion10Comment").value;

      //--Overwrap Film
      questions.overwrapFilmQuestion1 = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion1").value;
      questions.overwrapFilmQuestion2 = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion2").value;
      questions.overwrapFilmQuestion3 = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion3").value;
      questions.overwrapFilmQuestion4 = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion4").value;
      questions.overwrapFilmQuestion5 = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion5").value;
      questions.overwrapFilmQuestion6 = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion6").value;
      questions.overwrapFilmQuestion7 = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion7").value;
      questions.overwrapFilmQuestion8 = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion8").value;
      questions.overwrapFilmQuestion1Comment = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion1Comment").value;
      questions.overwrapFilmQuestion2Comment = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion2Comment").value;
      questions.overwrapFilmQuestion3Comment = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion3Comment").value;
      questions.overwrapFilmQuestion4Comment = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion4Comment").value;
      questions.overwrapFilmQuestion5Comment = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion5Comment").value;
      questions.overwrapFilmQuestion6Comment = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion6Comment").value;
      questions.overwrapFilmQuestion7Comment = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion7Comment").value;
      questions.overwrapFilmQuestion8Comment = this.inspectionForm.get("inspectionFormStep3").get("overwrapFilmQuestion8Comment").value;

      inspection.questions = questions;

      // Set results/disposition

      let result = this.inspectionForm.get("inspectionFormStep4").get("result").value;
      inspection.resultId = result.id;
      switch (result.code) {
        case "accepted":
          inspection.dispositionId = null;
          inspection.deviationNumber = null
          inspection.holdStatusId = null;
          inspection.measuresToPreventRelease = null;
          break;
        case "rejected":
          inspection.dispositionId = this.inspectionForm.get("inspectionFormStep4").get("disposition").value;
          inspection.deviationNumber = null;
          inspection.holdStatusId = this.inspectionForm.get("inspectionFormStep4").get("holdStatus").value;
          inspection.measuresToPreventRelease = this.inspectionForm.get("inspectionFormStep4").get("measuresToPreventRelease").value;
          break;

        case "deviation":
          inspection.dispositionId = null;
          inspection.deviationNumber = this.inspectionForm.get("inspectionFormStep4").get("deviationNumber").value;
          inspection.holdStatusId = this.inspectionForm.get("inspectionFormStep4").get("holdStatus").value;
          inspection.measuresToPreventRelease = this.inspectionForm.get("inspectionFormStep4").get("measuresToPreventRelease").value;
          break;
      }

      // Save inspection
      this.inspectionService.saveInspection(inspection)
        .then(() => {
          this.messageService.add({ severity: 'info', summary: 'Confirmation', detail: 'The inspection has been saved.' });
          this.displayDialog = false;
          this.goToStep1();
          this.resetForm();
        },() => {
            this.messageService.add({ severity: 'error', summary: 'Confirmation', detail: 'There was an error saving the inspection.' });
        });

    }

    resetForm(): void {
      this.inspectionForm.reset();
      this.pTableItem.reset();
      this.pTableItem.value.length = 0;
    }

    cancel(): void {
      this.displayDialog = false;
    }
}
