export default function ChordBox({ chordName, clickFn }) {
	return (
		<button
			onClick={clickFn}
			className="border-navy rounded-md border-4 w-16 h-12 font-serif text-navy"
		>
			{chordName}
		</button>
	);
}
