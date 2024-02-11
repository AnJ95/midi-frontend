import { useState, useCallback, useEffect } from 'react';
import { useMidiSender } from './../hooks/useMidiSocket'

import Button from './Button'

export default function PresetButton(props) {

	const [sendMessage] = useMidiSender("setPreset");

	const onClick = () => {
		sendMessage({ category: props.model.category, id: props.model.id });
		props.setCurrentPreset(props.model.id);
	}

	return (
		<Button pressed={props.currentPreset == props.model.id} onClick={onClick}>
			{props.model.text}
		</Button>
	)
}
