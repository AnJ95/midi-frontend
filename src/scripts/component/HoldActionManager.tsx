import {useEffect} from 'react';
import {useMidiRequester} from './../hooks/useMidiSocket'
import HoldActionDefinitions from './../data/HoldActionDefinitions.json'
import {FlexRow} from "./Flex.tsx";
import {HoldActionDefinition, PresetButtonDefinition} from "../data/DomainModel.tsx";
import Button from "./Button.tsx";
import HoldActionButton from "./HoldActionButton.tsx";
import {map1Dto2Darray} from "../utils.tsx";

interface iHoldActionManagerProps {

}

export default function HoldActionManager(_props: iHoldActionManagerProps) {

    const [requestHoldActionDefinitions, sendDebugHoldActionDefinitions, holdActionDefinitions] = useMidiRequester<PresetButtonDefinition[]>(
        "requestHoldActionDefinitions", // request type
        "sendHoldActionDefinitions", // type to expect data from
        [] // initial state
    );

    useEffect(() => {
        requestHoldActionDefinitions()

        // DEBUG
        sendDebugHoldActionDefinitions({items: HoldActionDefinitions})
    }, []);

    const holdActionDefinitions2D = map1Dto2Darray<HoldActionDefinition>(holdActionDefinitions);

    return (
        <Button noHover className="hold-action-manager">
            {holdActionDefinitions2D.map((holdActionDefinitionRow, i) => (
                <FlexRow stretch style={{height: "100%", width: "100%"}} key={i}>
                    {holdActionDefinitionRow.map((holdActionDefinition, j) =>
                        (holdActionDefinition
                                ? <HoldActionButton model={holdActionDefinition} key={j}/>
                                : <div key={j}/>

                        ))
                    }
                </FlexRow>
            ))}
        </Button>
    );
}
