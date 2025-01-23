export default function drawChord(data) {
	let muteHtml = [];
	let openHtml = [];
	let pressedHtml = [];
	data.strings.forEach((s, i) => {
		switch (s) {
			case -1:
				muteHtml.push(i * 40);
				break;
			case 0:
				openHtml.push(i * 40);
				break;
			default:
				pressedHtml.push({ x: i * 40, y: s * 60 });
				break;
		}
	});
	const svgCode = [muteHtml, openHtml, pressedHtml];
	return svgCode;
}
