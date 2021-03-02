const INITIAL_STATE = {
    app: {
        name: 'FlexChess',
        tagline: 'Chess tournaments for busy people'
    },
    apiRequestUrl: 'https://lichess.org'
}

// Reducer to store app name and tagline and Lichess API URL
const config = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default config;