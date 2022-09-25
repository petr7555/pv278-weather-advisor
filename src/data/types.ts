export type WeatherStation = {
    id: string;
    name: {
        en: string
    };
    country: string;
    location: {
        latitude: number;
        longitude: number;
    }
}
