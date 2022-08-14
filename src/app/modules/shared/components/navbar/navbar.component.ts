import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
import { faDice } from '@fortawesome/free-solid-svg-icons/faDice';
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons/faPenFancy';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faSquareRootAlt } from '@fortawesome/free-solid-svg-icons/faSquareRootAlt';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons/faUnlockAlt';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
import { TOKEN_STORAGE_KEY } from '../../../../models/constants';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    readonly faCaretDown = faCaretDown as IconProp;
    readonly faUserCircle = faUserCircle as IconProp;
    readonly faCloudUploadAlt = faCloudUploadAlt as IconProp;
    readonly faSignOutAlt = faSignOutAlt as IconProp;
    readonly faPuzzlePiece = faPuzzlePiece as IconProp;
    readonly faQuestion = faQuestion as IconProp;
    readonly faSquareRootAlt = faSquareRootAlt as IconProp;
    readonly faDice = faDice as IconProp;
    readonly faFont = faFont as IconProp;
    readonly faPenFancy = faPenFancy as IconProp;
    readonly faHome = faHome as IconProp;
    readonly faUnlockAlt = faUnlockAlt as IconProp;
    readonly faUser = faUser as IconProp;
    isAdmin = AuthService.isAdmin();

    constructor(private readonly router: Router) {
    }

    logout(): void {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        this.router.navigate(['/']);
    }

}
