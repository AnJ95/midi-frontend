export default function Box(props) {

	const className = "box"
		+ (props.className ? (" " + props.className) : "")
		+ (props.size ? (" box--" + props.size) : "");

	return (
		<div className={className}>
			{props.children}
		</div>
	)
}
