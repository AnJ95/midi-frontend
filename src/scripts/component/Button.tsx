import {Icon as IconType} from "../data/DomainModel.tsx";
import Box, {iBoxProps} from './Box'
import React from "react";
import Icon from "./Icon.tsx";

export interface iButtonProps extends iBoxProps {
    pressed?: boolean,
    icon?: IconType,
}

export default function Button(props: iButtonProps) {
    const iconEl = React.useRef<HTMLElement>(null);

    const className = "button"
        + (props.className ? (" " + props.className) : "")
        + (props.pressed ? (" button--pressed") : "");

    return (
        <Box className={className}
             size={props.size}
             onClick={props.onClick}
             style={props.style}
             color={props.color}>
            {props.icon &&
                <div ref={iconEl} className="button__i">
                    <Icon icon={props.icon}/>
                </div>
            }
            {props.children}
        </Box>
    )
}
