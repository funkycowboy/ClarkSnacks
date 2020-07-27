import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';


// environment
import { environment } from '../../environments/environment';
import { Lot, ProcessedLot } from '../models/lot';

// models

@Injectable()
export class LotService {
    private baseurl = environment.clarkSnacksUrl;
    private controller = "Lot";

    httpOptions: any;

    constructor(private http: HttpClient) {
        this.httpOptions = this.getHttpOptions();
    }

    getHttpOptions() {
        return this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    // Get lots
    getLots(){
        let url = this.baseurl + this.controller;
        let promise = new Promise((resolve, reject) => {
            this.http.get(url)
                .toPromise()
                .then(
                    res => {resolve(res);},
                    msg => {reject(msg);}
                );
        });
        return promise;
    }

    // Get processed lots
    getProcessedLots() {
        let url = this.baseurl + this.controller + "/ProcessedLots";
        let promise = new Promise((resolve, reject) => {
            this.http.get(url)
                .toPromise()
                .then(
                    res => { resolve(res); },
                    msg => { reject(msg); }
                );
        });
        return promise;
    }

    // Save Processed Lot
    saveProcessedLot(processedLot: ProcessedLot) {
        let url = this.baseurl + this.controller + "/ProcessLot";
        debugger;
        let promise = new Promise((resolve, reject) => {
           this.http.post(url, JSON.stringify(processedLot), this.httpOptions)
                .toPromise()
                .then(
                    res => { resolve(res); },
                    msg => { reject(msg); }
                );
        });
        return promise;
    }

    // Delete Processed Lot
    deleteProcessedLot(processedLotId: number) {
        let url = this.baseurl + this.controller + "/ProcessedLot/" + processedLotId;
        debugger;
        let promise = new Promise((resolve, reject) => {
            this.http.delete(url)
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
}
