import Box, { iBoxProps } from './Box'

interface iButtonProps extends iBoxProps {
	pressed?: boolean
}

export default function Button(props: iButtonProps) {

	const className = "button"
		+ (props.className ? (" " + props.className) : "")
		+ (props.pressed ? (" button--pressed") : "");

	return (
		<Box className={className} size={props.size} onClick={props.onClick}>
			{props.children}
		</Box>
	)
}
