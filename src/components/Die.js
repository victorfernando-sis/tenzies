import React from "react";


export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld === true? "#59e392": "#ffff"
    }

    return (
        <div 
            className={`Die ${props.isHeld && "held"}`}
            onClick={props.holdDice}>
            <div>{props.value}</div>
        </div>
    )
}