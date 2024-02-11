import { useState, useCallback, useEffect } from 'react';
import useMidiSocket, { useMidiRequester } from './../hooks/useMidiSocket'

import PresetCategoryDefinitions from './../data/PresetCategoryDefinitions.json'
import PresetButtonDefinitions from './../data/PresetButtonDefinitions.json'

import PresetButton from './presetbutton'
import { FlexRow, FlexCol } from './flex'

export default function PresetButtons(props) {

	const [presetCategoryDefinitions, setPresetCategoryDefinitions] = useState([]);
	const [presetButtonDefinitions, setPresetButtonDefinitions] = useState([]);

	const [requestPresetCategoryDefinitions, sendDebugPresetCategoryDefinitions] = useMidiRequester(
		"requestPresetCategoryDefinitions", // request type
		"sendPresetCategoryDefinitions", // type to expect data from
		presetCategoryDefinitions, // current state
		setPresetCategoryDefinitions // state setter
	);
	const [requestPresetButtonDefinitions, sendDebugPresetButtonDefinitions] = useMidiRequester(
		"requestPresetButtonDefinitions", // request type
		"sendPresetButtonDefinitions", // type to expect data from
		presetButtonDefinitions, // current state
		setPresetButtonDefinitions // state setter
	);

	useEffect(() => {
		requestPresetCategoryDefinitions()
		requestPresetButtonDefinitions()

		// DEBUG
		sendDebugPresetCategoryDefinitions({ items: PresetCategoryDefinitions })
		sendDebugPresetButtonDefinitions({ items: PresetButtonDefinitions })
	}, []);

	return (
        <FlexCol stretch>
        	{presetCategoryDefinitions.map((presetCategoryDefinition, i) => (
        		<FlexRow key={i} stretch>
        			{presetButtonDefinitions
        				.filter((presetButtonDefinition) => presetButtonDefinition.category === presetCategoryDefinition.id)
        				.map((presetButtonDefinition, j) => (
							<PresetButton key={j} model={presetButtonDefinition} />
						))
					}
				</FlexRow>
        	))}
		</FlexCol>
      );
}
