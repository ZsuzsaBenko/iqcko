import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  BAD_REQUEST = 400;
  FORBIDDEN = 403;
  EXPIRED_TOKEN_MESSAGE = 'Nem vagy bejelentkezve vagy lejárt a munkamenet. Jelentkezz be újra!';
  errorMessage: string;

  constructor(private router: Router) {
  }


  handleHttpErrorResponse(error: HttpErrorResponse) {
    const statusCode = error.error.statusCode;

    if (this.FORBIDDEN === statusCode || this.BAD_REQUEST === statusCode) {
      this.errorMessage = error.error.message;
      return;
    }

    if (this.FORBIDDEN === error.error.status) {
      this.errorMessage = this.EXPIRED_TOKEN_MESSAGE;
      setTimeout( () => this.router.navigate(['/']), 5000);
    } else {
      this.errorMessage = error.error.message;
    }
    this.router.navigate(['error']);
  }

}
