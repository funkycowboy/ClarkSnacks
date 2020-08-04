import { Component, OnInit } from '@angular/core';
import { VendorService } from '../services/vendor-service';

declare var require: any
var moment = require('moment-timezone');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Chart data
  dataLotsInspectedByMonth: any;
  dataLotsInspectedBySupplier: any;
  dataLotsProcessedByProdLine: any;
  dataLotsProcessedByMaterialCategory: any;
  dataLotsProcessedBySupplier: any;
  dataLotInspectionsByResult: any;
  dataLotsProcessedByHour: any;

  // Chart options
  optionsLotsInspectedByMonth: any;
  optionsLotsInspectedBySupplier: any;
  optionsLotsProcessedByProdLine: any;
  optionsLotsProcessedByMaterialCategory: any;
  optionsLotsProcessedBySupplier: any;
  optionsLotInspectionsByResult: any;
  optionsLotsProcessedByHour: any;

  supplierLabelList: any[] = [];

  constructor(private vendorService: VendorService) { }

  ngOnInit() {

    this.loadVendors();
    setTimeout(() => {
      this.loadCharts()
    },1000)

  }

  loadCharts(): void {

    this.loadChartData();
    this.loadChartOptions();

  }

  loadChartData(): void {

    // bar chart
    this.dataLotsInspectedByMonth = {
      labels: this.getMonthArray(),
      datasets: [
        {
          label: 'Lots Inspected',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }

    // doughnut chart
    this.dataLotsInspectedBySupplier = {
      labels: this.supplierLabelList.sort((a, b) => b - a).slice(0, 5),
      datasets: [
        {
          data: [300, 50, 100,200,52],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "orange",
            "purple"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#36A2EB",
            "#36A2EB"
          ]
        }
      ]
    }

    // doughnut chart
    this.dataLotInspectionsByResult = {
      labels: ["Accepted", "Rejected", "Deviation"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "green",
            "#36A2EB",
            "yellow"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }
      ]
    }

    // doughnut chart
    this.dataLotsProcessedByProdLine = {
      labels: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5', 'Line 6', 'Line 7'],
      datasets: [
        {
          data: [300, 50, 100, 300, 50, 100, 55],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "orange",
            "purple",
            "green",
            "black"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };

    // doughnut chart
    this.dataLotsProcessedByMaterialCategory = {
      labels: ['Cartons', 'Bags', 'Overwrap Film', 'Contact Film'],
      datasets: [
        {
          data: [300, 50, 100, 75],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "green"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "green"
          ]
        }]
    };

    // doughnut chart
    this.dataLotsProcessedBySupplier = {
      labels: this.supplierLabelList.sort((a, b) => b - a).slice(0, 5),
      datasets: [
        {
          data: [300, 50, 100, 200, 52],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "orange",
            "purple"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#36A2EB",
            "#36A2EB"
          ]
        }
      ]
    }

    // doughnut chart

    this.dataLotsProcessedByHour = {
      labels: this.getTimeArray(),
      datasets: [
        {
          label: 'Lots Processed',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55]
        }
      ]
    }

  }

  loadChartOptions() {

    this.optionsLotsInspectedByMonth = {
      title: {
        display: true,
        text: 'Lots Inspected (By Month)',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };

    this.optionsLotInspectionsByResult = {
      title: {
        display: true,
        text: 'Lots Inspected (By Result)',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };

    this.optionsLotsInspectedBySupplier = {
      title: {
        display: true,
        text: 'Lots Inspected (By Supplier)',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };

    this.optionsLotsProcessedByMaterialCategory = {
      title: {
        display: true,
        text: 'Lots Processed (By Material Category)',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };

    this.optionsLotsProcessedBySupplier = {
      title: {
        display: true,
        text: 'Lots Processed (By Supplier)',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };

    this.optionsLotsProcessedByProdLine = {
      title: {
        display: true,
        text: 'Lots Processed (By Line)',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };

    this.optionsLotsProcessedByHour = {
      title: {
        display: true,
        text: 'Lots Processed (By Hour)',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  loadVendors(): void {

    this.vendorService.getVendors()
      .then(vendors => {
        (<any>vendors).forEach((vendor) => {
          this.supplierLabelList.push((<any>vendor).name);         
        });
      });

  }

  getTimeArray(): string[] {
    const locale = 'en'; // or whatever you want...
    const hours = [];

    moment.locale(locale);  // optional - can remove if you are only dealing with one locale
    const now = moment()
   
    for (let hour = parseInt(now.format("h")); hour < 24; hour++) {
      hours.push(moment({ hour }).format('h:mm A'));
      hours.push(
        moment({
          hour,
          minute: 30
        }).format('h:mm A')
      );
    }

    return hours;
  }

  getMonthArray(): string[] {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  }
}
