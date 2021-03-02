import { useSelector } from 'react-redux';
import './About.css';

// About page for the site
const About = () => {
    const app = useSelector(state => state.config.app);

    return (
        <div className="About">
            <h1>{app.name}</h1>
            <div className="About-text">
                <p>
                    Have you ever wanted to play in a tournament on&nbsp;
                    <a href="https://lichess.org/" target="_blank" rel="noreferrer">Lichess.org</a>, but didn't have the
                    time to play an entire tournament at once? Tournaments on Lichess.org are typically completed in one
                    day and demand a solid uninterrupted block of time, especially for tournaments with longer time
                    controls. In the hustle and bustle of the modern world, sometimes those of us with busier schedules
                    don't have several hours or more at once to dedicate to an online chess tournament, and we'd like to
                    be able to play on our own schedule.
                </p>
                <p>
                    This is where {app.name} comes in. This application allows you to create, direct, and play in&nbsp;
                    <a href="https://en.wikipedia.org/wiki/Swiss-system_tournament" target="_blank" rel="noreferrer">Swiss
                    system</a> chess tournaments on your own schedule. Each round is scheduled for a given duration,
                    determined by the Tournament Director, and players may schedule their games for each round anytime
                    within the given interval. If the round is scheduled to last a week, you can play your game anytime
                    within that week; it's totally up to you and your opponent to decide when it's convenient to play.
                    Once you finish your game, report the result and the app updates your scores. It's that simple! All
                    you need is a free account on Lichess.org.
                </p>
                <p>
                    This app makes use of the <a href="https://lichess.org/api" target="_blank" rel="noreferrer">Lichess.org
                    API</a> to seed players and teams according to Elo ratings for the appropriate time control, as well
                    as updating scores and game results. For this to work, all tournament games must be played on
                    Lichess.org, and the username entered on {app.name} must be the same as your Lichess.org username.
                    Pairings for all tournaments are determined according to the&nbsp;
                    <a href="https://wiki.chessdom.org/TCEC_Swiss_Tournament_System" target="_blank" rel="noreferrer">TCEC
                    Swiss pairing system</a>, and any potential ties are broken using&nbsp;
                    <a href="https://en.wikipedia.org/wiki/Tie-breaking_in_Swiss-system_tournaments#Sonneborn%E2%80%93Berger_score" target="_blank" rel="noreferrer">Sonneborn-Berger
                    scores</a>. Any games not reported by the end of a round will be recorded as double forfeits, which
                    means zero points for both players, so make sure you get your games played and reported on time!
                </p>
                <p>
                    For team tournaments, team Elo ratings are taken to be the average of the ratings of all players
                    on the team. Entrants to team tournaments are allotted to teams such that all team Elo ratings are
                    as close to equal as possible. Within a team, players are ranked according to Elo rating, and team
                    matches consist of games between each player and his/her equally-ranked counterpart from the
                    opposing team. For 4-player teams for example, a team's highest-rated player will be designated
                    Board #1, down through the lowest-rated player on Board #4. A match between 4-player teams would
                    consist of 4 games: Board #1 vs. Board #1, down through Board #4 vs. Board #4. After each round,
                    any changes in players' Elo ratings are taken into account and board order within each team is
                    adjusted if necessary.
                </p>
                <p>
                    {app.name} was developed by Jason McGinty<br />
                    <a href="https://www.linkedin.com/in/jasonmcginty15/" target="_blank" rel="noreferrer">Jason's LinkedIn profile</a><br />
                    <a href="https://github.com/jmcginty15" target="_blank" rel="noreferrer">Jason's GitHub page</a><br />
                    <a href="https://github.com/jmcginty15/chess-tournament-organizer-v2-frontend" target="_blank" rel="noreferrer">{app.name} frontend repo</a><br />
                    <a href="https://github.com/jmcginty15/chess-tournament-organizer-v2-backend" target="_blank" rel="noreferrer">{app.name} backend repo</a><br />
                    Tab icon courtesy of <a href="https://www.freefavicon.com/" target="_blank" rel="noreferrer">freefavicon.com</a>
                </p>
            </div>
        </div>
    )
}

export default About;