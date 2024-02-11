import { useEffect } from 'react';
import useMidiSocket, { useMidiRequester } from './../hooks/useMidiSocket'

import PresetCategoryDefinitions from './../data/PresetCategoryDefinitions.json'
import PresetButtonDefinitions from './../data/PresetButtonDefinitions.json'

import PresetButton from './PresetButton'
import { FlexRow, FlexCol } from './Flex'

export default function PresetButtons(props) {

	const [requestPresetCategoryDefinitions, sendDebugPresetCategoryDefinitions, presetCategoryDefinitions] = useMidiRequester(
		"requestPresetCategoryDefinitions", // request type
		"sendPresetCategoryDefinitions", // type to expect data from
		[] // initial state
	);
	const [requestPresetButtonDefinitions, sendDebugPresetButtonDefinitions, presetButtonDefinitions] = useMidiRequester(
		"requestPresetButtonDefinitions", // request type
		"sendPresetButtonDefinitions", // type to expect data from
		[] // initial state
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
