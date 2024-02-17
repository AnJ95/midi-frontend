import {FaderDefinition, FaderHighlight, FaderState} from "../data/DomainModel.tsx";
import Button, {iButtonProps} from "./Button.tsx";
import {useMidiRequester, useMidiSender} from "../hooks/useMidiSocket.tsx";
import {useEffect, useState} from "react";
import {FlexCol} from "./Flex.tsx";

interface iFaderButtonProps extends iButtonProps {
    pressed?: boolean
    model: FaderDefinition
}

export default function FaderButton(props: iFaderButtonProps) {
    const [setFaderState] = useMidiSender<FaderState>("setFaderState");
    const [isHolding, setIsHolding] = useState(false);

    const [requestFaderState, sendDebugFaderState, faderState] = useMidiRequester<FaderState | null>(
        "requestFaderState", // request type
        "sendFaderState", // type to expect data from
        null, // initial state
        (json) => json, // custom state getter
        (json) => json.column === props.model.column && json.row === props.model.row // custom filter
    );

    const [, , faderHighlight] = useMidiRequester<FaderHighlight | null>(
        "",
        "sendFaderHighlight",
        null,
        (json) => json,
        (json) => json.column === props.model.column && json.row === props.model.row
    );

    useEffect(() => {
        requestFaderState()
        // DEBUG
        sendDebugFaderState({
            row: props.model.row,
            column: props.model.column,
            state: Math.random()
        })
    }, []);

    const className = "fader"
        + (props.className ? (" " + props.className) : "");

    return (<FlexCol stretch>

        <Button pressed={isHolding} noHover className={className}>
            <Button
                staySameHeight
                pressed={isHolding || faderHighlight?.value}
                className="fader__inner"
                size={props.size}
                color={props.model.color}
                icon={props.model.icon}
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onMouseDrag={({relYNorm}) => {
                    const state = {
                        row: props.model.row,
                        column: props.model.column,
                        state: Math.max(0, Math.min(1, relYNorm))
                    }
                    setFaderState(state)

                    // DEBUG
                    sendDebugFaderState(state)
                }}
            >
                {faderState && <div className={"fader__value"} style={{height: (faderState.state * 100.0) + "%"}}/>}
            </Button>
            <p style={{flexGrow: "0"}}>{props.model.text}</p>
        </Button>
    </FlexCol>)
}
