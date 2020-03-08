import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage: string;
  faExclamation = faExclamationCircle;

  constructor(private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit() {
    this.errorMessage = this.errorHandlerService.errorMessage;
  }

}
