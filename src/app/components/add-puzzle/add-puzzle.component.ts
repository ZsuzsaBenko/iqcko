import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';

import { PuzzleService } from '../../services/puzzle.service';
import { Puzzle } from '../../models/Puzzle';
import { Category } from '../../models/Category';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-add-puzzle',
  templateUrl: './add-puzzle.component.html',
  styleUrls: ['./add-puzzle.component.css']
})
export class AddPuzzleComponent implements OnInit {
  puzzle = new Puzzle();
  isNormalPuzzle = false;
  isPicturePuzzle = false;
  isCipher = false;
  image: File = null;
  errorMessage = '';

  constructor(private puzzleService: PuzzleService,
              private storage: AngularFireStorage,
              private errorHandlerService: ErrorHandlerService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onChangeCategory(form: NgForm) {
    if (form.value.category === 'PICTURE_PUZZLE') {
      this.isNormalPuzzle = false;
      this.isPicturePuzzle = true;
      this.isCipher = false;
    } else if (form.value.category === 'CIPHER') {
      this.isNormalPuzzle = false;
      this.isPicturePuzzle = false;
      this.isCipher = true;
    } else {
      this.isNormalPuzzle = true;
      this.isPicturePuzzle = false;
      this.isCipher = false;
    }
  }

  onUploadImage($event: any) {
    this.image = $event.target.files[0];
  }

  onSubmit(form: NgForm) {
    this.puzzle.title = form.value.title;
    this.puzzle.category = form.value.category;
    this.puzzle.level = form.value.level;
    this.puzzle.answer = form.value.answer;

    if (form.value.category !== 'CIPHER' && form.value.category !== 'PICTURE_PUZZLE') {
      this.puzzle.instruction = form.value.instruction;
      this.puzzle.puzzleItem = form.value['puzzle-item'];
    }
    this.addNewPuzzle(form);
  }

  addNewPuzzle(form) {
    if (this.puzzle.category !== Category.PICTURE_PUZZLE.toString()) {
      this.sendPuzzleData(form);
    } else {
      this.uploadPicturePuzzle(form);
    }
  }

  sendPuzzleData(form: NgForm) {
    this.puzzleService.addNewPuzzle(this.puzzle).subscribe(newPuzzle => {
      form.reset();
      this.router.navigate(['/puzzles/' + newPuzzle.id]).then();
    },
    error => {
      this.onError(error);
      form.reset();
    });
  }

  uploadPicturePuzzle(form: NgForm) {
    const imageRef = this.storage.ref(this.image.name);
    imageRef.put(this.image).then( () => {
      imageRef.getDownloadURL().subscribe( url => {
        const fullURL = url.toString();
        const index = fullURL.indexOf('.com/o/');
        this.puzzle.puzzleItem = fullURL.substring(index + 7);
        this.puzzle.instruction = form.value['instruction-picture'];
        this.sendPuzzleData(form);
      });
    })
      .catch( error => this.errorMessage = 'A kép mérete legfeljebb 2 MB lehet.');
  }

  onError(error: HttpErrorResponse) {
    this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
  }
}
