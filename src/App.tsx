import React, { useEffect, useRef } from 'react';
import * as ChartGeo from 'chartjs-chart-geo';
import { GeoFeature, ProjectionScale, SizeScale } from 'chartjs-chart-geo';
import * as Papa from 'papaparse';
import { CategoryScale, Chart, PointElement, RadialLinearScale } from 'chart.js';

Chart.register(CategoryScale);
Chart.register(RadialLinearScale);
Chart.register(ProjectionScale);
Chart.register(SizeScale);
Chart.register(PointElement);
Chart.register(GeoFeature);
Chart.register(ChartGeo.BubbleMapController);

function App() {
    let canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            Promise.all([
                fetch('https://unpkg.com/us-atlas/states-10m.json')
                    .then((r) => r.json()),
                fetch('https://gist.githubusercontent.com/mbostock/9535021/raw/928a5f81f170b767162f8f52dbad05985eae9cac/us-state-capitals.csv')
                    .then((r) => r.text()).then((d) => Papa.parse(d, { dynamicTyping: true, header: true }).data)
            ]).then(([us, data]) => {
                // @ts-ignore
                const states = ChartGeo.topojson.feature(us, us.objects.states).features;

                const chart = new Chart(context, {
                    type: 'bubbleMap',
                    data: {
                        // @ts-ignore
                        labels: data.map((d) => d.description),
                        datasets: [{
                            outline: states,
                            showOutline: true,
                            backgroundColor: 'steelblue',
                            // @ts-ignore
                            data: data.map((d) => Object.assign(d, { value: Math.round(Math.random() * 10) })),
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            // @ts-ignore
                            datalabels: {
                                align: 'top',
                                // @ts-ignore
                                formatter: (v) => {
                                    return v.description;
                                }
                            }
                        },
                        scales: {
                            xy: {
                                projection: 'albersUsa',
                            },
                            r: {
                                // @ts-ignore
                                size: [1, 20],
                            },
                        }
                    }
                });
            });
        }
    }, []);

    return (
        <>
            <button className="btn">Hello daisyUI</button>
            <canvas ref={canvasRef}></canvas>
        </>
    );
}

export default App;
