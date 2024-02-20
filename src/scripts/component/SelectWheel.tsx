import {iProps} from "./Component.tsx";
import {Color, Icon} from "../data/DomainModel.tsx";
import Button from "./Button.tsx";

interface iSelectWheelOption {
    text?: string,
    icon?: Icon,
    color?: Color,
}

export interface iSelectWheelProps extends iProps {
    text?: String,
    icon?: Icon,
    color?: Color,
    useSelectedColor?: boolean,
    useSelectedIcon?: boolean,
    onSelected?: (option: iSelectWheelOption) => void
}

export default function SelectWheel(props: iSelectWheelProps) {

    const className = "select-wheel"
        + (props.className ? (" " + props.className) : "")


    return (
        <div
            {...props.innerProps}
            className={className}
        >
            <Button icon={props.icon} color={props.color}>{props.text}</Button>
            <div className="select-wheel__options">
                {props.children}
            </div>
        </div>
    )
};

export function SelectWheelOption(props: iSelectWheelOption) {
    return (
        <div className="select-wheel__option">
            {props.text}
        </div>
    )
}