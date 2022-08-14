import { Category, Level } from '../models/enums';
import { translateCategory, translateLevel } from './enum-translation-util';

describe('EnumTranslationUtil', () => {

    it('should translate category names', () => {
        expect(translateCategory(Category.RIDDLE)).toEqual('fejtörő');
        expect(translateCategory(Category.MATH_PUZZLE)).toEqual('matematikai feladvány');
        expect(translateCategory(Category.WORD_PUZZLE)).toEqual('nyelvi játék');
        expect(translateCategory(Category.PICTURE_PUZZLE)).toEqual('képrejtvény');
        expect(translateCategory(Category.CIPHER)).toEqual('titkosírás');
    });

    it('should translate level names', () => {
        expect(translateLevel(Level.EASY)).toEqual('könnyű');
        expect(translateLevel(Level.MEDIUM)).toEqual('közepes');
        expect(translateLevel(Level.DIFFICULT)).toEqual('nehéz');
    });
});
