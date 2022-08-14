export const API_PATHS = {
    REGISTRATION: 'registration',
    LOGIN: 'login',
    BASE: {
        PUZZLES: 'puzzles',
        MEMBERS: 'members',
        SOLUTIONS: 'solutions',
        COMMENTS: 'comments'
    },
    SEGMENTS: {
        RANDOM: 'random',
        CATEGORY: 'category',
        PUZZLE: 'puzzle',
        LOGGED_IN: 'logged-in',
        MEMBER: 'member',
        SORT: 'sort',
        ADMIN: 'admin',
        TOP_LEADERBOARD: 'top-leaderboard',
        FULL_LEADERBOARD: 'full-leaderboard'
    }
};

export const ROUTES = {
    HOME: 'home',
    PUZZLES: 'puzzles',
    PUZZLE_CATEGORIES: {
        ALL: 'all',
        RIDDLES: 'riddles',
        MATH_PUZZLES: 'math-puzzles',
        PICTURE_PUZZLES: 'picture-puzzles',
        WORD_PUZZLES: 'word-puzzles',
        CIPHERS: 'ciphers'
    },
    PROFILE: 'profile',
    ADMIN: 'admin',
    MEMBERS: 'members',
    UPDATE: 'update',
    ERROR: 'error'
};

export const TOKEN_STORAGE_KEY = 'puzzles-app-token';
