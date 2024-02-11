import {useMidiSender} from './../hooks/useMidiSocket'
import Button from './Button'
import React from "react";
import {PresetButtonDefinition} from "../data/DomainModel.tsx";

interface iPresetButtonProps {
    model: PresetButtonDefinition
    currentPreset: string
    setCurrentPreset: React.Dispatch<React.SetStateAction<string>>,
}

export default function PresetButton(props: iPresetButtonProps) {

    const [sendMessage] = useMidiSender("setPreset");

    const onClick = () => {
        sendMessage({category: props.model.category, id: props.model.id});
        props.setCurrentPreset(props.model.id);
    }

    return (
        <Button pressed={props.currentPreset == props.model.id} onClick={onClick}>
            {props.model.text}
        </Button>
    )
}
