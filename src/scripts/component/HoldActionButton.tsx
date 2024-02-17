import {useMidiSender} from './../hooks/useMidiSocket'
import Button from './Button'
import {HoldAction, HoldActionDefinition} from "../data/DomainModel.tsx";
import {useState} from "react";

interface iHoldActionButtonProps {
    model: HoldActionDefinition
}

export default function HoldActionButton(props: iHoldActionButtonProps) {
    const [isHold, setIsHold] = useState(false);
    const [sendHoldAction] = useMidiSender<HoldAction>("sendHoldAction");

    return (
        <Button
            onMouseDown={() => {
                sendHoldAction(createHoldAction(props.model, true))
                setIsHold(true)
            }}
            onMouseUp={() => {
                sendHoldAction(createHoldAction(props.model, false))
                setIsHold(false)
            }}
            glow={isHold}
            color={props.model.color}
            icon={props.model.icon}>
            <p>{props.model.text}</p>
        </Button>
    )
}

const createHoldAction = function (model: HoldActionDefinition, value: boolean): HoldAction {
    return {
        row: model.row,
        column: model.column,
        value: value
    }
}