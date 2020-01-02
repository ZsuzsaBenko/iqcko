import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ErrorHandlerService } from '../../../services/error-handler.service';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/Member';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.css']
})
export class MyDataComponent implements OnInit {
  member = new Member();
  isFormVisible = false;
  invalidPassword = false;
  isFetching = true;
  errorMessage = '';
  showError = false;
  failedToModifyData = false;

  constructor(private memberService: MemberService,
              private errorHandlerService: ErrorHandlerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.url.toString().startsWith('admin')) {
      this.member = window.history.state;
      this.isFetching = false;
    } else {
      this.memberService.getLoggedInMemberProfile().subscribe(member => {
        this.member = member;
        this.isFetching = false;
      },
      error => {
        this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
        this.isFetching = false;
        this.showError = true;
      });
    }
  }

  toggleFormVisible() {
    this.isFormVisible = !this.isFormVisible;
  }

  onChangeUserData(form: NgForm) {
    const username = form.value.username;
    const newPassword = form.value.pass;
    const newPasswordConfirmed = form.value.confirmpass;

    if (username === '' && newPassword === '') {
      return;
    } else if (newPassword !== '' && newPassword !== newPasswordConfirmed) {
      this.invalidPassword = true;
      return;
    }

    const member = new Member();
    if (username !== '') {
      member.username = username;
    }
    if (newPassword !== '' && newPassword === newPasswordConfirmed) {
      member.password = newPassword;
    }

    this.updateMember(form, member);
  }

  updateMember(form: NgForm, member: Member) {
    if (this.activatedRoute.snapshot.url.toString().startsWith('admin')) {
      this.updateMemberAsAdmin(form, member);
    } else {
        this.updateLoggedInMember(form, member);
    }
  }

  private updateMemberAsAdmin(form: NgForm, member: Member) {
    this.memberService.updateMember(this.member.id, member).subscribe( (updatedMember) => {
        form.reset();
        this.invalidPassword = false;
        this.isFormVisible = false;
        this.member = updatedMember;
      },
      error => {
        this.onError(error, form);
      });
  }

  private updateLoggedInMember(form: NgForm, member: Member) {
    this.memberService.updateLoggedInMemberProfile(member).subscribe(() => {
        form.reset();
        this.invalidPassword = false;
        this.isFormVisible = false;
        this.memberService.getLoggedInMemberProfile().subscribe(updatedMember => {
            this.member = updatedMember;
          },
          error => {
            this.onError(error, form);
          });
      },
      error => {
        this.onError(error, form);
      });
  }

  private onError(error: HttpErrorResponse, form: NgForm) {
    this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
    form.reset();
    this.failedToModifyData = true;
  }
}
