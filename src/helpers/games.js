export const sortGames = (games) => {
    const rounds = {};
    for (let game of games) {
        const round = game.round;
        if (rounds[round]) rounds[round].push(game);
        else rounds[round] = [game];
    }
    return rounds;
}