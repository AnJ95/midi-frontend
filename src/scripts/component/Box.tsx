import {iProps} from "./Component.tsx";
import {Color} from "../data/DomainModel.tsx";
import React from "react";

export interface iBoxProps extends iProps {
    size?: string,
    color?: Color,
    onClick?: () => void,
}

export default function Box(props: iBoxProps) {

    const className = "box"
        + (props.className ? (" " + props.className) : "")
        + (props.size ? (" box--" + props.size) : "");

    const style: React.CSSProperties = props.style || {}
    if (props.color) {
        style["backgroundColor"] = props.color
    }

    return (
        <div className={className} style={style} onClick={props.onClick}>
            {props.children}
        </div>
    )
}
