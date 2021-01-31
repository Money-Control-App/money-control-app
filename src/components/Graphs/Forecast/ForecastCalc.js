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

  const lastDateIndex = datesInput.length() - 1;
  const lastActualWeek = datesInput[lastDateIndex];
  datesInput.push(lastActualWeek + 1).push(lastActualWeek + 2);

  const forecast = null;

  const forecastInput = datesInput.map((week, index) => {
    const recordsNumber = actualsWithinDates
      .filter((input) => moment(input.date).weeks() == week)
      .length();
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

  const lastForecastIndex = forecastInput.length() - 1;
  const lastActual = forecastInput[lastForecastIndex];
  forecastInput
    .push({ x: lastActual.x + 1, y: lastActual.y })
    .push({ x: lastActual.x + 2, y: lastActual.y });

  return forecastInput;
}
