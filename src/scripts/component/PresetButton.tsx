import {useMidiSender} from './../hooks/useMidiSocket'
import Button from './Button'
import {iRowCol, PresetButtonDefinition} from "../data/DomainModel.tsx";
import {Dispatch, SetStateAction} from "react";

interface iPresetButtonProps {
    model: PresetButtonDefinition
    currentPresets: { [key: number]: iRowCol; },
    setCurrentPresets: Dispatch<SetStateAction<{ [key: number]: iRowCol; }>>
}

export default function PresetButton(props: iPresetButtonProps) {

    const [sendMessage] = useMidiSender("setPreset");

    const onClick = () => {
        let rowCol: iRowCol = {row: props.model.row, column: props.model.column};
        sendMessage(rowCol);
        let newPreset = {...props.currentPresets}
        newPreset[props.model.row] = rowCol
        props.setCurrentPresets(newPreset);
    }
    const currentPreset = props.currentPresets[props.model.row] ?? {row: props.model.row, column: -1}

    return (
        <Button
            pressed={currentPreset.column === props.model.column}
            onClick={onClick}
            color={props.model.color}
            icon={props.model.icon}>
            <p>{props.model.text}</p>
        </Button>
    )
}
