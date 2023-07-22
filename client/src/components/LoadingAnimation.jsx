import React from "react";

import "./LoadingAnimation.css";

function LoadingAnimation() {
    return (
        // <div className="loader-container">
        //     <div className="spinner"></div>
        // </div>
        <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default LoadingAnimation;
