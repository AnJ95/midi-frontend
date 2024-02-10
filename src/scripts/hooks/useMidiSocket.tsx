import useWebSocket, { ReadyState } from 'react-use-websocket';

const SOCKET_URL = 'wss://echo.websocket.org'

const SOCKET_OPTIONS = {
	shouldReconnect: (closeEvent) => { return true },
	reconnectAttempts: 10,
	reconnectInterval: 3000,
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