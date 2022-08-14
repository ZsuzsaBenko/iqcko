import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, take } from 'rxjs';
import { Member } from '../../../../models/interfaces';
import { MemberService } from '../../../../services/member.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-admin-members',
    templateUrl: './admin-members.component.html',
    styleUrls: ['./admin-members.component.css']
})
export class AdminMembersComponent implements OnInit, OnDestroy {
    readonly faTrash = faTrash as IconProp;
    readonly faEdit = faEdit as IconProp;
    members: Array<Member> = [];
    private modalRef?: NgbModalRef;
    private modalSubscription?: Subscription;

    constructor(private readonly memberService: MemberService,
                private readonly modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.memberService.getAllMembers()
            .subscribe(members => {
                this.members = members;
            });
    }

    ngOnDestroy(): void {
        this.modalSubscription?.unsubscribe();
        this.modalRef?.close();
    }

    deleteMember(id: number): void {
        this.modalRef = this.modalService.open(ConfirmModalComponent,
            {backdrop: 'static', centered: true, keyboard: false});
        this.modalRef.componentInstance.modalRef = this.modalRef;
        this.modalRef.componentInstance.message = 'Biztosan törölni szeretnéd ezt a felhasználót?';

        this.modalSubscription = this.modalRef.closed
            .pipe(take(1))
            .subscribe(confirmed => {
                if (confirmed) {
                    this.memberService.deleteMember(id).subscribe(() => {
                        this.members = this.members.filter(member => member.id !== id);
                    });
                }
            });
    }
}
