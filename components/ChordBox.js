export default function ChordBox({ chordName, clickFn }) {
	return (
		<button
			className="border-navy rounded-md border-4 w-16 h-12 font-serif text-navy m-2"
			onClick={clickFn}
		>
			{chordName}
		</button>
	);
}
