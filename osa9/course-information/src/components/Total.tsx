import React from 'react';

interface Course {
    exerciseCount: number;
}
interface TotalProps {
    courses: Course[];
}

const Total: React.FC<TotalProps> = (props) => {
    const total = props.courses.reduce((carry, part) => carry + part.exerciseCount, 0);

    return(
        <p>Number of exercises {total}</p>
    )
}

export default Total;