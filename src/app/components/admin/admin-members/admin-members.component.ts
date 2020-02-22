import { Component, OnInit } from '@angular/core';
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
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(private memberService: MemberService) {
  }

  ngOnInit() {
    this.memberService.getAllMembers().subscribe(members => {
      this.members = members;
    });
  }

  deleteMember(id: number) {
    if (!confirm('Biztosan törölni akarod ezt a felhasználót?')) {
      return;
    }
    this.memberService.deleteMember(id).subscribe();
  }

}
