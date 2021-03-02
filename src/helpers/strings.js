// Captializes the first character of a string
export const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

export const parseUrl = (url) => {
    /** Extracts the Lichess game id from a game URL */
    const startIdx = url.indexOf('/', 10) + 1;
    return url.slice(startIdx, startIdx + 8);
}