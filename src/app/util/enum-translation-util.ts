import { Category, Level } from '../models/enums';

export const translateCategory = (category: Category): string => {
    switch (category) {
        case Category.RIDDLE.toString():
            return 'fejtörő';
        case Category.MATH_PUZZLE.toString():
            return 'matematikai feladvány';
        case Category.WORD_PUZZLE.toString():
            return 'nyelvi játék';
        case Category.PICTURE_PUZZLE.toString():
            return 'képrejtvény';
        case Category.CIPHER.toString():
            return 'titkosírás';
        default:
            return '';
    }
};

export const translateLevel = (level: Level): string => {
    switch (level) {
        case Level.EASY.toString():
            return 'könnyű';
        case Level.MEDIUM.toString():
            return 'közepes';
        case Level.DIFFICULT.toString():
            return 'nehéz';
        default:
            return '';
    }
};
