import {Icon as IconType} from "../data/DomainModel.tsx";
import Box, {iBoxProps} from './Box'
import {useCallback, useEffect, useRef, useState} from "react";
import Icon from "./Icon.tsx";

interface iOnMouseDrag {
    absX: number,
    absY: number,
    relX: number,
    relY: number,
    relXNorm: number,
    relYNorm: number
}

export interface iButtonProps extends iBoxProps {
    pressed?: boolean,
    staySameHeight?: boolean,
    icon?: IconType,
    onClick?: () => void,
    onMouseDown?: () => void,
    onMouseUp?: () => void,
    onMouseDrag?: (event: iOnMouseDrag) => void
}

export default function Button(props: iButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const [, setIsMouseDown] = useState<boolean>(false)

    const className = "button"
        + (props.className ? (" " + props.className) : "")
        + (props.pressed ? (" button--pressed") : "")
        + (props.staySameHeight ? (" button--same-height") : "");

    const mouseMoveListener = useCallback((event: MouseEvent | TouchEvent) => {
        const bcr = ref.current?.getBoundingClientRect()
        let absX = 0
        let absY = 0
        if (event instanceof MouseEvent) {
            absX = event.clientX;
            absY = event.clientY;
        } else if (event instanceof TouchEvent) {
            absX = event.touches[0].clientX;
            absY = event.touches[0].clientY;
        }
        const relX = absX - (bcr ? bcr.x : 0);
        const relY = absY - (bcr ? bcr.y : 0);
        const relXNorm = relX / (bcr ? bcr.width : 1);
        const relYNorm = relY / (bcr ? bcr.height : 1);
        props.onMouseDrag?.({
            absX: absX,
            absY: absY,
            relX: relX,
            relXNorm: relXNorm,
            relY: relY,
            relYNorm: relYNorm
        })
    }, [props, ref]);

    const onMouseDown = () => {
        props.onMouseDown?.()
        setIsMouseDown(true)
        addEventListener("mousemove", mouseMoveListener);
        addEventListener("touchmove", mouseMoveListener);

        addEventListener("mouseup", onMouseUp, {once: true});
        addEventListener("touchend", onMouseUp, {once: true});
    }
    const onMouseUp = () => {
        props.onMouseUp?.()
        setIsMouseDown(false)
        removeEventListener("mousemove", mouseMoveListener)
        removeEventListener("touchmove", mouseMoveListener)
    }

    useEffect(() => {
        return () => {
            removeEventListener("mousemove", mouseMoveListener)
            removeEventListener("touchmove", mouseMoveListener)

            removeEventListener("mouseup", onMouseUp);
            removeEventListener("touchend", onMouseUp)
        }
    }, []);

    return (
        <Box className={className}
             size={props.size}
             innerProps={{
                 onClick: props.onClick,
                 onMouseDown: onMouseDown,
                 onMouseUp: onMouseUp,
                 onTouchStart: onMouseDown,
                 onTouchEnd: onMouseUp
             }}
             style={props.style}
             color={props.color}
             ref={ref}>
            {props.icon &&
                <div ref={iconRef} className="button__i">
                    <Icon icon={props.icon}/>
                </div>
            }
            {props.children}
        </Box>
    )
}
