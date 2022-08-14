import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { ROUTES, TOKEN_STORAGE_KEY } from '../../../../models/constants';
import { Member } from '../../../../models/interfaces';
import { AuthService } from '../../../../services/auth.service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { RegistrationService } from '../../../../services/registration.service';

@Component({
    selector: 'app-reg-login',
    templateUrl: './reg-login.component.html',
    styleUrls: ['./reg-login.component.css']
})
export class RegLoginComponent implements OnInit, OnDestroy {
    @ViewChild('form', {static: true}) form!: NgForm;
    isLogin = true;
    errorMessage = '';
    registrationSuccessMessage = '';
    submitted = false;
    private formSubscription!: Subscription;

    constructor(private readonly registrationService: RegistrationService,
                private readonly authService: AuthService,
                private readonly errorHandlerService: ErrorHandlerService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        this.formSubscription = this.form.form.valueChanges.subscribe(value => {
            if ((this.errorMessage || this.registrationSuccessMessage) &&
                (!!value.email || !!value.password || !!value.username)) {
                this.errorMessage = '';
                this.submitted = false;
            }
        });
    }

    ngOnDestroy(): void {
        this.formSubscription?.unsubscribe();
    }

    showLoginForm(): void {
        if (!this.isLogin) {
            this.isLogin = true;
            this.reset();
        }
    }

    showRegistrationForm(): void {
        if (this.isLogin) {
            this.isLogin = false;
            this.registrationSuccessMessage = '';
            this.reset();
        }
    }

    onSubmit(): void {
        if (this.form.invalid) {
            return;
        }

        this.submitted = true;
        if (this.isLogin) {
            const data = {
                email: this.form.value.email.toLowerCase(),
                password: this.form.value.password
            };
            this.login(data);
        } else {
            const member: Partial<Member> = {
                username: this.form.value.username,
                email: this.form.value.email.toLowerCase(),
                password: this.form.value.password
            };
            this.register(member);
        }
    }

    private reset(): void {
        this.errorMessage = '';
        this.form.reset();
    }

    private login(data: { email: string; password: string }): void {
        this.authService.login(data)
            .pipe(
                finalize(() => {
                    this.form.reset();
                    this.submitted = false;
                }))
            .subscribe({
                next: (response: any) => {
                    localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
                    this.router.navigate([`/${ROUTES.HOME}`]);
                },
                error: () => {
                    this.errorMessage = this.errorHandlerService.errorMessage ?? '';
                }
            });
    }

    private register(member: Partial<Member>): void {
        this.registrationService.registerNewMember(member)
            .pipe(
                finalize(() => {
                    this.form.reset();
                    this.submitted = false;
                }))
            .subscribe({
                next: (response: Member) => {
                    this.registrationSuccessMessage = `Kedves ${response.username}! Sikeresen regisztráltál. Jelentkezz be!`;
                    this.showLoginForm();
                },
                error: () => {
                    this.errorMessage = this.errorHandlerService.errorMessage ?? '';
                }
            });
    }
}
