export default function svgGroup(type, coords) {
	console.log(coords, type);
	if (type === 'muted') {
		return (
			<g>
				{coords.forEach(c => {
					<path
						d={`M${8 + c},30L${36 + c},2M${8 + c},2l28,28`}
						fill="none"
						stroke="#3b3561"
						strokeWidth="4"
					/>;
				})}
			</g>
		);
	} else if (type === 'open') {
		return (
			<g>
				{coords.forEach(c => {
					<circle
						cx={`${c + 22}`}
						cy="16.5"
						r="12"
						fill="none"
						stroke="#3b3561"
						strokeWidth="4"
					/>;
				})}
			</g>
		);
	} else {
		return (
			<g>
				{coords.forEach(c => {
					<circle
						cx={`${c.x + 22}`}
						cy={`${c.y + 6}`}
						r="14"
						fill="#3b3561"
					/>;
				})}
			</g>
		);
	}
}
