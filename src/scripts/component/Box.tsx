import {iProps} from "./Component.tsx";

export interface iBoxProps extends iProps {
	onClick?: () => void,
	size?: string;
}

export default function Box(props: iBoxProps) {

	const className = "box"
		+ (props.className ? (" " + props.className) : "")
		+ (props.size ? (" box--" + props.size) : "");

	return (
		<div className={className} style={props.style} onClick={props.onClick}>
			{props.children}
		</div>
	)
}
