import PresetManager from './scripts/component/PresetManager.tsx'
import SocketDebug from './scripts/component/SocketDebug.tsx'
import {FlexCol} from './scripts/component/Flex.tsx'
import FaderManager from "./scripts/component/FaderManager.tsx";
import HoldActionManager from "./scripts/component/HoldActionManager.tsx";

function App() {
    return (
        <>
            <FlexCol stretch gap="lg">
                <div style={{display: "none"}}>
                    <SocketDebug/>
                </div>
                <PresetManager/>
                <HoldActionManager/>
                <FaderManager/>
            </FlexCol>
        </>
    )
}

export default App