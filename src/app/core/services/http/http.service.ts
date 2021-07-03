import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private toastController: ToastController,
    private httpClient: HttpClient) {
  }

  get(target: ApiTarget, url: string, errorMessage?: string) {
    return this.httpClient.get(url, { headers: this.getHeaders(target)}).pipe(catchError((err) => {
        this.showToast(errorMessage ? errorMessage : 'Failed to load data from the server.');
        throw(err);
    }));
  }

  post(target: ApiTarget, url: string, body: any, errorMessage?: string) {
    return this.httpClient.post(url, body, { headers: this.getHeaders(target) }).pipe(catchError((err) => {
      this.showToast(errorMessage ? errorMessage : 'Failed to send data from the server.');
      throw(err);
    }));
  }

  private async showToast(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      position: 'top',
      color: 'danger',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  private getHeaders(target: ApiTarget): any {
    if (target === ApiTarget.functions) {
      return { 'x-functions-key': '9cAee/4ekOMeUzMDiF1skPZi1QmjhsrvX9l9FY2rgyGT/bIGEqgxBQ==' };
    }
  }
}

export enum ApiTarget {
  functions,
  api
}
