import got from 'got';
import pkg from 'node-gzip';
import weatherStationsData from './weatherStations.json' assert { type: 'json' };

const { ungzip } = pkg;

type WeatherStation = {
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

const weatherStations = weatherStationsData as WeatherStation[];

const czechStations = weatherStations.filter(station => station.country === 'CZ');
const czechStationsIds = czechStations.map(station => station.id);

console.log(czechStationsIds.length, czechStationsIds);

const downloadStationData = async (id: string) => {
    const { body } = await got(`https://bulk.meteostat.net/v2/daily/${id}.csv.gz`, {
        responseType: 'buffer',
    });
    const data = (await ungzip(body)).toString();
    console.log(data);
};

const id = czechStationsIds[0];
downloadStationData(id).then(() => console.log('done'));
