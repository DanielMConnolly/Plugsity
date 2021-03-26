import React from "react";
import "./css/ProductDetails.css";

export const Button = (props) => {
    return (
        <button
            className={props.btnClass}
            onClick={() =>
                props.sign == "+" ? props.updateCount(1) : props.updateCount(-1)
            }
        >
            {props.sign}
        </button>
    );
};

export default Button;
