import {useEffect, useState} from 'react';
import {useMidiRequester} from './../hooks/useMidiSocket'

import PresetCategoryDefinitions from './../data/PresetCategoryDefinitions.json'
import PresetButtonDefinitions from './../data/PresetButtonDefinitions.json'

import PresetButton from "./PresetButton.tsx";
import {FlexRow} from "./Flex.tsx";
import {iRowCol, PresetButtonDefinition, PresetCategoryDefinition} from "../data/DomainModel.tsx";
import Button from "./Button.tsx";

interface iPresetManagerProps {

}

export default function PresetManager(_props: iPresetManagerProps) {

    const [currentPresets, setCurrentPresets] = useState<{ [key: number]: iRowCol }>({})

    // @ts-ignore TODO
    const [requestPresetCategoryDefinitions, sendDebugPresetCategoryDefinitions, presetCategoryDefinitions] = useMidiRequester<PresetCategoryDefinition[]>(
        "requestPresetCategoryDefinitions", // request type
        "sendPresetCategoryDefinitions", // type to expect data from
        [] // initial state
    );
    const [requestPresetButtonDefinitions, sendDebugPresetButtonDefinitions, presetButtonDefinitions] = useMidiRequester<PresetButtonDefinition[][]>(
        "requestPresetButtonDefinitions", // request type
        "sendPresetButtonDefinitions", // type to expect data from
        [] // initial state
    );

    useEffect(() => {
        requestPresetCategoryDefinitions()
        requestPresetButtonDefinitions()

        // DEBUG
        sendDebugPresetCategoryDefinitions({items: PresetCategoryDefinitions})
        sendDebugPresetButtonDefinitions({items: PresetButtonDefinitions})
    }, []);

    return (
        <Button noHover className="preset-manager">
            {presetButtonDefinitions.map((presetButtonDefinitionRow, i) => (
                <FlexRow stretch style={{height: "100%", width: "100%"}} key={i}>
                    {presetButtonDefinitionRow.map((presetButtonDefinition, j) => (
                        <PresetButton key={j} model={presetButtonDefinition} currentPresets={currentPresets}
                                      setCurrentPresets={setCurrentPresets}/>
                    ))
                    }
                </FlexRow>
            ))}
        </Button>
    );
}
