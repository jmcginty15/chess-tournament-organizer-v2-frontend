const INITIAL_STATE = {
    app: {
        name: 'FlexxChess',
        tagline: 'Chess tournaments for busy people'
    },
    apiRequestUrl: 'https://lichess.org'
}

const config = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default config;