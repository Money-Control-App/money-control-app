export default function RadialGraphCalculation (categories, inputSource) {
    const inputForRadialGraph = categories.map((category) => {
        let totalSum = inputSource.reduce((total, input) => {
          return total + +input.money;
        }, 0);
    
        let catSum = inputSource
          .filter((input) => input.category == category.name)
          .reduce((total, input) => {
            return total + +input.money;
          }, 0);
    
        return {
          category: category.name,
          sum: Math.round((+catSum / +totalSum) * 100),
        };
      });

    return inputForRadialGraph
}