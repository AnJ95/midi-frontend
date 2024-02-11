import {Color, Icon} from "../data/DomainModel.tsx";

export interface iIconProps {
    icon: Icon,
    color: Color
}

export default function Icon(props: iIconProps) {

    const className = "i"
        + (props.icon ? (" i--" + props.icon) : "");

    return (
        <i className={className} style={{}}/>
    )
}
