import React, { FC } from 'react';
import { BubbleMapController, GeoFeature, ProjectionScale, SizeScale } from 'chartjs-chart-geo';
import { CategoryScale, Chart as ChartJS, Legend, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import cze from './czeFeatures.json';
import { Rating } from '../Dashboard/getRatings';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts'

ChartJS.register(CategoryScale, PointElement, RadialLinearScale, Tooltip, Legend);
ChartJS.register(BubbleMapController, GeoFeature, ProjectionScale, SizeScale);

type Props = {
    ratings: Rating[]
}

const CzechMap: FC<Props> = ({
  ratings
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

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
        outlineBorderColor: 'darkgreen',
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
      r: {
        min: 0,
        max: 10,
      },
    },
    onClick: (event: any, elems: any[]) => {
      if (elems.length > 0) {
        const idx = elems[0].element.$context.dataIndex;
        const loc = ratings[idx];
        if (location.search.includes('ratingValue')) {
          location.search = location.search.replace(/ratingValue=(0|[1-9]\d*)(\.\d+)?/, `ratingValue=${loc.value}`);
        } else {
          location.search = location.search + `&ratingValue=${loc.value}`;
        }
        navigate(`/location/${loc.id}${location.search}`);
      }
    },
    onHover: (event: any, elems: any[]) => {
      const target = event.native ? event.native.target : event.target;
      target.style.cursor = elems[0] ? 'pointer' : 'default';
    },
  };

  const position = width >= 1024 ? 'on the right' : "below";
  const hintText = `Choose an activity and month ${position} first.`;
  
  return <div className="relative py-1">
    <Chart type={'bubbleMap'} data={data} options={options}/>
    {ratings.length === 0 && (
      <>
        <div
          className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ' +
                        'w-full h-full'}
          style={{
            backdropFilter: 'blur(2px)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}></div>
        <p className={'text-center text-3xl ' +
                    'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6'}
        >{hintText}</p>
      </>)}
  </div>;
};

export default CzechMap;
