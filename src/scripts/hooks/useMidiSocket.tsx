import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useState } from 'react';

const SOCKET_URL = 'wss://echo.websocket.org'

const SOCKET_OPTIONS = {
	// reconnect automatically
	shouldReconnect: (closeEvent) => { return true },
	reconnectAttempts: 20,
	reconnectInterval: 3000,

	// only open one connection
	share: true
}

function getFilteredSocketOptions(typeFilter) {
	let socketOptions = { ...SOCKET_OPTIONS }
	if (typeFilter !== '*') {
		socketOptions.filter = (message) => {
			try {
				// TODO that's a lot of parsing - any other way to filter?
				const json = JSON.parse(message.data)
				return json.type === typeFilter
			} catch (e) {
				return false
			}
		}
	}
	return socketOptions;
}

export default function useMidiSocket(type) {

	let socketOptions = getFilteredSocketOptions(type)
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(SOCKET_URL, socketOptions);

	const sendMessage = (json) => {
		json.type = json.type || type
		sendJsonMessage(json)
	}

	const isOpen = readyState === ReadyState.OPEN;

	return [ sendMessage, lastJsonMessage, isOpen, readyState ];
}

export function useMidiSender(type) {

	let socketOptions = { ...SOCKET_OPTIONS }
	socketOptions.filter = () => false;
	const { sendJsonMessage } = useWebSocket(SOCKET_URL, socketOptions);

	const sendMessage = (json) => {
		json.type = json.type || type
		sendJsonMessage(json)
	}

	return [ sendMessage ];
}

export function useMidiRequester(requestType, sendType, initialState, extractStateFromJson) {

	let socketOptions = getFilteredSocketOptions(sendType)
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(SOCKET_URL, socketOptions);

	const [ state, setState ] = useState(initialState)

	const startRequest = () => {
		sendJsonMessage({ type: requestType })
	}

	const sendDebugData = (data) => {
		data.type = sendType
		sendJsonMessage(data)
	}

	if (lastJsonMessage) {
		const newState = extractStateFromJson ? extractStateFromJson(lastJsonMessage) : lastJsonMessage.items
		if (state !== newState) {
			setState(newState)
		}
	}

	return [ startRequest, sendDebugData, state ];
}