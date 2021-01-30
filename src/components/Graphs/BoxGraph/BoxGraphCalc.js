import moment from 'moment';

export default function BoxGraphCalculation(
  categories,
  datesInput,
  inputSource,
) {
  const inputForBoxGraph = categories.map((category) => {
    let result = datesInput.map((date, index) => {
      let sum = inputSource
        .filter(
          (input) =>
            input.category == category.name &&
            moment(input.date).format('L') == date,
        )
        .reduce((total, input) => {
          return total + +input.money;
        }, 0);
      return {
        x: index,
        y: sum,
      };
    });

    return result;
  });

  return inputForBoxGraph;
}
