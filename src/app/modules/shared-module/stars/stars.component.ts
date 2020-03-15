import { Component, Input, OnInit } from '@angular/core';

import { Puzzle } from '../../../models/Puzzle';

import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons/faStarHalfAlt';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input() puzzle: Puzzle;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;

  constructor() {
  }

  ngOnInit() {
  }

}
