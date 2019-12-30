import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() {
  }

  handleHttpErrorResponse(error: HttpErrorResponse): string {
    let errorMessage = '';
    if (error.error.statusCode === 403) {
      errorMessage = error.error.message;
    } else if (error.error.statusCode === 400) {
      errorMessage = error.error.message;
    } else if (error.error.statusCode === 404) {
      errorMessage = error.error.message;
    } else if (error.error.status === 403) {
      errorMessage = 'Nem vagy bejelentkezve vagy lejárt a munkamenet. Jelentkezz be újra!';
    } else if (error.error.status >= 500) {
      errorMessage = 'Szerverhiba történt. Próbáld újra egy kicsit később!';
    } else {
      errorMessage = 'Ismeretlen hiba történt. Próbáld újra!';
    }
    return errorMessage;
  }
}
