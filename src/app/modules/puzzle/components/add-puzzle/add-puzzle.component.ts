import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../../../models/constants';
import { Category, Level } from '../../../../models/enums';
import { Puzzle } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';

@Component({
    selector: 'app-add-puzzle',
    templateUrl: './add-puzzle.component.html',
    styleUrls: ['./add-puzzle.component.css']
})
export class AddPuzzleComponent {
    readonly categoryEnum = Category;
    readonly levelEnum = Level;
    isPicturePuzzle = false;
    isCipher = false;
    image: File | null = null;
    errorMessage = '';
    private puzzle!: Puzzle;

    constructor(private readonly puzzleService: PuzzleService,
                private readonly storage: AngularFireStorage,
                private readonly router: Router) {
    }

    onCategoryChange(form: NgForm): void {
        if (Category.PICTURE_PUZZLE === form.value.category) {
            this.isPicturePuzzle = true;
            this.isCipher = false;
        } else if (Category.CIPHER === form.value.category) {
            this.isPicturePuzzle = false;
            this.isCipher = true;
        } else {
            this.isPicturePuzzle = false;
            this.isCipher = false;
        }
    }

    onUploadImage(event: any): void {
        this.image = event.target.files[0];
    }

    onSubmit(form: NgForm): void {
        if (form.invalid) {
            return;
        }

        this.puzzle = {
            title: form.value.title,
            category: form.value.category,
            level: form.value.level,
            answer: form.value.answer
        } as unknown as Puzzle;

        if (Category.CIPHER !== form.value.category && Category.PICTURE_PUZZLE !== form.value.category) {
            this.puzzle.instruction = form.value.instruction;
            this.puzzle.puzzleItem = form.value['puzzle-item'];
        }
        this.addNewPuzzle(form);
    }

    addNewPuzzle(form: NgForm): void {
        if (Category.PICTURE_PUZZLE === this.puzzle.category) {
            this.uploadPicturePuzzle(form);
        } else {
            this.sendPuzzleData(form);
        }
    }

    sendPuzzleData(form: NgForm): void {
        this.puzzleService.savePuzzle(this.puzzle).subscribe(newPuzzle => {
            form.reset();
            this.router.navigate([`/${ROUTES.PUZZLES}/${newPuzzle.id}`]);
        });
    }

    uploadPicturePuzzle(form: NgForm): void {
        if (!this.image) {
            return;
        }
        const imageRef = this.storage.ref(this.image.name);
        imageRef.put(this.image)
            .then(() => {
                imageRef.getDownloadURL().subscribe(url => {
                    const fullURL = url.toString();
                    const index: number = fullURL.indexOf('.com/o/');
                    this.puzzle.puzzleItem = fullURL.substring(index + 7);
                    this.puzzle.instruction = form.value['instruction-picture'];
                    this.sendPuzzleData(form);
                });
            })
            .catch(() => {
                this.errorMessage = 'A kép mérete legfeljebb 2 MB lehet.';
            });
    }

}
