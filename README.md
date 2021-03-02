# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## FlexChess Specifics

[FlexChess](https://flexchess.surge.sh/) is an organization app for online chess tournaments. It allows users to create, organize, and play in tournaments through [Lichess.org](https://lichess.org/) on their own schedule. The site makes use of the [Lichess.org API](https://lichess.org/api) for game reporting purposes and to obtain player Elo rating information.

### Frontend

The frontend of this app was created with [Create React App](https://github.com/facebook/create-react-app) and is deployed at [flexchess.surge.sh](https://flexchess.surge.sh).

#### Creating an Account

A signup form is displayed on the home page when no user is logged in. The user enters their information, including a username. Since the site makes use of the Lichess API, the username entered on FlexChess must match a username from Lichess.org. The form will not allow creation of an account with a username that does not exist on Lichess.org.

#### Creating a Tournament

Once logged in, a user can create a tournament through the form provided. The user enters a name, time control, minimum and maximum number of entries, number of rounds, number of days per round, registration open and close dates, and tournament start date. Once a user creates a tournament, that user becomes the Director of that tournament and will see the Director Tools tab displayed on the tournament page.

#### Joining a Tournament

A user can also see tournaments created by other users. If a tournament has not started yet and has not reached its maximum number of entrants, a button will be displayed on the tournament page allowing the logged in user to enter the tournament. Once entered, the user should see their username displayed in the Entries tab on the tournament page.

#### Scheduling Games

Once a tournament starts, games for each round will be displayed in the Rounds tab on the tournament page. Users will see a form for scheduling their own games. Each pair of players decides between themselves on a convenient time to play and schedules their game accordingly.

#### Reporting Games

Games should be played on Lichess.org, and once they have been completed, the players click the Report button next to their game and copy and paste the game URL into the displayed form. The app checks the Lichess API for the game at the entered URL and verifies that the players and time control match the expected players and time control for that game, and will not allow a URL to be submitted if the information is not correct. After a URL is submitted, the site updates game results and tournament scores and standings according to the game information from the Lichess API.

#### Director Tools

The Director Tools tab displays only if the currently logged in user is the director of the displayed tournament.

##### Delete Tournament

The Delete Tournament button simply deletes an entire tournament and all associated entries from the database.

##### Start Tournament

The Start Tournament button sends a request to the backend to initialize the currently displayed tournament. If the tournament has not yet reached its minimum number of entries, the page will notify the Director and ask for confirmation before sending the request. For team tournaments, if the number of entries is not a multiple of the number of players per team, the page will notify the Director that the extra players will be removed from the tournament and ask for confirmation before sending the request.

##### End Round

Once a tournament is started, the Director Tools tab displays the current round number and number of games that have yet to be reported. The End Round and Start Next Round button is displayed if the current round number is less than the total number of rounds for the tournament. The Director can start the next round at any time by clicking this button. If there are games yet to be reported when the Director clicks the button, the page will notify the Director that these games will be entered into the database as double forfeits and ask for confirmation before sending the request.

##### End Tournament

The End Round and Tournament button ends both the current round and the tournament. Like the End Round and Start Next Round button, it will first notify the Director if there are games in the current round that have yet to be reported. It will also notify the Director and ask for confirmation if the current round is not the planned final round of the tournament (e.g. if the current round is Round 3 and the tournament was planned for 4 rounds). The Director can choose to end the tournament early, but will need to provide confirmation.

### Backend

The backend of this app was created using Express.js and is deployed at [flex-chess.herokuapp.com](https://flex-chess.herokuapp.com).

#### Player Ratings and Tournament Seeding

When a tournament is initialized, the app updates the Lichess Elo ratings of all entries for the appropriate time control using the Lichess API. For team tournaments, team ratings are taken to be the average of the ratings of all players on the team. Initial pairing order is assigned based on equal distance seeding, which tends to put off matchups between the highest-rated players or teams until the later rounds of the tournament when used with the app's pairing algorithm.

#### Pairing Algorithm

This app implements [Swiss system tournaments](https://en.wikipedia.org/wiki/Swiss-system_tournament), which means no players or teams are eliminated and every player or team has a game or match each round (except in the case of odd numbers of entries, see below). There are several different variants of Swiss pairing systems, but this app implements a system similar to the [TCEC pairing system](https://wiki.chessdom.org/TCEC_Swiss_Tournament_System), which has been used in the Top Chess Engine Championships. For each round, players or teams are ranked according to their current scores and then paired for games or matches according to the algorithm. In the case of odd numbers of players or teams, the currently lowest-ranked player or team receives a bye for the round, unless they have already received a bye, in which case the bye goes to the lowest-ranked player or team that has not yet received a bye. In individual tournaments, a player with a bye receives one point for the round as if they had won their game. In team tournaments, a team with a bye receives the same number of points as the number of players per team, as if they had won all of their games for the round.

#### Tournament Scores and Tiebreaks

For each game of the tournament, a win is worth 1 point, draw is worth half a point, and loss is worth zero. For team tournaments, a team's score for a match is the total score of all of the team's players for that match. Players or teams are ranked by score after each round before pairings for the next round are made. After the final round, players or teams are ranked by score and final standings are displayed in the Results tab. In the case of ties after the final round, Sonneborn-Berger scores are used to break the tie. A player or team's Sonneborn-Berger score is the total score of all opponents that the player or team has beaten in the tournament plus half the total score of all opponents that the player or team has drawn with. The player or team with the higher Sonneborn-Berger score wins the tiebreak and is awarded the higher place.