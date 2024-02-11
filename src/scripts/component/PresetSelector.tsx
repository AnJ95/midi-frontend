import { useState } from 'react'

import PresetButton from './PresetButton'
import { FlexRow } from './Flex'

export default function PresetSelector(props) {
	const [ currentPreset, setCurrentPreset ] = useState(null)

	return (
        <FlexRow stretch>
			{props.buttons
				.filter((presetButtonDefinition) => presetButtonDefinition.category === props.model.id)
				.map((presetButtonDefinition, j) => (
					<PresetButton key={j} model={presetButtonDefinition} currentPreset={currentPreset} setCurrentPreset={setCurrentPreset} />
				))
			}
		</FlexRow>
      );
}
