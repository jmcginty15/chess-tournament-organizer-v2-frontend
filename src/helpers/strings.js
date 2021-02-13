export const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

export const parseUrl = (url) => {
    const startIdx = url.indexOf('/', 10) + 1;
    return url.slice(startIdx, startIdx + 8);
}