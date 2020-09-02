import React from 'react';
import { CoursePart } from '../index';
import Part from './Part';


interface ContentProps {
    courses: CoursePart[];
}

const Content: React.FC<ContentProps> = (props) => {
    return(
        <div>
            {props.courses.map(c =>
                <Part course={c} key={c.name}/>
            )}
        </div>
    )
}

export default Content;