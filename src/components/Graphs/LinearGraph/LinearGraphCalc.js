import moment from 'moment';

export default function LinearGraphCalculation(datesInput, inputSource) {
  const inputForLinearGraph = datesInput.map((date, index) => {
    let totalSum = inputSource
      .filter((input) => moment(input.date).format('L') == date)
      .reduce((total, input) => {
        return total + +input.money;
      }, 0);
    return {
      x: index,
      y: totalSum,
    };
  });
  return inputForLinearGraph;
}
