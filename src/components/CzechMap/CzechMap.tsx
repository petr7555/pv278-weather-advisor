import React, { FC, useContext } from 'react';
import { BubbleMapController, GeoFeature, ProjectionScale, SizeScale } from 'chartjs-chart-geo';
import { CategoryScale, Chart as ChartJS, Legend, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import cze from './czeFeatures.json';
import { Rating } from '../Dashboard/getRatings';
import { useNavigate } from 'react-router-dom';
import StateContext from '../../stateContext';

ChartJS.register(CategoryScale, PointElement, RadialLinearScale, Tooltip, Legend);
ChartJS.register(BubbleMapController, GeoFeature, ProjectionScale, SizeScale);

type Props = {
    ratings: Rating[]
}

const CzechMap: FC<Props> = ({
  ratings
}) => {
  const { setRatingValue } = useContext(StateContext);
  const navigate = useNavigate();

  const labels = ratings.map(rating => rating.name);

  const data = {
    labels,
    datasets: [
      {
        label: 'Czech Republic',
        outline: cze.features,
        backgroundColor: '#ffe963',
        data: ratings,
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
    onClick: (event: any, elems: any[]) => {
      if (elems.length > 0) {
        const idx = elems[0].element.$context.dataIndex;
        const location = ratings[idx];
        setRatingValue(location.value);
        navigate(`/location/${location.name}`);
      }
    },
    onHover: (event: any, elems: any[]) => {
      const target = event.native ? event.native.target : event.target;
      target.style.cursor = elems[0] ? 'pointer' : 'default';
    },
  };


  return <Chart type={'bubbleMap'} data={data} options={options}/>;
};

export default CzechMap;
