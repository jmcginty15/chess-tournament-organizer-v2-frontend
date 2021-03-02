export const sortMatches = (matches) => {
    /** Sorts tournament matches into rounds */
    const rounds = {};
    for (let match of matches) {
        const round = match.round;
        if (rounds[round]) rounds[round].push(match);
        else rounds[round] = [match];
    }
    return rounds;
}

// Converts match result string into scores for team 1 and team 2
export const parseMatchResult = (result) => result.split('-');

export const getPlayers = (game, team1, team2) => {
    /** Gets participants in a team game */
    const team1Members = team1.members;
    const team2Members = team2.members;

    const players = {};

    for (let member of team1Members) {
        if (game.white.id === member.id || game.white === member.id) players[1] = member;
        if (game.black.id === member.id || game.black === member.id) players[1] = member;
    }

    for (let member of team2Members) {
        if (game.white.id === member.id || game.white === member.id) players[2] = member;
        if (game.black.id === member.id || game.black === member.id) players[2] = member;
    }

    return players;
}

export const parseTeamResult = (game, player1, player2) => {
    /** Converts game result string into scores for white and black */
    if (!game.result) return null;
    const [whiteScore, blackScore] = game.result.split('-');
    const player1Score = player1.id === game.white ? whiteScore : blackScore;
    const player2Score = player2.id === game.white ? whiteScore : blackScore;
    return { player1: +player1Score, player2: +player2Score };
}