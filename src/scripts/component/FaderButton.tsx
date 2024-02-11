import Button from './Button'
import {FaderDefinition, FaderState} from "../data/DomainModel.tsx";
import {iButtonProps} from "./Button.tsx";
import {useMidiRequester} from "../hooks/useMidiSocket.tsx";
import {useEffect} from "react";
import Icon from "./Icon.tsx";

interface iFaderButtonProps extends iButtonProps {
    pressed?: boolean
    model: FaderDefinition
}

export default function FaderButton(props: iFaderButtonProps) {

    const [requestFaderState, sendDebugFaderState, faderState] = useMidiRequester<FaderState | null>(
        "requestFaderState", // request type
        "sendFaderState", // type to expect data from
        null, // initial state
        (json) => json.item, // custom state getter
        (json) => json.item.id === props.model.id // custom filter
    );

    useEffect(() => {
        requestFaderState()
        // DEBUG
        sendDebugFaderState({
            item: {
                id: props.model.id,
                state: Math.random()
            },
        })
    }, []);

    const className = "fader"
        + (props.className ? (" " + props.className) : "");

    return (
        <Button className={className} size={props.size} onClick={props.onClick}>
            {faderState && <div className={"fader__value"} style={{height: (faderState.state * 100.0) + "%"}}/>}
            {props.model.icon ? (
                <Icon icon={props.model.icon} color={props.model.color}/>
            ) : (
                <p>props.model.text</p>
            )}
        </Button>
    )
}
