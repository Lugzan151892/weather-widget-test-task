export const APIKEY = '6fac6e60281124e62346885690ad9b2f';
export const APILINK = 'https://api.openweathermap.org/data/2.5/weather';

export const getTemp = (tempInF: number) => {
    return Math.round(tempInF - 273.15);
}

export const capitalizeStr = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
