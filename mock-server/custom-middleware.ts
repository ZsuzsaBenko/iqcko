import * as fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import * as jsonServer from 'json-server';
import { Level } from '../src/app/models/enums';
import { Member, Puzzle, PuzzleComment, Solution } from '../src/app/models/interfaces';

const delay = require('express-delay');

const JSON_SERVER_PORT = 3200;
const server = jsonServer.create();
const router = jsonServer.router('mock-server/mock-db.json');
const middleware = jsonServer.defaults({bodyParser: true});
const rewriteRules = JSON.parse(fs.readFileSync('mock-server/mock-db.json', {encoding: 'utf-8'}));

server.use(middleware);
server.use(jsonServer.rewriter(rewriteRules));
server.use(delay(800, 1200));

const isAdmin = true;

const allMembers: Array<Member> = rewriteRules['all-members'];
const allPuzzles: Array<Puzzle> = rewriteRules['all-puzzles'];
const allSolutions: Array<Solution> = rewriteRules['all-solutions'];
const allComments: Array<PuzzleComment> = rewriteRules['all-comments'];

const admin = rewriteRules['all-members'][0];
const user = rewriteRules['all-members'][1];
let loggedInMember = isAdmin ? admin : user;

// Registration

server.post('/registration', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.BAD_REQUEST).json({message: 'Sikertelen regisztráció: hiányos adatok vagy ezt az felhasználót már regisztrálták.'});

    const newMember = {
        id: allMembers.length + 1,
        username: req.body.username,
        email: req.body.email,
        registration: new Date(),
        score: 0
    };
    allMembers.push(newMember);

    return res.status(StatusCodes.OK).json(newMember);
});

// Login

server.post('/login', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Érvénytelen e-mail cím vagy jelszó.'});

    const userToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbm5hQGFubmEuaHUiLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTY1OTUxNTE3OSwiZXhwIjoyNTI0NjQxMTc5fQ.4wRMBty4X5QJJwSQODBzlBFWlHOWR5Ov5sA2laUgsSc';
    const adminToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbm5hQGFubmEuaHUiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE2NTk1MTUxNzksImV4cCI6MjUyNDY0MTE3OX0.MaHiDufoim_HH4iEbjZan93QCFQUSAyUxZjI2eA76Z0';

    return res.status(StatusCodes.OK).json({
        email: req.body.email,
        token: isAdmin ? adminToken : userToken
    });
});

// Puzzles

server.get('/puzzles/random', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.OK).json([]);

    return res.status(StatusCodes.OK).json([allPuzzles[6], allPuzzles[3], allPuzzles[16], allPuzzles[5], allPuzzles[4]]);
});

server.get('/puzzles', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    return res.status(StatusCodes.OK).json(allPuzzles);
});

server.get('/puzzles/category/:category', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.OK).json([]);

    const puzzlesByCategory: Array<Puzzle> = allPuzzles
        .filter(puzzle => puzzle.category === req.params.category);
    return res.status(StatusCodes.OK).json(puzzlesByCategory);
});

const getSortedPuzzles = (puzzles: Array<Puzzle>, sortingParam: string) => {
    return puzzles.sort((p1, p2) => {
        switch (sortingParam) {
            case 'titleASC':
                return p1.title.localeCompare(p2.title);
            case 'titleDESC':
                return p2.title.localeCompare(p1.title);
            case 'ratingASC':
                return p1.rating - p2.rating;
            case 'ratingDESC':
                return p2.rating - p1.rating;
            case 'levelASC':
                return Object.values(Level).indexOf(p1.level) - Object.values(Level).indexOf(p2.level);
            case 'levelDESC':
                return Object.values(Level).indexOf(p2.level) - Object.values(Level).indexOf(p1.level);
        }
    });
};

server.get('/puzzles/sort/:sortingParam', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    return res.status(StatusCodes.OK).json(getSortedPuzzles([...allPuzzles], req.params.sortingParam));
});

server.get('/puzzles/sort/:category/:sortingParam', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    const puzzlesByCategory: Array<Puzzle> = allPuzzles
        .filter(puzzle => puzzle.category === req.params.category);
    return res.status(StatusCodes.OK).json(getSortedPuzzles(puzzlesByCategory, req.params.sortingParam));
});

server.get('/puzzles/member/logged-in', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    const puzzlesByLoggedInMember: Array<Puzzle> = allPuzzles
        .filter(puzzle => puzzle.member.id === loggedInMember.id);
    return res.status(StatusCodes.OK).json(puzzlesByLoggedInMember);
});

server.get('/puzzles/member/:memberId', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.FORBIDDEN).json({});

    const puzzlesByMember: Array<Puzzle> = allPuzzles
        .filter(puzzle => puzzle.member.id === +req.params.memberId);
    return res.status(StatusCodes.OK).json(puzzlesByMember);
});

server.get('/puzzles/:id', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A fejtörő nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    const requestedPuzzle: Puzzle | undefined = allPuzzles.find(puzzle => puzzle.id === +req.params.id);
    return requestedPuzzle ? res.status(StatusCodes.OK).json(requestedPuzzle) :
        res.status(StatusCodes.NOT_FOUND).json({message: 'A fejtörő nem található.'});
});

server.post('/puzzles/:id', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A fejtörő nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    // return res.status(StatusCodes.OK).json(true); // correct answer
    return res.status(StatusCodes.OK).json(false); // incorrect answer
});

server.get('/puzzles/:id/admin', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A fejtörő nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.FORBIDDEN).json({});

    const requestedPuzzle: Puzzle | undefined = allPuzzles.find(puzzle => puzzle.id === +req.params.id);
    return requestedPuzzle ? res.status(StatusCodes.OK).json(requestedPuzzle) :
        res.status(StatusCodes.NOT_FOUND).json({message: 'A fejtörő nem található.'});
});

server.post('/puzzles', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    const savedPuzzle: Puzzle = {
        id: allPuzzles.length + 1,
        submissionTime: new Date(),
        rating: 0,
        ...req.body,
        member: loggedInMember
    };
    allPuzzles.push(savedPuzzle);

    return res.status(StatusCodes.OK).json(savedPuzzle);
});

server.put('/puzzles/:id', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A fejtörő nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.FORBIDDEN).json({});

    let puzzleToUpdateIndex = allPuzzles.findIndex(puzzle => puzzle.id === +req.params.id);
    if (0 <= puzzleToUpdateIndex) {
        allPuzzles[puzzleToUpdateIndex] = {...allPuzzles[puzzleToUpdateIndex], ...req.body};
    }

    return puzzleToUpdateIndex ? res.status(StatusCodes.OK).json(allPuzzles[puzzleToUpdateIndex]) :
        res.status(StatusCodes.NOT_FOUND).json({message: 'A fejtörő nem található.'});
});

server.delete('/puzzles/:id', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A fejtörő nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.FORBIDDEN).json({});

    const puzzleToDeleteIndex = allPuzzles.findIndex(puzzle => puzzle.id === +req.params.id);
    if (0 <= puzzleToDeleteIndex) {
        allPuzzles.splice(puzzleToDeleteIndex, 1);
    }

    return res.status(StatusCodes.OK).json({});
});

// Members

server.get('/members/top-leaderboard', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    const fullLeaderboard: Array<Member> = rewriteRules['full-leaderboard'];
    return res.status(StatusCodes.OK).json(fullLeaderboard.slice(0, 10));
});

server.get('/members/full-leaderboard', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    return res.redirect('/full-leaderboard');
});

server.get('/members/logged-in', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    return res.status(StatusCodes.OK).json(loggedInMember);
});

server.get('/members/admin', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.FORBIDDEN).json({});

    return res.status(StatusCodes.OK).json(allMembers);
});

server.get('/members/:id', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.FORBIDDEN).json({});

    const requestedMember: Member | undefined = allMembers.find(member => member.id === +req.params.id);
    return requestedMember ? res.status(StatusCodes.OK).json(requestedMember) :
        res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
});

server.put('/members/logged-in', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    loggedInMember = {...loggedInMember, ...req.body};
    return res.status(StatusCodes.OK).json(loggedInMember);
});

server.put('/members/:id', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.FORBIDDEN).json({});

    let memberToUpdateIndex = allMembers.findIndex(member => member.id === +req.params.id);
    if (0 <= memberToUpdateIndex) {
        allMembers[memberToUpdateIndex] = {...allMembers[memberToUpdateIndex], ...req.body};
    }

    return memberToUpdateIndex ? res.status(StatusCodes.OK).json(allMembers[memberToUpdateIndex]) :
        res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
});

server.delete('/members/:id', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.FORBIDDEN).json({});

    const memberToDeleteIndex = allMembers.findIndex(member => member.id === +req.params.id);
    if (0 <= memberToDeleteIndex) {
        allMembers.splice(memberToDeleteIndex, 1);
    }

    return res.status(StatusCodes.OK).json({});
});

// Solutions

server.post('/solutions', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    const savedSolution: Solution = {
        id: allSolutions.length + 1,
        member: loggedInMember,
        ...req.body
    };
    allSolutions.push(savedSolution);

    return res.status(StatusCodes.OK).json(savedSolution);
});

server.get('/solutions/member/logged-in', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.OK).json([]);

    const solutionsByLoggedInMember: Array<Solution> = allSolutions
        .filter(solution => solution.member.id === loggedInMember.id);
    return res.status(StatusCodes.OK).json(solutionsByLoggedInMember);
});

server.get('/solutions/member/:memberId', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.FORBIDDEN).json({});
    // return res.status(StatusCodes.OK).json([]);

    const solutionsByMember: Array<Solution> = allSolutions
        .filter(solution => solution.member.id === +req.params.memberId);
    return res.status(StatusCodes.OK).json(solutionsByMember);
});

server.delete('/solutions/:id', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A megoldás nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.FORBIDDEN).json({});

    const solutionToDeleteIndex = allSolutions.findIndex(solution => solution.id === +req.params.id);
    if (solutionToDeleteIndex) {
        allSolutions.splice(solutionToDeleteIndex, 1);
    }

    return res.status(StatusCodes.OK).json({});
});

// Comments

server.get('/comments/puzzle/:puzzleId', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A fejtörő nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.OK).json([]);

    const commentsByPuzzle: Array<PuzzleComment> = allComments
        .filter(comment => comment.puzzle.id === +req.params.puzzleId);
    return res.status(StatusCodes.OK).json(commentsByPuzzle);
});

server.get('/comments/member/logged-in', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.OK).json([]);

    const commentsByLoggedInMember: Array<PuzzleComment> = allComments
        .filter(comment => comment.member.id === loggedInMember.id);
    return res.status(StatusCodes.OK).json(commentsByLoggedInMember);
});

server.get('/comments/member/:memberId', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A felhasználó nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.FORBIDDEN).json({});
    // return res.status(StatusCodes.OK).json([]);

    const commentsByMember: Array<PuzzleComment> = allComments
        .filter(comment => comment.member.id === +req.params.memberId);
    return res.status(StatusCodes.OK).json(commentsByMember);
});

server.post('/comments', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A fejtörő nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    const savedComment: PuzzleComment = {
        id: allComments.length + 1,
        submissionTime: new Date(),
        ...req.body,
        puzzle: allPuzzles.find(puzzle => puzzle.id === req.body.puzzle.id),
        member: loggedInMember};
    allComments.push(savedComment);

    return res.status(StatusCodes.OK).json(savedComment);
});

server.put('/comments/:id', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A hozzászólás nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});

    let commentToUpdateIndex = allComments.findIndex(comment => comment.id === +req.params.id);
    if (0 <= commentToUpdateIndex) {
        allComments[commentToUpdateIndex] = {...allComments[commentToUpdateIndex], ...req.body};
    }

    return commentToUpdateIndex ? res.status(StatusCodes.OK).json(allComments[commentToUpdateIndex]) :
        res.status(StatusCodes.NOT_FOUND).json({message: 'A hozzászólás nem található.'});
});

server.delete('/comments/:id', (req, res) => {
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Szerverhiba történt.'});
    // return res.status(StatusCodes.NOT_FOUND).json({message: 'A hozzászólás nem található.'});
    // return res.status(StatusCodes.UNAUTHORIZED).json({});
    // return res.status(StatusCodes.FORBIDDEN).json({});

    const commentToDeleteIndex = allComments.findIndex(comment => comment.id === +req.params.id);
    if (0 <= commentToDeleteIndex) {
        allComments.splice(commentToDeleteIndex, 1);
    }

    return res.status(StatusCodes.OK).json({});
});

server.use(router);
server.listen(JSON_SERVER_PORT, () => {
    console.log('JSON Server is running on port ' + JSON_SERVER_PORT);
});
