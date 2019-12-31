import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { faSquareRootAlt } from '@fortawesome/free-solid-svg-icons/faSquareRootAlt';
import { faDice } from '@fortawesome/free-solid-svg-icons/faDice';
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons/faPenFancy';
import { faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons/faUnlockAlt';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin = AuthService.isAdmin();
  faUser = faUser;
  faCaretDown = faCaretDown;
  faUserCircle = faUserCircle;
  faCloudUploadAlt = faCloudUploadAlt;
  faSignOutAlt = faSignOutAlt;
  faPuzzlePiece = faPuzzlePiece;
  faQuestion = faQuestion;
  faSquareRootAlt = faSquareRootAlt;
  faDice = faDice;
  faFont = faFont;
  faPenFancy = faPenFancy;
  faHome = faHome;
  faUnlockAlt = faUnlockAlt;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']).then();
  }

}
