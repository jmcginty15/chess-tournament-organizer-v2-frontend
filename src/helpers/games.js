export const sortGames = (games) => {
    const rounds = {};
    for (let game of games) {
        const round = game.round;
        if (rounds[round]) rounds[round].push(game);
        else rounds[round] = [game];
    }
    return rounds;
}

export const parseResult = (resultStr) => {
    if (resultStr === '1-0') return { white: 1, black: 0 };
    else if (resultStr === '0-1') return { white: 0, black: 1 };
    else if (resultStr === '0.5-0.5') return { white: 0.5, black: 0.5 };
    else if (resultStr === '0-0') return { white: 0, black: 0 };
}

export const checkCorrectGame = (resGame, whitePlayer, blackPlayer, tournTc) => {
    const whiteIndex = resGame.indexOf('White');
    const blackIndex = resGame.indexOf('Black');
    const white = resGame.slice(whiteIndex + 7, resGame.indexOf('"', whiteIndex + 7));
    const black = resGame.slice(blackIndex + 7, resGame.indexOf('"', blackIndex + 7));
    const tcIndex = resGame.indexOf('TimeControl');
    let timeControl = resGame.slice(tcIndex + 13, resGame.indexOf('"', tcIndex + 13));
    const seconds = timeControl.slice(0, timeControl.indexOf('+'));
    const minutes = +seconds / 60;
    timeControl = `${minutes}|${timeControl.slice(timeControl.indexOf('+') + 1)}`

    if (white === blackPlayer && black === whitePlayer) return -1;
    if (white !== whitePlayer || black !== blackPlayer) return -2;
    if (timeControl !== tournTc) return -3;
    return 1;
}

export const countRemainingGames = (games, round) => {
    let count = 0;
    for (let game of games) {
        if (game.round === round && !game.result) count++;
    }
    return count;
}

export const countRemainingTeamGames = (matches, round) => {
    let count = 0;
    for (let match of matches) {
        for (let game of match.games) {
            if (match.round === round && !game.result) count++;
        }
    }
    return count;
}