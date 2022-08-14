import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { delay, of } from 'rxjs';
import { ErrorHandlerService } from '../../../../services/error-handler.service';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
    readonly faExclamation = faExclamationCircle as IconProp;
    errorMessage?: string;

    constructor(private readonly errorHandlerService: ErrorHandlerService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        this.errorMessage = this.errorHandlerService.errorMessage;
        if (this.errorHandlerService.shouldRedirectToLogin) {
            this.redirectToLogin();
        }
    }

    private redirectToLogin(): void {
        of('redirect')
            .pipe(delay(5000))
            .subscribe(() => {
                this.router.navigate(['/']);
            });
    }

}
