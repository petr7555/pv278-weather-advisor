import got from 'got';
import pkg from 'node-gzip';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import weatherStationsData from './weatherStations.json' assert { type: 'json' };
import { WeatherStation } from './types';

const weatherStations = weatherStationsData as WeatherStation[];
const czechStations = weatherStations.filter(station => station.country === 'CZ');
const czechStationsIds = czechStations.map(station => station.id);

console.log(`Found ${czechStationsIds.length} stations:\n`, czechStationsIds);


const { ungzip } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const downloadStationData = async (id: string) => {
    const { body } = await got(`https://bulk.meteostat.net/v2/monthly/${id}.csv.gz`, {
        responseType: 'buffer',
    });
    const data = (await ungzip(body)).toString();
    await fs.writeFile(`${__dirname}/stations/${id}.csv`, data);
};

const downloadCzechStationsData = async () => {
    czechStationsIds.forEach(downloadStationData);
    console.log('Completed');
};

await downloadCzechStationsData();
