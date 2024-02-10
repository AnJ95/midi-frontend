import Box from './box'

export default function Button(props) {

	const className = "button" + (props.className ? (" " + props.className) : "");

	return (
		<Box className={className} size={props.size}>
			{props.children}
		</Box>
	)
}
