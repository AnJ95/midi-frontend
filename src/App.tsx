import Box from './scripts/component/Box.tsx'
import Button from './scripts/component/Button.tsx'
import PresetManager from './scripts/component/PresetManager.tsx'
import SocketDebug from './scripts/component/SocketDebug.tsx'
import {FlexCol, FlexRow} from './scripts/component/Flex.tsx'
import FaderManager from "./scripts/component/FaderManager.tsx";

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
                <FaderManager/>
            </FlexCol>
        </>
    )
}

export default App