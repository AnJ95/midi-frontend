import {iProps} from "./Component.tsx";
import {Color, Icon as IconType} from "../data/DomainModel.tsx";
import Button, {iOnMouseDrag} from "./Button.tsx";
import {useCallback, useRef, useState} from "react";
import Icon from "./Icon.tsx";

interface iSelectWheelOption {
    text?: string,
    icon?: IconType,
    color?: Color
}

export interface iSelectWheelProps extends iProps {
    text?: String,
    icon?: IconType,
    color?: Color,
    useSelectedColor?: boolean,
    useSelectedIcon?: boolean,
    onSelected?: (option: iSelectWheelOption) => void,
    selectedOption?: number
}


export default function SelectWheel(props: iSelectWheelProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(props.selectedOption);
    const [hoveredOption, setHoveredOption] = useState<number | undefined>();
    const curHoveredOption = useRef<number | undefined>()

    const sliceAngle = 2 * Math.PI / props.children.length;

    const className = "select-wheel"
        + (" select-wheel--" + props.children.length)
        + (props.className ? (" " + props.className) : "")
        + (isOpen ? (" select-wheel--open") : "")
        + (selectedOption !== undefined ? (" select-wheel--selected--" + selectedOption) : "")
        + (curHoveredOption.current !== undefined ? (" select-wheel--hovered--" + curHoveredOption.current) : "")

    const onMouseDown = useCallback(() => {
        setIsOpen(true)
    }, [setIsOpen]);

    const onMouseUp = useCallback(() => {
        if (curHoveredOption.current !== undefined) {
            setSelectedOption(curHoveredOption.current)
            setHoveredOption(undefined)
        }
        setIsOpen(false)
    }, [curHoveredOption, setSelectedOption, setHoveredOption, setIsOpen]);

    const onMouseDrag = useCallback((event: iOnMouseDrag) => {
        const dirX = event.relX - 0.5 * event.width;
        const dirY = event.relY - 0.5 * event.height;
        if (dirX * dirX + dirY * dirY < 900) {
            curHoveredOption.current = undefined;
            setHoveredOption(undefined)
            return;
        }
        const angle = Math.atan2(dirX, -dirY);
        const angleContinuous = angle < 0 ? (2 * Math.PI + angle) : angle;
        const newHoveredOption = Math.round(angleContinuous / sliceAngle) % props.children.length;

        curHoveredOption.current = newHoveredOption;
        setHoveredOption(newHoveredOption);
    }, [hoveredOption, setHoveredOption]);

    return (
        <div
            {...props.innerProps}
            className={className}
            style={props.style}
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
        <div className={"select-wheel__option"}>
            <div className="select-wheel__option__background-container">
                <div className="select-wheel__option__background"
                     style={{borderColor: `transparent ${(props.color || "transparent")} transparent transparent`}}/>
            </div>
            <p>{props.text}</p>
            {props.icon && <Icon icon={props.icon}/>}
        </div>
    )
}