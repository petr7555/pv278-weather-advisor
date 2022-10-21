import React from 'react';
import { BubbleMapController, GeoFeature, ProjectionScale, SizeScale } from 'chartjs-chart-geo';
import { CategoryScale, Chart as ChartJS, Legend, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import cze from './czeFeatures.json';

ChartJS.register(CategoryScale, PointElement, RadialLinearScale, Tooltip, Legend);
ChartJS.register(BubbleMapController, GeoFeature, ProjectionScale, SizeScale);

interface IBubbleMapPoint {
    longitude: number;
    latitude: number;
    value: number;
}

const points: IBubbleMapPoint[] = [{
  latitude: 49.1951,
  longitude: 16.6068,
  value: 1.4,
},
{
  latitude: 50.0755,
  longitude: 14.4378,
  value: 9.8,
}];

const labels = ['Brno', 'Praha'];

const data = {
  labels,
  datasets: [
    {
      label: 'Czech Republic',
      outline: cze.features,
      backgroundColor: '#ffe963',
      data: points,
      outlineBorderWidth: 2,
      outlineBorderColor: 'red',
      outlineBackgroundColor: 'lightgreen',
    },
    // {
    //   label: 'Other',
    //   outline: cze.features,
    //   backgroundColor: 'orange',
    //   data: points,
    // }
  ]
};

const options: any = {
  showOutline: true,
  showGraticule: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      displayColors: false,
      backgroundColor: 'black'
    }
  },
  scales: {
    xy: {
      projection: 'mercator',
      padding: 0,
    },
  },
  onClick: (event:any, elems: any[]) => {
    if (elems.length > 0) {
      const idx = elems[0].element.$context.dataIndex;
      console.log('clicked on', labels[idx]);
    }
  },
  onHover: (event: any, elems: any[]) => {
    const target = event.native ? event.native.target : event.target;
    target.style.cursor = elems[0] ? 'pointer' : 'default';
  },
};


const CzechMap = () => {
  return <Chart type={'bubbleMap'} data={data} options={options}/>;
};

export default CzechMap;
