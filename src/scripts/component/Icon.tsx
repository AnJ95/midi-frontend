import {Color, Icon} from "../data/DomainModel.tsx";
import {iProps} from "./Component.tsx";

export interface iIconProps extends iProps {
    icon: Icon,
    color?: Color
}

export default function Icon(props: iIconProps) {

    const className = "i"
        + (props.icon ? (" i--" + props.icon) : "")
        + (props.className ? (" " + props.className) : "");

    return (
        <i className={className} style={props.style}/>
    )
}
