const calculateBmi = (values: bmiValues): string => {
    const heightInMeters = values.height / 100;
    const bmi = values.weight / (heightInMeters * heightInMeters);

    if (bmi <= 15){
        return 'Very severely underweight';
    };
    if(bmi < 16){
        return 'Severly underweight';
    };
    if (bmi < 18.5){
        return 'Underweight';
    };
    if (bmi < 25){
        return 'Normal (healthy weight)';
    };
    if (bmi < 30){
        return 'Overweight';
    };
    if (bmi < 35){
        return 'Obese Class I (moderately obese)';
    };
    if (bmi < 40){
        return 'Obese Class II (Severely obese)';
    };
    if (bmi > 40){
        return 'Obese Class III (Very severely obese)';
    };
    
    return 'Something went wrong';
};

interface bmiValues {
    height: number;
    weight: number;
};

const validateBmiArguments = (args: Array<String>): bmiValues => {
    if(args.length < 4) throw new Error('Not enough arguments!');
  
    const height = Number(args[2]);
    const weight = Number(args[3]);
    if (isNaN(height) || isNaN(weight)) throw new Error('Provided values are not numbers!');
    else {
      return{
        height,
        weight
      };
    };
    
  };
  
try {
  const values = validateBmiArguments(process.argv);
  console.log(calculateBmi(values));
  } catch (e) {
    console.log('Error:', e.message);
};