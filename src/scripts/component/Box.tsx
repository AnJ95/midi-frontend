import {iProps} from "./Component.tsx";
import {Color} from "../data/DomainModel.tsx";
import React, {forwardRef} from "react";

export interface iBoxProps extends iProps {
    size?: string,
    color?: Color,
    onClick?: () => void,
    onMouseDown?: () => void,
    onMouseUp?: () => void
}

const Box = forwardRef<HTMLDivElement, iBoxProps>(function Box(props: iBoxProps, ref) {

    const className = "box"
        + (props.className ? (" " + props.className) : "")
        + (props.size ? (" box--" + props.size) : "");

    const style: React.CSSProperties = props.style || {}
    if (props.color) {
        style["backgroundColor"] = props.color
    }

    return (
        <div className={className} style={style} onClick={props.onClick} onMouseDown={props.onMouseDown}
             onMouseUp={props.onMouseUp} ref={ref}>
            {props.children}
        </div>
    )
});

export default Box;