import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Member } from '../../models/Member';

import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  members: Member[];
  errorMessage = null;
  showError = false;
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(private adminService: AdminService,
              private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.adminService.getAllMembers().subscribe( members => {
      this.members = members;
    },
    error => {
        this.onError(error);
      });
  }

  private onError(error: HttpErrorResponse) {
    this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
    this.showError = true;
  }
}
