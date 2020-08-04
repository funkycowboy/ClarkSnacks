import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// prime ng
import { MegaMenuModule, Menubar, MenuModule, MenuItem } from 'primeng/primeng';

@Component({
    //moduleId: module.id,
    selector: 'default-header',
    templateUrl: 'default-header.component.html',
    styleUrls: ['default-header.component.css']
})
export class DefaultHeaderComponent implements OnInit {

    items: MenuItem[];
    constructor(private router: Router) {
    }
    ngOnInit() {
        this.items = [
            {
                label: 'Home',

                'routerLink': ['/home'],
                icon: 'fa fa-home',
            },
            {
                label: 'Inspections',
                icon: 'fa fa-eye',

                items: [
                    {
                        label: 'Perform Inspection',
                        icon: 'fa fa-arrow-circle-right', 'routerLink': ['/material-inspection']
                    }//,
                    //{
                    //    label: 'View Inspections',
                    //    icon: 'fa fa-arrow-circle-right', 'routerLink': ['/view-inspections']
                    //},
                    //{
                    //    label: 'Upload Artwork',
                    //    icon: 'fa fa-arrow-circle-right', 'routerLink': ['/upload']
                    //}
                ]
            },
            {
                label: 'Material Tracking',
                icon: 'fa fa-search',

                items: [

                    {
                        label: 'Process Lots',
                        icon: 'fa fa-arrow-circle-right', 'routerLink': ['/lot-tracking']
                       
                    }
                ]
            },
            {
                label: 'Reports',
                icon: 'fa fa-table',

                items: [
                    {
                        label: 'Lot Reporting',
                        icon: 'fa fa-arrow-circle-right',
                        items: [
                            {
                                label: 'Processed Today',
                                icon: 'fa fa-arrow-circle-right', 'routerLink': ['/reports']

                            },
                            {
                                label: 'Processed Today',
                                icon: 'fa fa-arrow-circle-right', 'routerLink': ['/reports']

                            },
                            {
                                label: 'Processed This Month',
                                icon: 'fa fa-arrow-circle-right', 'routerLink': ['/reports']

                            },
                            {
                                label: 'Processed This Year',
                                icon: 'fa fa-arrow-circle-right', 'routerLink': ['/reports']

                            },
                            {
                                label: 'Processed By Date',
                                icon: 'fa fa-arrow-circle-right', 'routerLink': ['/reports']

                            },
                            {
                                label: 'Processed By Vendor',
                                icon: 'fa fa-arrow-circle-right', 'routerLink': ['/reports']

                            },
                            {
                                label: 'Processed By Production Line',
                                icon: 'fa fa-arrow-circle-right', 'routerLink': ['/reports']

                            },
                            {
                                label: 'Processed By Operator',
                                icon: 'fa fa-arrow-circle-right', 'routerLink': ['/reports']

                            }
                        ]
                    }

                ]
            }//,  
            //{
            //    label: 'Admin',
            //    icon: 'fa fa-user',

            //    items: [

            //        {
            //            label: 'Operator Admistration',
            //            icon: 'fa fa-arrow-circle-right',
            //            'routerLink': ['/home']
            //        }

            //    ]
            //}
        ];
    }
}
