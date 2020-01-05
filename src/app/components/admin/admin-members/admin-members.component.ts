import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorHandlerService } from '../../../services/error-handler.service';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/Member';

import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.css']
})
export class AdminMembersComponent implements OnInit {
  members: Member[];
  errorMessage = null;
  showError = false;
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(private memberService: MemberService,
              private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.memberService.getAllMembers().subscribe( members => {
      this.members = members;
    },
    error => {
        this.onError(error);
      });
  }

  deleteMember(id: number) {
    if (!confirm('Biztosan törölni akarod ezt a felhasználót?')) {
      return;
    }
    this.memberService.deleteMember(id).subscribe(() => console.log(`Member with id ${id} deleted.`),
      (error => this.onError(error)));
  }

  private onError(error: HttpErrorResponse) {
    this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
    this.showError = true;
  }
}
