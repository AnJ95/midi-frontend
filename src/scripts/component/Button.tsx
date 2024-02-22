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
    const currentTouches = useRef<number[]>([]);

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

    const getMouseDrag = useCallback((absX: number, absY: number) => {
        const bcr = ref.current?.getBoundingClientRect()
        const relX = absX - (bcr ? bcr.x : 0);
        const relY = absY - (bcr ? bcr.y : 0);
        const relXNorm = relX / (bcr ? bcr.width : 1);
        const relYNorm = relY / (bcr ? bcr.height : 1);
        return {
            absX: absX,
            absY: absY,
            width: (bcr ? bcr.width : 0),
            height: (bcr ? bcr.height : 0),
            relX: relX,
            relXNorm: relXNorm,
            relY: relY,
            relYNorm: relYNorm
        }
    }, [props, ref]);

    const dispatchMouseDrag = useCallback((absX: number, absY: number) => {
        props.onMouseDrag?.(getMouseDrag(absX, absY))
    }, [getMouseDrag]);

    const onMouseMove = useCallback((event: any) => {
        if (event.type === "mousemove") {
            dispatchMouseDrag(event.clientX, event.clientY)
        } else if (event.type === "touchmove") {
            for (let i = 0; i < event.touches.length; i++) {
                const touch = event.touches[i];
                if (currentTouches.current.includes(touch.identifier)) {
                    dispatchMouseDrag(touch.clientX, touch.clientY)
                    // if (props.icon) console.log(props.icon, "move", touch.identifier, "/" + event.touches.length, currentTouches.current)
                }
            }
        }
        event.preventDefault();
    }, [dispatchMouseDrag]);

    const onMouseDown = useCallback((event: any) => {
        props.onMouseDown?.()
        setIsMouseDown(true)
        addEventListener("mousemove", onMouseMove);

        if (event.type === "mousedown") {
            dispatchMouseDrag(event.clientX, event.clientY)
        } else if (event.type === "touchstart") {
            for (let i = 0; i < event.changedTouches.length; i++) {
                const touch = event.changedTouches[i];
                dispatchMouseDrag(touch.clientX, touch.clientY)
                currentTouches.current.push(touch.identifier);
                // if (props.icon) console.log(props.icon, "down", touch.identifier, "/" + event.changedTouches.length, currentTouches.current)
            }
        }

        addEventListener("mouseup", onMouseUp, {once: true});
        event.preventDefault();
    }, [props.onMouseDown, setIsMouseDown, onMouseMove]);

    const onMouseUp = useCallback((event: any) => {
        let mouseDrag: iOnMouseDrag | undefined;

        if (event.type === "mouseup") {
            mouseDrag = getMouseDrag(event.clientX, event.clientY);
        } else if (event.type === "touchend") {
            for (let i = 0; i < event.changedTouches.length; i++) {
                const touch = event.changedTouches[i];
                mouseDrag = getMouseDrag(touch.clientX, touch.clientY)
                currentTouches.current.splice(currentTouches.current.indexOf(touch.identifier));
                // if (props.icon) console.log(props.icon, "up", touch.identifier, "/" + event.changedTouches.length, currentTouches.current)
            }
        }

        if (mouseDrag && mouseDragInside(mouseDrag)) {
            props.onClick?.()
        }
        props.onMouseUp?.()
        setIsMouseDown(false)
        removeEventListener("mousemove", onMouseMove)
    }, [props.onMouseUp])

    useEffect(() => {
        return () => {
            removeEventListener("mousemove", onMouseMove)

            removeEventListener("mouseup", onMouseUp);
        }
    }, []);

    return (
        <Box className={className}
             size={props.size}
             innerProps={{
                 onMouseDown: onMouseDown,
                 onMouseUp: onMouseUp,
                 onTouchStart: onMouseDown,
                 onTouchMove: onMouseMove,
                 onTouchEnd: onMouseUp,
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

function mouseDragInside(mouseDrag: iOnMouseDrag) {
    return mouseDrag.relYNorm >= 0 && mouseDrag.relYNorm <= 1 && mouseDrag.relYNorm >= 0 && mouseDrag.relYNorm <= 1;
}