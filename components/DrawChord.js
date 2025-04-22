export default function RenderSymbols({ strings }) {
	// console.log(strings);
	return (
		<svg>
			{strings.map((string, i) => {
				if (string === -1) {
					return (
						<path
							d={`M${8 + i * 40},30L${36 + i * 40},2M${
								8 + i * 40
							},2l28,28`}
							fill="none"
							stroke="#3b3561"
							strokeWidth="4"
							key={i}
						/>
					);
				} else if (string === 0) {
					return (
						<circle
							cx={`${i * 40 + 22}`}
							cy="16.5"
							r="12"
							fill="none"
							stroke="#3b3561"
							strokeWidth="4"
							key={i}
						/>
					);
				} else {
					return (
						<circle
							cx={`${i * 40 + 22}`}
							cy={`${string * 60 + 6}`}
							r="14"
							fill="#3b3561"
							key={i}
						/>
					);
				}
			})}
		</svg>
	);
}
