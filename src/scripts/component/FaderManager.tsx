import {useEffect} from 'react';
import {useMidiRequester, useMidiSender} from './../hooks/useMidiSocket'
import {FlexRow} from './Flex'
import FaderButton from "./FaderButton.tsx";
import Button from "./Button.tsx";

import FaderDefinitions from './../data/FaderDefinitions.json'
import {FaderDefinition} from "../data/DomainModel.tsx";

interface iFaderManagerProps {

}

export default function FaderManager(_props: iFaderManagerProps) {

    const [requestFaderDefinitions, sendDebugFaderDefinitions, faderDefinitions] = useMidiRequester<FaderDefinition[]>(
        "requestFaderDefinitions", // request type
        "sendFaderDefinitions", // type to expect data from
        [] // initial state
    );

    const [sendPageLeft] = useMidiSender("pageLeft");
    const [sendPageRight] = useMidiSender("pageRight");

    useEffect(() => {
        requestFaderDefinitions()
        // DEBUG
        sendDebugFaderDefinitions({items: FaderDefinitions})
    }, []);

    return (
        <FlexRow stretch>
            <Button onClick={() => sendPageLeft({})}>&lt;</Button>
            {faderDefinitions.map((faderDefinition, i) => (
                <FaderButton key={i} model={faderDefinition}/>
            ))}
            <Button onClick={() => sendPageRight({})}>&gt;</Button>
        </FlexRow>
    );
}
