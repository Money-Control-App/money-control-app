import moment from 'moment';

export default function ForecastCalc(input, startDate, lastDate) {
  const actualsWithinDates = input.filter(
    (record) =>
      Date.parse(record.date) > Date.parse(startDate) &&
      Date.parse(record.date) < Date.parse(lastDate),
  );
  const datesInput = [
    ...new Set(
      actualsWithinDates
        .map((record) => (record = record.date))
        .map((date) => (date = moment(date).weeks()))
        .sort(),
    ),
  ];

  const forecastInput = datesInput.map((week, index) => {
    const recordsNumber = actualsWithinDates.filter(
      (input) => moment(input.date).weeks() == week,
    ).length;

    const totalSum = actualsWithinDates
      .filter((input) => moment(input.date).weeks() == week)
      .reduce((total, input) => {
        return total + +input.money;
      }, 0);
    return {
      x: index,
      y: (totalSum / recordsNumber).toFixed(),
    };
  });

  const lastForecastIndex = forecastInput.length - 1;
  const lastActual = forecastInput[lastForecastIndex];

  const coefficient = (
    forecastInput[lastForecastIndex].y / forecastInput[lastForecastIndex - 1].y
  ).toFixed(2);

  forecastInput[lastForecastIndex + 1] = {
    x: lastActual.x + 1,
    y: lastActual.y * coefficient,
  };

  forecastInput[lastForecastIndex + 2] = {
    x: lastActual.x + 2,
    y: forecastInput[lastForecastIndex + 1].y * coefficient,
  };

  const lastDateIndex = datesInput.length - 1;
  const lastActualWeek = datesInput[lastDateIndex];

  datesInput[lastDateIndex + 1] = lastActualWeek + 1;
  datesInput[lastDateIndex + 2] = lastActualWeek + 2;

  return {
    dates: datesInput,
    values: forecastInput,
  };
}
