import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

// primeng
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-material-inspection',
  templateUrl: './material-inspection.component.html',
  styleUrls: ['./material-inspection.component.css']
})
export class MaterialInspectionComponent implements OnInit {

    resultOptions: SelectItem[];
    overallResultOptions: SelectItem[];
    supplierOptions: SelectItem[];
    itemTypeOptions: SelectItem[];
    dispositionOptions: SelectItem[];
    holdStatusOptions: SelectItem[];

    selectedOverallResult: string = "";
    selectedItemType: string = "";

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

    //q1Checked: boolean = false;
    //q2Checked: boolean = false;
    //q3Checked: boolean = false;
    //q4Checked: boolean = false;
    //q5Checked: boolean = false;
    //q6Checked: boolean = false;
    //q7Checked: boolean = false;
    //q8Checked: boolean = false;
    //q9Checked: boolean = false;
    //q10Checked: boolean = false;

    displayDialog: boolean;

    resultDescription: string = "";

    inspectionForm: FormGroup;

    constructor(private fb: FormBuilder,) {

        this.loadOptions();
    }

    ngOnInit() {
        this.configureForm();
        this.setUserCategoryValidators();
    }

    continue() {
        debugger;
        this.displayDialog = true;
    }

    save() {
        this.displayDialog = false;
    }

    onSubmit(value: string) {
        alert("submitted");
    }

    cancel() {
        this.displayDialog = false;
    }

    showDescription(event) {
        debugger
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

    loadOptions() {
        this.overallResultOptions = [
            { label: 'Accepted', value: { id: 1, name: 'Accepted', code: 'accepted' } },
            { label: 'Rejected', value: { id: 2, name: 'Rejected', code: 'rejected' } },
            { label: 'Deviation', value: { id: 3, name: 'Deviation', code: 'deviation' } },
        ];

        this.resultOptions = [
            { label: 'Yes', value: { id: 1, name: 'Yes', code: 'Y' } },
            { label: 'No', value: { id: 2, name: 'No', code: 'N' } },
            { label: 'N/A', value: { id: 3, name: 'N/A', code: 'NA' } },
        ];

        this.supplierOptions = [
            { label: '- Select a Supplier -', value: null },
            { label: 'Supplier A', value: { id: 1, name: 'Supplier A', code: 'supplier A' } },
            { label: 'Supplier C', value: { id: 2, name: 'Supplier A', code: 'supplier A' } },
            { label: 'Supplier F', value: { id: 3, name: 'Supplier A', code: 'supplier A' } }
        ];

        this.itemTypeOptions = [

            { label: '- Select an Item -', value: null },
            { label: 'Carton', value: { id: 1, name: 'Carton', code: 'carton' } },
            { label: 'Bag', value: { id: 3, name: 'Bag', code: 'bag' } },
            { label: 'Contact Film', value: { id: 2, name: 'Contact Film', code: 'contact film' } },
            { label: 'Overwrap Film', value: { id: 2, name: 'Overwrap Film', code: 'overwrap film' } },

        ];

        this.dispositionOptions = [

            { label: '- Select a Disposition -', value: null },
            { label: 'Disposition 1', value: { id: 1, name: 'Disposition 1', code: 'disposition1' } },
            { label: 'Disposition 2', value: { id: 2, name: 'Disposition 2', code: 'disposition2' } },
            { label: 'Disposition 3', value: { id: 3, name: 'Disposition 3', code: 'disposition3' } }
        ];

        this.holdStatusOptions = [

            { label: '- Select a Hold Status -', value: null },
            { label: 'Hold Status 1', value: { id: 1, name: 'Hold Status 1', code: 'Hold Status 1' } },
            { label: 'Hold Status 2', value: { id: 2, name: 'Hold Status 2', code: 'Hold Status 2' } },
            { label: 'Hold Status 3', value: { id: 3, name: 'Hold Status 3', code: 'Hold Status 3' } }
        ];
    }

    configureForm() {
        this.inspectionForm = this.fb.group({
            'supplier': new FormControl('', Validators.required),
            'approvedSupplier': new FormControl('', Validators.required),
            'itemType': new FormControl('', Validators.required),
            'dateReceived': new FormControl('', Validators.required),
            'bolShipmentNumber': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
            'lotNumber': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
            'itemTypeBagQ1': new FormControl(''),
            'itemTypeBagQ2': new FormControl(''),
            'itemTypeBagQ3': new FormControl(''),
            'itemTypeBagQ4': new FormControl(''),
            'itemTypeBagQ5': new FormControl(''),
            'itemTypeBagQ6': new FormControl(''),
            'itemTypeBagQ7': new FormControl(''),
            'itemTypeBagQ8': new FormControl(''),
            'itemTypeBagQ9': new FormControl(''),
            'itemTypeBagQ10': new FormControl(''),
            'itemTypeCartonQ1': new FormControl(''),
            'itemTypeCartonQ2': new FormControl(''),
            'itemTypeCartonQ3': new FormControl(''),
            'itemTypeCartonQ4': new FormControl(''),
            'itemTypeCartonQ5': new FormControl(''),
            'itemTypeCartonQ6': new FormControl(''),
            'itemTypeCartonQ7': new FormControl(''),
            'itemTypeCartonQ8': new FormControl(''),
            'itemTypeContactFilmQ1': new FormControl(''),
            'itemTypeContactFilmQ2': new FormControl(''),
            'itemTypeContactFilmQ3': new FormControl(''),
            'itemTypeContactFilmQ4': new FormControl(''),
            'itemTypeContactFilmQ5': new FormControl(''),
            'itemTypeContactFilmQ6': new FormControl(''),
            'itemTypeContactFilmQ7': new FormControl(''),
            'itemTypeContactFilmQ8': new FormControl(''),
            'itemTypeContactFilmQ9': new FormControl(''),
            'itemTypeContactFilmQ10': new FormControl(''),
            'itemTypeOverwrapFilmQ1': new FormControl(''),
            'itemTypeOverwrapFilmQ2': new FormControl(''),
            'itemTypeOverwrapFilmQ3': new FormControl(''),
            'itemTypeOverwrapFilmQ4': new FormControl(''),
            'itemTypeOverwrapFilmQ5': new FormControl(''),
            'itemTypeOverwrapFilmQ6': new FormControl(''),
            'itemTypeOverwrapFilmQ7': new FormControl(''),
            'itemTypeOverwrapFilmQ8': new FormControl('')
        });
    }

    setUserCategoryValidators() {
        //const institutionControl = this.inspectionForm.get('institution');
        //const companyControl = this.inspectionForm.get('company');
        //const salaryControl = this.inspectionForm.get('salary');
        
        this.inspectionForm.get('itemType').valueChanges
            .subscribe(itemType => {
                debugger
                if (itemType.code === 'bag') {
                    this.inspectionForm.get('itemTypeBagQ1').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeBagQ2').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeBagQ3').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeBagQ4').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeBagQ5').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeBagQ6').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeBagQ7').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeBagQ8').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeBagQ9').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeBagQ10').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeCartonQ1').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ2').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ3').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ4').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ5').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ6').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ7').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ8').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ1').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ2').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ3').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ4').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ5').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ6').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ7').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ8').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ9').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ10').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ1').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ2').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ3').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ4').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ5').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ6').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ7').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ8').setValidators(null);                    
                }
                if (itemType.code === 'carton') {
                    this.inspectionForm.get('itemTypeBagQ1').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ2').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ3').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ4').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ5').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ6').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ7').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ8').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ9').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ10').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ1').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeCartonQ2').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeCartonQ3').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeCartonQ4').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeCartonQ5').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeCartonQ6').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeCartonQ7').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeCartonQ8').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeContactFilmQ1').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ2').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ3').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ4').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ5').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ6').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ7').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ8').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ9').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ10').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ1').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ2').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ3').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ4').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ5').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ6').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ7').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ8').setValidators(null);
                }

                if (itemType.code === 'contact film') {
                    this.inspectionForm.get('itemTypeBagQ1').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ2').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ3').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ4').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ5').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ6').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ7').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ8').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ9').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ10').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ1').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ2').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ3').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ4').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ5').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ6').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ7').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ8').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ1').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeContactFilmQ2').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeContactFilmQ3').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeContactFilmQ4').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeContactFilmQ5').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeContactFilmQ6').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeContactFilmQ7').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeContactFilmQ8').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeContactFilmQ9').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeContactFilmQ10').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ1').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ2').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ3').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ4').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ5').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ6').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ7').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ8').setValidators(null);
                }

                if (itemType.code === 'overwrap film') {
                    this.inspectionForm.get('itemTypeBagQ1').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ2').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ3').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ4').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ5').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ6').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ7').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ8').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ9').setValidators(null);
                    this.inspectionForm.get('itemTypeBagQ10').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ1').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ2').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ3').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ4').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ5').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ6').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ7').setValidators(null);
                    this.inspectionForm.get('itemTypeCartonQ8').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ1').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ2').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ3').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ4').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ5').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ6').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ7').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ8').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ9').setValidators(null);
                    this.inspectionForm.get('itemTypeContactFilmQ10').setValidators(null);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ1').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ2').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ3').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ4').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ5').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ6').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ7').setValidators([Validators.required]);
                    this.inspectionForm.get('itemTypeOverwrapFilmQ8').setValidators([Validators.required]);
                }

                this.inspectionForm.get('itemTypeBagQ1').updateValueAndValidity();
                this.inspectionForm.get('itemTypeBagQ2').updateValueAndValidity();
                this.inspectionForm.get('itemTypeBagQ3').updateValueAndValidity();
                this.inspectionForm.get('itemTypeBagQ4').updateValueAndValidity();
                this.inspectionForm.get('itemTypeBagQ5').updateValueAndValidity();
                this.inspectionForm.get('itemTypeBagQ6').updateValueAndValidity();
                this.inspectionForm.get('itemTypeBagQ7').updateValueAndValidity();
                this.inspectionForm.get('itemTypeBagQ8').updateValueAndValidity();
                this.inspectionForm.get('itemTypeBagQ9').updateValueAndValidity();
                this.inspectionForm.get('itemTypeBagQ10').updateValueAndValidity();
                this.inspectionForm.get('itemTypeCartonQ1').updateValueAndValidity();
                this.inspectionForm.get('itemTypeCartonQ2').updateValueAndValidity();
                this.inspectionForm.get('itemTypeCartonQ3').updateValueAndValidity();
                this.inspectionForm.get('itemTypeCartonQ4').updateValueAndValidity();
                this.inspectionForm.get('itemTypeCartonQ5').updateValueAndValidity();
                this.inspectionForm.get('itemTypeCartonQ6').updateValueAndValidity();
                this.inspectionForm.get('itemTypeCartonQ7').updateValueAndValidity();
                this.inspectionForm.get('itemTypeCartonQ8').updateValueAndValidity();
                this.inspectionForm.get('itemTypeContactFilmQ1').updateValueAndValidity();
                this.inspectionForm.get('itemTypeContactFilmQ2').updateValueAndValidity();
                this.inspectionForm.get('itemTypeContactFilmQ3').updateValueAndValidity();
                this.inspectionForm.get('itemTypeContactFilmQ4').updateValueAndValidity();
                this.inspectionForm.get('itemTypeContactFilmQ5').updateValueAndValidity();
                this.inspectionForm.get('itemTypeContactFilmQ6').updateValueAndValidity();
                this.inspectionForm.get('itemTypeContactFilmQ7').updateValueAndValidity();
                this.inspectionForm.get('itemTypeContactFilmQ8').updateValueAndValidity();
                this.inspectionForm.get('itemTypeContactFilmQ9').updateValueAndValidity();
                this.inspectionForm.get('itemTypeContactFilmQ10').updateValueAndValidity();
                this.inspectionForm.get('itemTypeOverwrapFilmQ1').updateValueAndValidity();
                this.inspectionForm.get('itemTypeOverwrapFilmQ2').updateValueAndValidity();
                this.inspectionForm.get('itemTypeOverwrapFilmQ3').updateValueAndValidity();
                this.inspectionForm.get('itemTypeOverwrapFilmQ4').updateValueAndValidity();
                this.inspectionForm.get('itemTypeOverwrapFilmQ5').updateValueAndValidity();
                this.inspectionForm.get('itemTypeOverwrapFilmQ6').updateValueAndValidity();
                this.inspectionForm.get('itemTypeOverwrapFilmQ7').updateValueAndValidity();
                this.inspectionForm.get('itemTypeOverwrapFilmQ8').updateValueAndValidity();
            });
    }
}
