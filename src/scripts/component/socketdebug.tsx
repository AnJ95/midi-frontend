import { useState, useCallback, useEffect } from 'react';
import { ReadyState } from 'react-use-websocket';
import useMidiSocket from './../hooks/useMidiSocket'

import Box from './../component/box'
import { FlexRow } from './../component/flex'

const READY_STATES = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

export default function SocketDebug(props) {

	const [messageHistory, setMessageHistory] = useState([]);
	const [sendMessage, lastMessage, isOpen, readyState] = useMidiSocket("*");

	useEffect(() => {
        if (lastMessage !== null) {
			setMessageHistory((prev) => prev.concat(lastMessage));
        }
	}, [lastMessage, setMessageHistory]);

	const handleClickSendMessage = useCallback(() => sendMessage({ type: "debug", text: "hallo" }), []);

	const messageHistoryStr = messageHistory
		.map((message, idx) => (message ? JSON.stringify(message) : ""))
		.reverse().join("\n")

	return (
        <Box style={{ flexGrow: "0" }}>
        	<FlexRow stretch style={{ height: "100%" }}>
        		<div>
					<p>WebSocket ReadyState: {READY_STATES[readyState]}</p>
					<button onClick={handleClickSendMessage} disabled={!isOpen}>TestMsg</button>
				</div>
				<textarea readOnly style={{ height: "100px" }} value={messageHistoryStr} />
			</FlexRow>
        </Box>
      );
}
