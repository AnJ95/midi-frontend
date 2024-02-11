import Box from './Box'

export default function Button(props) {

	const className = "button"
		+ (props.className ? (" " + props.className) : "")
		+ (props.pressed ? (" button--pressed") : "");

	return (
		<Box className={className} size={props.size} onClick={props.onClick}>
			{props.children}
		</Box>
	)
}
