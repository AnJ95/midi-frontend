import {Color, Icon as IconType} from "../data/DomainModel.tsx";
import Box, {iBoxProps} from './Box'
import {useCallback, useEffect, useRef, useState} from "react";
import Icon from "./Icon.tsx";

export interface iOnMouseDrag {
    absX: number,
    absY: number,
    width: number,
    height: number,
    relX: number,
    relY: number,
    relXNorm: number,
    relYNorm: number
}

export interface iButtonProps extends iBoxProps {
    pressed?: boolean,
    staySameHeight?: boolean,
    noHover?: boolean,
    glow?: boolean,
    glowColor?: Color,
    round?: boolean,
    icon?: IconType,
    onClick?: () => void,
    onMouseDown?: () => void,
    onMouseUp?: () => void,
    onMouseDrag?: (event: iOnMouseDrag) => void
}

export default function Button(props: iButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [, setIsMouseDown] = useState<boolean>(false)

    const className = "button"
        + (props.className ? (" " + props.className) : "")
        + (props.pressed ? (" button--pressed") : "")
        + (props.noHover ? (" button--no-hover") : "")
        + (props.glow ? (" button--glow") : "")
        + (props.round ? (" button--round") : "")
        + (props.staySameHeight ? (" button--same-height") : "")

    const style = props.style || {};
    style.color = props.glowColor || props.color;

    const dispatchMouseDrag = useCallback((absX: number, absY: number) => {
        const bcr = ref.current?.getBoundingClientRect()
        const relX = absX - (bcr ? bcr.x : 0);
        const relY = absY - (bcr ? bcr.y : 0);
        const relXNorm = relX / (bcr ? bcr.width : 1);
        const relYNorm = relY / (bcr ? bcr.height : 1);
        props.onMouseDrag?.({
            absX: absX,
            absY: absY,
            width: (bcr ? bcr.width : 0),
            height: (bcr ? bcr.height : 0),
            relX: relX,
            relXNorm: relXNorm,
            relY: relY,
            relYNorm: relYNorm
        })
    }, [props, ref]);

    const mouseMoveListener = useCallback((event: MouseEvent | TouchEvent) => {
        if (event instanceof MouseEvent) {
            dispatchMouseDrag(event.clientX, event.clientY)
        } else if (event instanceof TouchEvent) {
            dispatchMouseDrag(event.touches[0].clientX, event.touches[0].clientY)
        }
    }, [dispatchMouseDrag]);

    const onMouseDown = (event: any) => {
        props.onMouseDown?.()
        setIsMouseDown(true)
        addEventListener("mousemove", mouseMoveListener);
        addEventListener("touchmove", mouseMoveListener);
        if (event.clientX) {
            dispatchMouseDrag(event.clientX, event.clientY)
        }
        if (event.touches) {
            dispatchMouseDrag(event.touches[0].clientX, event.touches[0].clientY)
        }
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
             style={style}
             color={props.color}
             ref={ref}>
            <div className="button__inner">
                {props.icon &&
                    <div className="button__i">
                        <Icon icon={props.icon}/>
                    </div>
                }
                {props.children}
            </div>
        </Box>
    )
}
