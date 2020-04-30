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
    supplierOptions: SelectItem[];

    selectedQ1Option: string;
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

    constructor() {

        this.resultOptions = [
            { label: 'Yes', value: { id: 1, name: 'Yes', code: 'Y' } },
            { label: 'No', value: { id: 1, name: 'No', code: 'N' } },
            { label: 'N/A', value: null}
        ];

        this.supplierOptions = [
            { label: 'Supplier', value: null },
            { label: 'Supplier A', value: { id: 1, name: 'Supplier A', code: 'Supplier A' } },
            { label: 'Supplier C', value: { id: 1, name: 'Supplier A', code: 'Supplier A' } },
            { label: 'Supplier F', value: { id: 1, name: 'Supplier A', code: 'Supplier A' } }
        ];
    }

  ngOnInit() {
  }

}
