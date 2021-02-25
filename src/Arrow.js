import React from 'react'

const Arrow = (props) => {
    return (
        <svg className={props.className + " h-10 w-10"} xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
            <polyline transform={`rotate(${props.rotate} 256 256)`} fill="none" stroke="white" strokeLinecap="round" strokeWidth="32" points="256, 128 384, 256 256, 384" />
        </svg>
    );
}

export default Arrow;