import React from 'react';

function ProjectTextBox(props) {
    return (
        <svg preserveAspectRatio="none" viewBox="0 0 512 512" className={props.className} style={{filter: props.filter}}>
            <path d="M 32 512 L 480 512 C 496 512 512 496 512 480 L 512 32 C 512 16 496.1235539725813 1.9845557534273355 480.2471079451626 3.969111506854671 L 31.752892054837368 60.030888493145326 C 15.876446027418684 62.01544424657266 0 80 0 96 L 0 480 C 0 496 16 512 32 512 Z "
                fill={props.fill} />
        </svg>
    );
}
export default ProjectTextBox;