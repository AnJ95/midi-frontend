import {useEffect} from 'react';
import {useMidiRequester, useMidiSender} from './../hooks/useMidiSocket'
import {FlexRow} from './Flex'
import FaderButton from "./FaderButton.tsx";
import Button from "./Button.tsx";

import FaderDefinitions from './../data/FaderDefinitions.json'
import {FaderDefinition, PageChangeAction} from "../data/DomainModel.tsx";
import {map1Dto2Darray} from "../utils.tsx";

interface iFaderManagerProps {

}

export default function FaderManager(_props: iFaderManagerProps) {

    const [requestFaderDefinitions, sendDebugFaderDefinitions, faderDefinitions] = useMidiRequester<FaderDefinition[]>(
        "requestFaderDefinitions", // request type
        "sendFaderDefinitions", // type to expect data from
        [] // initial state
    );

    const [sendPageLeft] = useMidiSender<PageChangeAction>("pageLeft");
    const [sendPageRight] = useMidiSender<PageChangeAction>("pageRight");

    useEffect(() => {
        requestFaderDefinitions()
        // DEBUG
        sendDebugFaderDefinitions({items: FaderDefinitions})
    }, []);

    const faderDefinitions2D = map1Dto2Darray<FaderDefinition>(faderDefinitions);

    return (
        <>
            {faderDefinitions2D.length > 0 && faderDefinitions2D.map((faderDefinitionRow, i) => (
                <FlexRow stretch key={i} className="fader-manager">
                    <Button onClick={() => sendPageLeft({row: i, direction: "left"})} icon={"left"}/>
                    {faderDefinitionRow.map((faderDefinition, j) =>
                        (faderDefinition
                                ? <FaderButton key={j} model={faderDefinition}/>
                                : <div key={j}/>
                        ))
                    }
                    <Button onClick={() => sendPageRight({row: i, direction: "right"})} icon={"right"}/>
                </FlexRow>
            ))}
        </>
    );

}
