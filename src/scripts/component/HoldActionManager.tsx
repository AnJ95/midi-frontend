import {useEffect} from 'react';
import {useMidiRequester} from './../hooks/useMidiSocket'
import HoldActionDefinitions from './../data/HoldActionDefinitions.json'
import {FlexRow} from "./Flex.tsx";
import {PresetButtonDefinition} from "../data/DomainModel.tsx";
import Button from "./Button.tsx";
import HoldActionButton from "./HoldActionButton.tsx";

interface iHoldActionManagerProps {

}

export default function HoldActionManager(_props: iHoldActionManagerProps) {

    const [requestHoldActionDefinitions, sendDebugHoldActionDefinitions, holdActionDefinitions] = useMidiRequester<PresetButtonDefinition[][]>(
        "requestHoldActionDefinitions", // request type
        "sendHoldActionDefinitions", // type to expect data from
        [] // initial state
    );

    useEffect(() => {
        requestHoldActionDefinitions()

        // DEBUG
        sendDebugHoldActionDefinitions({items: HoldActionDefinitions})
    }, []);

    return (
        <Button noHover className="hold-action-manager">
            {holdActionDefinitions.map((holdActionDefinitionRow, i) => (
                <FlexRow stretch style={{height: "100%", width: "100%"}} key={i}>
                    {holdActionDefinitionRow.map((holdActionDefinition, j) => (
                        <HoldActionButton model={holdActionDefinition} key={j}/>
                    ))
                    }
                </FlexRow>
            ))}
        </Button>
    );
}
