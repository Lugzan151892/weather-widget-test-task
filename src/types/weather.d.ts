export interface IWeather {
    base: string;
    clouds: { all: number };
    cod: number;
    coord: { lon: number, lat: number };
    dt: number;
    id: number;
    main: IWeatherMAIN;
    name: string;
    sys: IWeatherSYS;
    order: number;
    timezone: number;
    visibility: number;
    weather: Array<IWeatherWeather>;
    wind: { deg: number; speed: number; }
}

interface IWeatherMAIN {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

interface IWeatherSYS {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
}

interface IWeatherWeather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export as namespace WEATHER;
