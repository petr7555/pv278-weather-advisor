import React from 'react';
import * as ChartGeo from 'chartjs-chart-geo';
import { GeoFeature, ProjectionScale, SizeScale } from 'chartjs-chart-geo';
import { CategoryScale, Chart as ChartJS, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import cze from './czeFeatures.json';

ChartJS.register(CategoryScale);
ChartJS.register(RadialLinearScale);
ChartJS.register(ProjectionScale);
ChartJS.register(SizeScale);
ChartJS.register(PointElement);
ChartJS.register(Tooltip);
ChartJS.register(GeoFeature);
ChartJS.register(ChartGeo.BubbleMapController);

interface IBubbleMapPoint {
    longitude: number;
    latitude: number;
    value: number;
}

const points: IBubbleMapPoint[] = [{
    latitude: 49.1951,
    longitude: 16.6068,
    value: 10,
}];

const data = {
    labels: ['Brno'],
    datasets: [{
        outline: cze.features,
        showOutline: true,
        backgroundColor: 'steelblue',
        data: points,
    }]
};

const options: any = {
    plugins: {
        legend: {
            display: false
        },
    },
    scales: {
        xy: {
            projection: 'mercator',
        },
    }
};


const CzechMap = () => {
    return <Chart type={'bubbleMap'} data={data} options={options}/>;
};

export default CzechMap;
