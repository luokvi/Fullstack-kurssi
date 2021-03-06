export interface exerciseValues {
    exercises: Array<number>;
    target: number;
}
export interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (values: exerciseValues): exerciseResult => {
  const length = values.exercises.length;
  const training = values.exercises.filter(e => e > 0);
  const trainigLenght = training.length;
  const sum = values.exercises.reduce((a, b) =>  a + b);
  const avg = sum / length;
  const successfull = avg >= values.target;
  const difference = avg - values.target;
  let rating = 0;
  let ratingDes = '';
  if (difference <= -1){
      rating = 1;
      ratingDes = 'You can do better';
  }
  if (difference > -1 && difference <= 0.5){
      rating = 2;
      ratingDes = 'Good! Keep at it';
  }
  if (difference > 0.5){
      rating = 3;
      ratingDes = 'Amazing!';
  }


  return {
      periodLength: length,
      trainingDays: trainigLenght,
      success: successfull,
      rating: rating,
      ratingDescription: ratingDes,
      target: values.target,
      average: avg
  };
};

interface ErrorMsg {
    error: string;
}


export const validateExerciseArguments = (values: exerciseValues): ErrorMsg => {
    const t = Number(values.target);
    const array = values.exercises;
    let malformed = false;
    array.forEach(e => {
        const n = Number(e);
        if (isNaN(n)){
            malformed = true;
        }
    });
    if (isNaN(t) || malformed){
        return {
            error: 'Malformatted parameters!'
        };
    }

    return {
        error: '0'
    };
};



const validateArguments = (args: Array<string>): exerciseValues => {
  if(args.length < 4) throw new Error('Not enough arguments!');

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error('Provided values are not numbers!');
  const exercises = [];
  let index = 3;
  while (index < args.length){
    const value = (Number(args[index]));
    if(isNaN(value)) throw new Error('Provided values are not numbers!');
    exercises.push(value);
    index += 1;
  }

  return{
      exercises,
      target
  };
};

try {
  const values = validateArguments(process.argv);
  console.log(calculateExercises(values));
} catch (e) {
    console.log('Error:', e);
}