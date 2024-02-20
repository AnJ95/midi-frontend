import PresetManager from './scripts/component/PresetManager.tsx'
import SocketDebug from './scripts/component/SocketDebug.tsx'
import {FlexCol, FlexRow} from './scripts/component/Flex.tsx'
import FaderManager from "./scripts/component/FaderManager.tsx";
import HoldActionManager from "./scripts/component/HoldActionManager.tsx";
import SelectWheel, {SelectWheelOption} from "./scripts/component/SelectWheel.tsx";

function App() {
    return (
        <>
            <FlexCol stretch gap="lg">
                <div style={{display: "none"}}>
                    <SocketDebug/>
                </div>
                <PresetManager/>
                <HoldActionManager/>
                <FlexRow stretch>
                    <div></div>
                    <SelectWheel text="Farbe" style={{width: "25vw"}}
                                 onSelected={(o) => console.log(o)}>
                        <SelectWheelOption text="red" color="red" icon="rave"/>
                        <SelectWheelOption text="green" color="green" icon="rave"/>
                        <SelectWheelOption text="blue" color="blue" icon="rave"/>
                        <SelectWheelOption text="lime" color="lime" icon="rave"/>
                        <SelectWheelOption text="purple" color="purple" icon="rave"/>
                        <SelectWheelOption text="pink" color="pink" icon="rave"/>
                    </SelectWheel>
                    <div></div>
                </FlexRow>
                <FaderManager/>
            </FlexCol>
        </>
    )
}

export default App