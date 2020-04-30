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
    itemOptions: SelectItem[];

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

    constructor() {

        this.overallResultOptions = [
            { label: 'Accepted', value: { id: 1, name: 'Accepted', code: 'Accepted' } },
            { label: 'Rejected', value: { id: 2, name: 'Rejected', code: 'Rejected' } },
            { label: 'Deviation', value: { id: 3, name: 'Deviation', code: 'Deviation' } },
        ];

        this.resultOptions = [
            { label: 'Yes', value: { id: 1, name: 'Yes', code: 'Y' } },
            { label: 'No', value: { id: 1, name: 'No', code: 'N' } },
            { label: 'N/A', value: null }
        ];

        this.supplierOptions = [
            { label: '- Select a Supplier -', value: null },
            { label: 'Supplier A', value: { id: 1, name: 'Supplier A', code: 'Supplier A' } },
            { label: 'Supplier C', value: { id: 1, name: 'Supplier A', code: 'Supplier A' } },
            { label: 'Supplier F', value: { id: 1, name: 'Supplier A', code: 'Supplier A' } }
        ];

        this.itemOptions = [

            { label: '- Select an Item -', value: null },
            { label: 'Carton', value: { id: 1, name: 'Carton', code: 'Carton' } },
            { label: 'Film', value: { id: 1, name: 'Film', code: 'Film' } },
            { label: 'Bag', value: { id: 1, name: 'SupplBag', code: 'Bag' } }
        ];
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

}
