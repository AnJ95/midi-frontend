import {useMidiSender} from './../hooks/useMidiSocket'
import Button from './Button'
import {HoldAction, HoldActionDefinition} from "../data/DomainModel.tsx";

interface iHoldActionButtonProps {
    model: HoldActionDefinition
}

export default function HoldActionButton(props: iHoldActionButtonProps) {
    const [sendHoldAction] = useMidiSender<HoldAction>("sendHoldAction");

    return (
        <Button
            onMouseDown={() => {
                sendHoldAction(createHoldAction(props.model, true))
            }}
            onMouseUp={() => {
                sendHoldAction(createHoldAction(props.model, false))
            }}
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