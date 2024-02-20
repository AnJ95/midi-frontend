import {iProps} from "./Component.tsx";
import {Color} from "../data/DomainModel.tsx";
import React, {forwardRef} from "react";

export interface iBoxProps extends iProps {
    size?: string,
    color?: Color
}

const Box = forwardRef<HTMLDivElement, iBoxProps>(function Box(props: iBoxProps, ref) {

    const className = "box"
        + (props.className ? (" " + props.className) : "")
        + (props.size ? (" box--" + props.size) : "");

    const style: React.CSSProperties = props.style || {}
    if (props.color) {
        style["background"] = props.color
    }

    return (
        <div
            {...props.innerProps}
            className={className}
            style={style}
            ref={ref}
        >
            {props.children}
        </div>
    )
});

export default Box;