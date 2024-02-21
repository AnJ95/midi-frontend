import useWebSocket, {Options, ReadyState} from 'react-use-websocket';
import {useState} from 'react';

import {SEND_DEBUG, SOCKET_URL} from './../data/Config';
import {iTyped, Json} from "../data/DomainModel.tsx";

const SOCKET_OPTIONS: Options = {
    // reconnect automatically
    shouldReconnect: () => {
        return true
    },
    reconnectAttempts: 20,
    reconnectInterval: 3000,

    // only open one connection
    share: true
}

function getFilteredSocketOptions(typeFilter: string, extraFilter?: (json: Json) => boolean) {
    let socketOptions = {...SOCKET_OPTIONS}
    if (typeFilter !== '*') {
        socketOptions.filter = (message) => {
            try {
                // TODO that's a lot of parsing - any other way to filter?
                const json = JSON.parse(message.data)
                return json.type === typeFilter && (!extraFilter || extraFilter(json))
            } catch (e) {
                return false
            }
        }
    }
    return socketOptions;
}

export default function useMidiSocket(type: string): [(data: Json) => void, Json, boolean, ReadyState] {

    let socketOptions = getFilteredSocketOptions(type)
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(SOCKET_URL, socketOptions);

    const sendMessage = (json: Json) => {
        json.type = json.type || type
        sendJsonMessage(json)
    }

    const isOpen = readyState === ReadyState.OPEN;

    return [sendMessage, lastJsonMessage, isOpen, readyState];
}

export function useMidiSender<T extends iTyped>(type: string): [(data: T) => void] {

    let socketOptions = {...SOCKET_OPTIONS}
    socketOptions.filter = () => false;
    const {sendJsonMessage} = useWebSocket(SOCKET_URL, socketOptions);

    const sendMessage = (json: T) => {
        json.type = json.type || type
        sendJsonMessage(json)
    }

    return [sendMessage];
}

export function useMidiRequester<T>(requestType: string, sendType: string, initialState: T, extractStateFromJson?: (json: Json) => T, filterMessageJson?: (json: Json) => boolean): [() => void, (data: Json) => void, T] {

    let socketOptions = getFilteredSocketOptions(sendType, filterMessageJson)
    const {sendJsonMessage, lastJsonMessage} = useWebSocket<Json>(SOCKET_URL, socketOptions);

    const [state, setState] = useState(initialState)

    const startRequest = () => {
        sendJsonMessage({type: requestType})
    }

    const sendDebugData = (data: Json) => {
        if (SEND_DEBUG) {
            data.type = sendType
            sendJsonMessage(data)
        }
    }

    if (lastJsonMessage) {
        const newState = extractStateFromJson ? extractStateFromJson(lastJsonMessage) : lastJsonMessage.items
        if (state !== newState) {
            setState(newState)
        }
    }

    return [startRequest, sendDebugData, state];
}