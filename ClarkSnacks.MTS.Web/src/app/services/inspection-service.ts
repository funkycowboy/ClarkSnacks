import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';


// environment
import { environment } from '../../environments/environment';
import { Lot, ProcessedLot } from '../models/lot';
import { Inspection } from '../models/inspection';

// models

@Injectable()
export class InspectionService {
    private baseurl = environment.clarkSnacksUrl;
    private controller = "Inspection";

    httpOptions: any;

    constructor(private http: HttpClient) {
        this.httpOptions = this.getHttpOptions();
    }

    // Save Inspection
    saveInspection(inspection: Inspection) {
        let url = this.baseurl + this.controller;
        debugger;
        let promise = new Promise((resolve, reject) => {
          this.http.post(url, JSON.stringify(inspection), this.httpOptions)
                .toPromise()
                .then(
                    res => { resolve(res); },
                    msg => { reject(msg); }
                );
        });
        return promise;
    }

    private handleError(error: any): Promise<any> {
        alert('An error occurred: ' + error.message); // for demo purposes only
        return Promise.reject(error.message || error);
  }


    getHttpOptions() {
      return this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    }
}
