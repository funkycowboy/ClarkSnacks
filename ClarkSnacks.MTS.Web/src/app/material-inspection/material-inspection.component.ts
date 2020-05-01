import { Component, OnInit } from '@angular/core';

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

    constructor() {

        this.loadOptions();
    }

    ngOnInit() {
    }


    continue() {
        debugger;
        this.displayDialog = true;
    }

    save() {
        debugger;
        this.displayDialog = false;
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
            { label: 'N/A', value: null }
        ];

        this.supplierOptions = [
            { label: '- Select a Supplier -', value: null },
            { label: 'Supplier A', value: { id: 1, name: 'Supplier A', code: 'Supplier A' } },
            { label: 'Supplier C', value: { id: 2, name: 'Supplier A', code: 'Supplier A' } },
            { label: 'Supplier F', value: { id: 3, name: 'Supplier A', code: 'Supplier A' } }
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
            { label: 'Disposition 1', value: { id: 1, name: 'Carton', code: 'Carton' } },
            { label: 'Disposition 2', value: { id: 2, name: 'Film', code: 'Film' } },
            { label: 'Disposition 3', value: { id: 3, name: 'Bag', code: 'Bag' } }
        ];

        this.holdStatusOptions = [

            { label: '- Select a Hold Status -', value: null },
            { label: 'Hold Status 1', value: { id: 1, name: 'Hold Status 1', code: 'Hold Status 1' } },
            { label: 'Hold Status 2', value: { id: 2, name: 'Hold Status 2', code: 'Hold Status 2' } },
            { label: 'Hold Status 3', value: { id: 3, name: 'Hold Status 3', code: 'Hold Status 3' } }
        ];
    }

}
