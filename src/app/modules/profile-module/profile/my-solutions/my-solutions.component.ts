import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SolutionService } from '../../../../services/solution.service';
import { PuzzleService } from '../../../../services/puzzle.service';
import { Solution } from '../../../../models/Solution';

import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { faSquareRootAlt } from '@fortawesome/free-solid-svg-icons/faSquareRootAlt';
import { faDice } from '@fortawesome/free-solid-svg-icons/faDice';
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons/faPenFancy';

@Component({
  selector: 'app-my-solutions',
  templateUrl: './my-solutions.component.html',
  styleUrls: ['./my-solutions.component.css']
})
export class MySolutionsComponent implements OnInit {
  solutions: Solution[];
  isVisible = false;
  faQuestion = faQuestion;
  faSquareRootAlt = faSquareRootAlt;
  faDice = faDice;
  faFont = faFont;
  faPenFancy = faPenFancy;

  constructor(private solutionService: SolutionService,
              private puzzleService: PuzzleService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.id) {
      this.solutionService.getAllSolutionsByMember(this.activatedRoute.snapshot.params.id).subscribe(solutions => {
        this.solutions = solutions;
      });
    } else {
      this.solutionService.getAllSolutionsByLoggedInMember().subscribe(solutions => {
        this.solutions = solutions;
      });
    }
  }

  countSpeed(seconds: number) {
    if (seconds > 59) {
      return `${Math.floor(seconds / 60)} perc ${seconds % 60} másodperc`;
    } else {
      return `${seconds} másodperc`;
    }
  }

  toggleVisible() {
    this.isVisible = !this.isVisible;
  }

}
