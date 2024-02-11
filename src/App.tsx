import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Box from './scripts/component/Box.tsx'
import Button from './scripts/component/Button.tsx'
import PresetButtons from './scripts/component/PresetButtons.tsx'
import SocketDebug from './scripts/component/SocketDebug.tsx'
import { FlexRow, FlexCol } from './scripts/component/Flex.tsx'

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
		  	<FlexCol stretch gap="lg">
		  		<SocketDebug />
		  		<PresetButtons />
				<FlexRow stretch>
					<Box>
						<FlexCol stretch style={{ height: "100%" }}>
							<Button></Button>
							<Button></Button>
							<Button></Button>
							<Button></Button>
						</FlexCol>
					</Box>
					<Box>
						<FlexCol stretch style={{ height: "100%" }}>
							<Button></Button>
							<Button></Button>
							<Button></Button>
							<Button></Button>
						</FlexCol>
					</Box>
					<Box>
						<FlexCol stretch style={{ height: "100%" }}>
							<Button></Button>
							<Button></Button>
							<Button></Button>
							<Button></Button>
						</FlexCol>
					</Box>
					<Box>
						<FlexCol stretch style={{ height: "100%" }}>
							<Button></Button>
							<Button></Button>
							<Button></Button>
							<Button></Button>
						</FlexCol>
					</Box>
					<Box>
						<FlexCol stretch style={{ height: "100%" }}>
							<Button></Button>
							<Button></Button>
							<Button></Button>
							<Button></Button>
						</FlexCol>
					</Box>
				</FlexRow>
				<FlexRow stretch>
					<Button>&lt;</Button>
					<Button>Hexagons</Button>
					<Button>Sunstripes</Button>
					<Button>Glühbirne</Button>
					<Button>Moving Heads</Button>
					<Button>Hexagons</Button>
					<Button>Sunstripes</Button>
					<Button>Glühbirne</Button>
					<Button>Moving Heads</Button>
					<Button>&gt;</Button>
				</FlexRow>
			</FlexCol>
		</>
	)
}

export default App
