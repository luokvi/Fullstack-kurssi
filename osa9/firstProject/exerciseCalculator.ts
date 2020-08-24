interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exercises: Array<number>, target: number): exerciseResult => {
  const length = exercises.length;
  const training = exercises.filter(e => e > 0);
  const trainigLenght = training.length;
  const sum = exercises.reduce((a, b) =>  a + b);
  const avg = sum / length;
  const successfull = avg >= target;
  const difference = avg - target;
  let rating = 0;
  let ratingDes = '';
  if (difference <= -1){
      rating = 1;
      ratingDes = 'You can do better'
  }
  if (difference > -1 && difference <= 0.5){
      rating = 2;
      ratingDes = 'Good! Keep at it'
  }
  if (difference > 0.5){
      rating = 3;
      ratingDes = 'Amazing!'
  }


  return {
      periodLength: length,
      trainingDays: trainigLenght,
      success: successfull,
      rating: rating,
      ratingDescription: ratingDes,
      target: target,
      average: avg
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))