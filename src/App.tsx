import PresetManager from './scripts/component/PresetManager.tsx'
import SocketDebug from './scripts/component/SocketDebug.tsx'
import {FlexCol} from './scripts/component/Flex.tsx'
import FaderManager from "./scripts/component/FaderManager.tsx";

function App() {
    return (
        <>
            <FlexCol stretch>
                <div style={{display: "none"}}>
                    <SocketDebug/>
                </div>
                <PresetManager/>
                <FaderManager/>
            </FlexCol>
        </>
    )
}

export default App