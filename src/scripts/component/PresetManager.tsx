import {useEffect} from 'react';
import {useMidiRequester} from './../hooks/useMidiSocket'

import PresetCategoryDefinitions from './../data/PresetCategoryDefinitions.json'
import PresetButtonDefinitions from './../data/PresetButtonDefinitions.json'

import PresetSelector from './PresetSelector'

interface iPresetManagerProps {

}

export default function PresetManager(_props: iPresetManagerProps) {

    const [requestPresetCategoryDefinitions, sendDebugPresetCategoryDefinitions, presetCategoryDefinitions] = useMidiRequester(
        "requestPresetCategoryDefinitions", // request type
        "sendPresetCategoryDefinitions", // type to expect data from
        [] // initial state
    );
    const [requestPresetButtonDefinitions, sendDebugPresetButtonDefinitions, presetButtonDefinitions] = useMidiRequester(
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
        <>
            {presetCategoryDefinitions.map((presetCategoryDefinition, i) => (
                <PresetSelector key={i} model={presetCategoryDefinition} buttons={presetButtonDefinitions}/>
            ))}
        </>
    );
}
