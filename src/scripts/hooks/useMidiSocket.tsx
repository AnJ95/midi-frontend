import useWebSocket, { ReadyState } from 'react-use-websocket';

const SOCKET_URL = 'wss://echo.websocket.org'

const SOCKET_OPTIONS = {
	// reconnect automatically
	shouldReconnect: (closeEvent) => { return true },
	reconnectAttempts: 20,
	reconnectInterval: 3000,

	// only open one connection
	share: true
}

export default function useMidiSocket(type) {
	const matchesType = (json) => type === '*' || type === json.type;

	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(SOCKET_URL, SOCKET_OPTIONS);

	const sendMessage = (json) => {
		json.type = json.type || channelType
		sendJsonMessage(json)
	}
	const lastMessage = (lastJsonMessage && matchesType(lastJsonMessage)) ? lastJsonMessage : null;

	const isOpen = readyState === ReadyState.OPEN;

	return [ sendMessage, lastMessage, isOpen, readyState ];
}

export function useMidiRequester(requestType, sendType, currentState, stateSetter, extractStateFromJson) {

	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(SOCKET_URL, SOCKET_OPTIONS);

	const startRequest = () => {
		sendJsonMessage({ type: requestType })
	}

	const sendDebugData = (data) => {
		data.type = sendType
		sendJsonMessage(data)
	}

	if (lastJsonMessage && lastJsonMessage.type === sendType) {
		const newState = extractStateFromJson ? extractStateFromJson(lastJsonMessage) : lastJsonMessage.items
		if (currentState !== newState) {
			stateSetter(newState)
		}
	}

	return [ startRequest, sendDebugData ];
}