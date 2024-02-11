import {useState} from 'react'

import PresetButton from './PresetButton'
import {FlexRow} from './Flex'
import {PresetButtonDefinition, PresetCategoryDefinition} from "../data/DomainModel.tsx";

interface iPresetSelectorProps {
    buttons: PresetButtonDefinition[]
    model: PresetCategoryDefinition
}

export default function PresetSelector(props: iPresetSelectorProps) {
    const [currentPreset, setCurrentPreset] = useState<string>("NONE")

    return (
        <FlexRow stretch>
            {props.buttons
                .filter((presetButtonDefinition) => presetButtonDefinition.category === props.model.id)
                .map((presetButtonDefinition, j) => (
                    <PresetButton key={j} model={presetButtonDefinition} currentPreset={currentPreset}
                                  setCurrentPreset={setCurrentPreset}/>
                ))
            }
        </FlexRow>
    );
}
