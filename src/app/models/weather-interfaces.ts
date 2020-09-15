export interface WeatherKey {
    key: string
    localizedName: string;
    isLocalWeather?: boolean
}

export interface Weather {
    key: string
    localizedName: string;
    localObservationDateTime: Date;
    isDayTime: boolean;
    weatherText: string;
    weatherIcon: number;
    temperature: {
        metric: Temperature,
        imperial: Temperature
    },
    link: string,
    fiveDaysForecast?: FutureForecast[]
}

export interface FutureForecast {
    date: Date;
    temperature: {
        min: Temperature,
        max: Temperature;
    },
    dayIcon: number;
    nightIcon: number;
}

export interface Temperature {
    value: number
    unit: string
}