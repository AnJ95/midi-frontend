import {iProps} from "./Component.tsx";
import {Color, Icon as IconType} from "../data/DomainModel.tsx";
import Button, {iOnMouseDrag} from "./Button.tsx";
import {useCallback, useState} from "react";
import Icon from "./Icon.tsx";

interface iSelectWheelOption {
    text?: string,
    icon?: IconType,
    color?: Color,
}

export interface iSelectWheelProps extends iProps {
    text?: String,
    icon?: IconType,
    color?: Color,
    useSelectedColor?: boolean,
    useSelectedIcon?: boolean,
    onSelected?: (option: iSelectWheelOption) => void
}

export default function SelectWheel(props: iSelectWheelProps) {
    // assert
    for (let option of props.children) {
        console.assert(option.type === SELECT_WHEEL_TYPE, option.type, option)
    }

    const [isOpen, setIsOpen] = useState(true);

    const className = "select-wheel"
        + (" select-wheel--" + props.children.length)
        + (props.className ? (" " + props.className) : "")
        + (isOpen ? (" select-wheel--open") : "")

    const onMouseDown = useCallback(() => {
        setIsOpen(true)
    }, [setIsOpen]);
    const onMouseUp = useCallback(() => {
        setIsOpen(false)
    }, [setIsOpen]);
    const onMouseDrag = useCallback((event: iOnMouseDrag) => {
        const dirX = event.relX - 0.5 * event.width;
        const dirY = event.relY - 0.5 * event.height;
        const angle = Math.atan2(dirY, dirX);
        console.log(dirX, dirY, angle / (2 * 3.1415) * 360)

    }, []);

    return (
        <div
            {...props.innerProps}
            className={className}
        >
            <Button
                icon={props.icon}
                color={props.color}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseDrag={onMouseDrag}
            >
                {props.text}
            </Button>
            <div className="select-wheel__inner">
                <Button round className="select-wheel__background"/>
                <div className="select-wheel__options">
                    {props.children}
                </div>
            </div>
        </div>
    )
};

export function SelectWheelOption(props: iSelectWheelOption) {
    return (
        <div className="select-wheel__option">
            <p>{props.text}</p>
            {props.icon && <Icon icon={props.icon}/>}
        </div>
    )
}

const SELECT_WHEEL_TYPE = (<SelectWheelOption/>).type;