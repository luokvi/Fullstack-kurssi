import React from 'react';

interface Course {
    name: string;
    exerciseCount: number;
}
interface ContentProps {
    courses: Course[];
}

const Content: React.FC<ContentProps> = (props) => {
    return(
        <div>
            {props.courses.map(c =>
                <p key={c.name}>{c.name} {c.exerciseCount}</p>
            )}
        </div>
    )
}

export default Content;