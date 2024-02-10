import { useState, useCallback, useEffect } from 'react';
import useMidiSocket from './../hooks/useMidiSocket'

import PresetCategoryDefinitions from './../data/PresetCategoryDefinitions.json'
import PresetButtonDefinitions from './../data/PresetButtonDefinitions.json'

import PresetButton from './presetbutton'
import { FlexRow, FlexCol } from './flex'

export default function PresetButtons(props) {

	const [presetCategoryDefinitions, setPresetCategoryDefinitions] = useState([]);
	const [presetButtonDefinitions, setPresetButtonDefinitions] = useState([]);

	const [ sendPresetCategoryDefinitions, lastPresetCategoryDefinitions ] = useMidiSocket("sendPresetCategoryDefinitions");
	const [ sendPresetButtonDefinitions, lastPresetButtonDefinitions ] = useMidiSocket("sendPresetButtonDefinitions");

	useEffect(() => {
        if (lastPresetCategoryDefinitions) {
			setPresetCategoryDefinitions(lastPresetCategoryDefinitions.items);
        }
	}, [lastPresetCategoryDefinitions, setPresetCategoryDefinitions]);
	useEffect(() => {
		if (lastPresetButtonDefinitions) {
			setPresetButtonDefinitions(lastPresetButtonDefinitions.items);
		}
	}, [lastPresetButtonDefinitions, setPresetButtonDefinitions]);

	// DEBUG
	useEffect(() => {
		sendPresetCategoryDefinitions({
			type: "sendPresetCategoryDefinitions",
			items: PresetCategoryDefinitions
		})
		sendPresetButtonDefinitions({
			type: "sendPresetButtonDefinitions",
			items: PresetButtonDefinitions
		})
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
