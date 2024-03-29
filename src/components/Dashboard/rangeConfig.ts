const rangeConfig = {
  /* Temperature range in data: [-6.99, 20.91] */
  temperature: {
    min: -9,
    max: 24,
    step: 3,
    default: 10,
  },
  /* Sunshine range in data: [0.35, 8.79] */
  sunshine: {
    min: 0,
    max: 10,
    step: 1,
    default: 5,
  },
  /* Precipitation range in data: [11.9, 196.06] */
  precipitation: {
    min: 0,
    max: 200,
    step: 20,
    default: 100,
  },
  /* Snow range in data: [0, 186.5] */
  snow: {
    min: 0,
    max: 200,
    step: 20,
    default: 100,
  },
  stations: {
    min: 10,
    max: 50,
    step: 10,
    default: 30,
  },
};

export default rangeConfig;
