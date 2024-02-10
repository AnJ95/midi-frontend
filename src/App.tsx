import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Box from './scripts/component/box.tsx'
import Button from './scripts/component/button.tsx'
import SocketDebug from './scripts/component/socketdebug.tsx'
import { FlexRow, FlexCol } from './scripts/component/flex.tsx'

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
		  	<FlexCol stretch gap="lg">
		  		<SocketDebug />
		  		<FlexCol stretch>
					<FlexRow stretch>
						<Button></Button>
						<Button></Button>
						<Button></Button>
						<Button></Button>
						<Button></Button>
						<Button></Button>
						<Button></Button>
						<Button></Button>
						<Button></Button>
					</FlexRow>
					<FlexRow stretch>
						<Button></Button>
						<Button></Button>
						<Button></Button>
						<Button></Button>
						<Button></Button>
						<Button></Button>
					</FlexRow>
				</FlexCol>
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
