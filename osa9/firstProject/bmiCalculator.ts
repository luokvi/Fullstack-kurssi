const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height / 100
    const bmi = weight / (heightInMeters * heightInMeters)

    if (bmi <= 15){
        return 'Very severely underweight'
    }
    if(bmi < 16){
        return 'Severly underweight'
    }
    if (bmi < 18.5){
        return 'Underweight'
    }
    if (bmi < 25){
        return 'Normal (healthy weight)'
    }
    if (bmi < 30){
        return 'Overweight'
    }
    if (bmi < 35){
        return 'Obese Class I (moderately obese)'
    }
    if (bmi < 40){
        return 'Obese Class II (Severely obese)'
    }
    if (bmi > 40){
        return 'Obese Class III (Very severely obese)'
    }
    
    return 'BMI is bullshit'
}

console.log(calculateBmi(180, 74))
