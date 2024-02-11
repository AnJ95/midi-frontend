import {useEffect, useRef, useState} from 'react';
import {ReadyState} from 'react-use-websocket';
import useMidiSocket from './../hooks/useMidiSocket'

import Box from './Box'
import {FlexRow} from './Flex'
import {Json} from "../data/DomainModel.tsx";

const READY_STATES = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

export default function SocketDebug() {

    const [messageHistory, setMessageHistory] = useState<Json[]>([]);
    const [sendMessage, lastMessage, isOpen, readyState] = useMidiSocket("*");

    const onClickSendMessage = () => {
        try {
            if (inputElement.current) {
                const json = JSON.parse(inputElement.current.value)
                sendMessage(json);
            }
        } catch (e) {
            console.error(e)
        }
    }
    const inputElement = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage, setMessageHistory]);

    const messageHistoryStr = messageHistory
        .map((message) => {
            if (message) {
                let messageCopy = {...message};
                delete messageCopy.type;

                return (message.type || "UNTYPED") + ": " + JSON.stringify(messageCopy)
            }
            return "empty message"
        })
        .reverse().join("\n")

    return (
        <Box style={{flexGrow: "0"}}>
            <FlexRow stretch style={{height: "100%"}}>
                <div>
                    <p>WebSocket ReadyState: {READY_STATES[readyState]}</p>
                    <input ref={inputElement}
                           defaultValue={'{"type":"sendFaderState", "item":{"id":"hexagons", "state":0.5}}'}/>
                    &nbsp;
                    <button onClick={onClickSendMessage} disabled={!isOpen}>Send</button>
                </div>
                <textarea readOnly style={{height: "100px", whiteSpace: "pre"}} value={messageHistoryStr}/>
            </FlexRow>
        </Box>
    );
}
