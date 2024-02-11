import { useState, useCallback, useEffect } from 'react';
import { useMidiSender } from './../hooks/useMidiSocket'

import Button from './Button'

export default function PresetButton(props) {

	const [sendMessage] = useMidiSender("setPreset");
	console.log("render Button")

	return (
		<Button onClick={() => sendMessage({ category: props.model.category, id: props.model.id })}>
			{props.model.text}
		</Button>
	)
}
