import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MemberService } from '../../../../services/member.service';
import { Member } from '../../../../models/Member';

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

  constructor(private memberService: MemberService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.id) {
      this.member = window.history.state;
      this.isFetching = false;

      if (!this.member.username) {
        this.router.navigate(['/admin/members']);
      }
    } else {
      this.memberService.getLoggedInMemberProfile().subscribe(member => {
        this.member = member;
        this.isFetching = false;
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
    this.memberService.updateMember(this.member.id, member).subscribe((updatedMember) => {
      form.reset();
      this.invalidPassword = false;
      this.isFormVisible = false;
      this.member = updatedMember;
    });
  }

  private updateLoggedInMember(form: NgForm, member: Member) {
    this.memberService.updateLoggedInMemberProfile(member).subscribe(() => {
      form.reset();
      this.invalidPassword = false;
      this.isFormVisible = false;
      this.memberService.getLoggedInMemberProfile().subscribe(updatedMember => {
        this.member = updatedMember;
      });
    });
  }
}
