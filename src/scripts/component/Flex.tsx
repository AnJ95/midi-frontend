import {iProps} from "./Component.tsx";

type direction = "row" | "column"

interface iFlexProps extends iFlexElemProps {
    direction: direction,
}

interface iFlexElemProps extends iProps {
    stretch: boolean,
    gap?: string
}

function Flex(props: iFlexProps) {
    const className = "flex"
        + (props.className ? (" " + props.className) : "")
        + (props.direction ? (" flex--" + props.direction) : "")
        + (props.stretch ? (" flex--stretch") : "")
        + (props.gap ? (" flex--gap--" + props.gap) : "");

    return (
        <div style={props.style} className={className}>
            {props.children}
        </div>
    )
}

export function FlexRow(props: iFlexElemProps) {
    return (
        <Flex style={props.style} direction="row" {...props} />
    )
}

export function FlexCol(props: iFlexElemProps) {
    return (
        <Flex style={props.style} direction="column" {...props} />
    )
}