import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { Member } from '../../../../models/interfaces';
import { MemberService } from '../../../../services/member.service';

@Component({
    selector: 'app-member-data',
    templateUrl: './member-data.component.html',
    styleUrls: ['./member-data.component.css']
})
export class MemberDataComponent implements OnDestroy {
    @ViewChild('form', {static: false}) form!: NgForm;
    @Output() readonly memberUpdated = new EventEmitter<Member>();
    @Input() member!: Member;
    @Input() isAdminPage!: boolean;
    readonly passwordMinLength = 8;
    isFormVisible = false;
    errorMessage?: string;
    private readonly passwordLengthErrorMessage = 'A jelszó túl rövid.';
    private readonly passwordConfirmationErrorMessage = 'A jelszó és a megerősítése nem egyezik meg.';
    private formSubscription?: Subscription;

    constructor(private readonly memberService: MemberService,
                private readonly ref: ChangeDetectorRef) {
    }

    ngOnDestroy(): void {
        this.formSubscription?.unsubscribe();
    }

    toggleFormVisible(): void {
        this.isFormVisible = !this.isFormVisible;
        this.ref.detectChanges();
        this.addDelayedFormValidation();
    }

    readonly isSubmitDisabled = (): boolean => {
        const formValue = this.form?.value;
        return !formValue?.username && !formValue?.pass ||
            formValue?.pass && this.passwordMinLength > formValue.pass.length ||
            formValue?.pass && !formValue?.confirmPass ||
            formValue?.confirmPass && !formValue?.pass ||
            formValue.pass && formValue.confirmPass && formValue.pass !== formValue.confirmPass;
    };

    changeUserData(): void {
        const changedUsername = this.form?.value.username;
        const changedPassword = this.form?.value.pass;
        const changedPasswordConfirmation = this.form?.value.confirmPass;

        if (!changedUsername && !changedPassword && !changedPasswordConfirmation) {
            return;
        }
        if (changedPassword && this.passwordMinLength > changedPassword.length) {
            this.errorMessage = this.passwordLengthErrorMessage;
            return;
        }
        if (changedPassword && changedPassword !== changedPasswordConfirmation ||
            changedPasswordConfirmation && changedPassword !== changedPasswordConfirmation) {
            this.errorMessage = this.passwordConfirmationErrorMessage;
            return;
        }

        const member = {} as unknown as Member;
        if (changedUsername) {
            member.username = changedUsername;
        }
        if (changedPassword) {
            member.password = changedPassword;
        }

        this.updateMember(member);
    }

    private updateMember(member: Member): void {
        if (this.isAdminPage) {
            this.updateMemberAsAdmin(member);
        } else {
            this.updateLoggedInMember(member);
        }
    }

    private updateMemberAsAdmin(member: Member): void {
        this.memberService.updateMember(this.member.id, member)
            .subscribe((updatedMember: Member) => {
                this.handleResponse(updatedMember);
            });
    }

    private updateLoggedInMember(member: Member): void {
        this.memberService.updateLoggedInMemberProfile(member)
            .subscribe(updatedMember => {
                this.handleResponse(updatedMember);
            });
    }

    private handleResponse(updatedMember: Member): void {
        this.member = updatedMember;
        this.memberUpdated.emit(updatedMember);
        this.form.reset();
        this.toggleFormVisible();
    }

    private addDelayedFormValidation(): void {
        if (this.isFormVisible && !this.formSubscription) {
            this.formSubscription = this.form.form.valueChanges
                .pipe(debounceTime(1500))
                .subscribe(value => {
                    if (value.pass && this.passwordMinLength > value.pass.length) {
                        this.errorMessage = this.passwordLengthErrorMessage;
                    } else if (value.pass && value.confirmPass && value.pass !== value.confirmPass) {
                        this.errorMessage = this.passwordConfirmationErrorMessage;
                    } else {
                        this.errorMessage = undefined;
                    }
                });
        } else if (!this.isFormVisible) {
            this.formSubscription?.unsubscribe();
            this.formSubscription = undefined;
        }
    }
}
