export const calculateBmi = (values: bmiValues): string => {
    const heightInMeters = values.height / 100;
    const bmi = values.weight / (heightInMeters * heightInMeters);

    if (bmi <= 15){
        return 'Very severely underweight';
    }
    if(bmi < 16){
        return 'Severly underweight';
    }
    if (bmi < 18.5){
        return 'Underweight';
    }
    if (bmi < 25){
        return 'Normal (healthy weight)';
    }
    if (bmi < 30){
        return 'Overweight';
    }
    if (bmi < 35){
        return 'Obese Class I (moderately obese)';
    }
    if (bmi < 40){
        return 'Obese Class II (Severely obese)';
    }
    
    if (bmi > 40){
        return 'Obese Class III (Very severely obese)';
    }
    
    return 'Something went wrong';
 };

export interface bmiValues {
    height: number;
    weight: number;
}

export const validateHeightAndWeight = (height: string, weight: string): bmiValues => {
  const h = Number(height);
  const w = Number(weight);
  if (isNaN(h) || isNaN(w)) throw new Error('Malformed parameters!');

  return {
      height: h,
      weight: w
  };
};