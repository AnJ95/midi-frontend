
function Flex(props) {
	const className = "flex"
		+ (props.className ? (" " + props.className) : "")
		+ (props.direction ? (" flex--" + props.direction) : "")
		+ (props.stretch ? (" flex--stretch") : "");

	return (
		<div style={props.style} className={className}>
			{props.children}
		</div>
	)
}

export function FlexRow(props) {
	return (
		<Flex style={props.style} direction="row" {...props} />
	)
}

export function FlexCol(props) {
	return (
		<Flex style={props.style} direction="column" {...props} />
	)
}