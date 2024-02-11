import Box from './scripts/component/Box.tsx'
import Button from './scripts/component/Button.tsx'
import PresetManager from './scripts/component/PresetManager.tsx'
import SocketDebug from './scripts/component/SocketDebug.tsx'
import {FlexCol, FlexRow} from './scripts/component/Flex.tsx'

function App() {
    return (
        <>
            <FlexCol stretch gap="lg">
                <SocketDebug/>
                <PresetManager/>
                <FlexRow stretch>
                    <Box>
                        <FlexCol stretch style={{height: "100%"}}>
                            <Button></Button>
                            <Button></Button>
                            <Button></Button>
                            <Button></Button>
                        </FlexCol>
                    </Box>
                    <Box>
                        <FlexCol stretch style={{height: "100%"}}>
                            <Button></Button>
                            <Button></Button>
                            <Button></Button>
                            <Button></Button>
                        </FlexCol>
                    </Box>
                    <Box>
                        <FlexCol stretch style={{height: "100%"}}>
                            <Button></Button>
                            <Button></Button>
                            <Button></Button>
                            <Button></Button>
                        </FlexCol>
                    </Box>
                    <Box>
                        <FlexCol stretch style={{height: "100%"}}>
                            <Button></Button>
                            <Button></Button>
                            <Button></Button>
                            <Button></Button>
                        </FlexCol>
                    </Box>
                    <Box>
                        <FlexCol stretch style={{height: "100%"}}>
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
