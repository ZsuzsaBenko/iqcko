import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons/faStarHalfAlt';
import { Puzzle } from '../../../../models/interfaces';

@Component({
    selector: 'app-stars',
    templateUrl: './stars.component.html',
    styleUrls: ['./stars.component.css']
})
export class StarsComponent {
    @Input() puzzle!: Puzzle;
    readonly faStar = faStar as IconProp;
    readonly faStarHalfAlt = faStarHalfAlt as IconProp;
}
