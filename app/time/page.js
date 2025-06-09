'use client';
import SelectionMenu from '@/components/ChordSelection';
import ChordBox from '@/components/ChordBox';
import { useState } from 'react';
import Info from '@/lib/chords.json';
import ChordTemplate from '@/components/ChordTemplate';

export default function TimeTrial() {
	const [list, setList] = useState([]);
	const [chords, setChords] = useState([
		{ cName: 'A', strings: [-1, 0, 2, 2, 2, 0], fret: 0 },
		{ cName: 'Am', strings: [-1, 0, 2, 2, 1, 0], fret: 0 },
		{ cName: 'Asus', strings: [-1, 0, 2, 2, 3, 0], fret: 0 },
	]);
	const [practicing, setPracticing] = useState(false);
	const [currIndex, setCurrIndex] = useState(0);
	const [timeInt, setTimeInt] = useState(5000);
	const [timer, setTimer] = useState(null);
	const [order, setOrder] = useState('ordered');
	const [paused, setPaused] = useState(false);

	const addToList = e => {
		if (chords[0].strings != null) {
			let index = chords.findIndex(c => {
				return e.target.textContent == c.cName;
			});
			setList([...list, chords[index]]);
		} else {
			let index = Info.findIndex(c => {
				return e.target.textContent == c.cName;
			});
			setList([...list, Info[index]]);
		}
	};

	const changeFamily = letter => {
		let tempArr = [];

		Info.map(c => {
			if (c.cName[0] === letter.toUpperCase()) {
				tempArr.push(c);
			}
		});

		setChords(tempArr);
	};

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1)); // Random index
			[array[i], array[j]] = [array[j], array[i]]; // Swap elements
		}
		return array;
	}

	function randomCycle() {
		setList(prevList => shuffleArray(prevList));

		setTimer(
			setInterval(() => {
				setCurrIndex(prevCurrIndex => {
					if (prevCurrIndex + 1 >= list.length) {
						return 0;
					} else {
						return prevCurrIndex + 1;
					}
				});
			}, timeInt)
		);
	}

	function orderedCycle() {
		// console.log(list[currIndex]);
		setTimer(
			setInterval(() => {
				setCurrIndex(prevCurrIndex => {
					if (prevCurrIndex + 1 >= list.length) {
						return 0;
					} else {
						return prevCurrIndex + 1;
					}
				});
			}, timeInt)
		);
	}

	return (
		<>
			{practicing ? (
				<>
					<section>
						<h3 className="font-serif text-navy text-center text-3xl">
							{list[currIndex].cName}
						</h3>
						<ChordTemplate
							chordData={list[currIndex].strings}
						/>
						<button
							className="font-serif text-navy border-navy border-4 bg-white text-xl rounded-md h-10 w-2/5"
							onClick={
								paused
									? () => {
											if (
												order === 'ordered'
											) {
												orderedCycle();
											} else {
												randomCycle();
											}
											setPaused(false);
									  }
									: () => {
											clearInterval(timer);
											setPaused(true);
									  }
							}
						>
							{paused ? 'PLAY' : 'PAUSE'}
						</button>
						<button
							className="font-serif text-rose-800 border-rose-800 border-4 bg-white text-xl rounded-md h-10 w-2/5 ml-12"
							onClick={() => {
								setPracticing(false);
								clearInterval(timer);
							}}
						>
							STOP
						</button>
					</section>
				</>
			) : (
				<>
					<div className="md:flex md:flex-row md:flex-wrap md:gap-4 md:justify-start w-full">
						<section className="md:w-2/5">
							<SelectionMenu
								data={chords}
								boxClickFn={addToList}
								changeFn={changeFamily}
							/>

							<article className="h-36 md:w-1/2">
								<h2 className="font-serif text-left text-navy text-xl w-full px-2">
									Current Selection:
								</h2>
								<div className="flex overflow-auto gap-2">
									{list.map((chord, i) => {
										return (
											<ChordBox
												chordName={
													chord.cName
												}
												clickFn={null}
												key={`${chord.cName}_${i}_selection`}
											/>
										);
									})}
								</div>
							</article>

							<article className="font-serif text-navy text-xl flex flex-col">
								<label htmlFor="ordered">
									<input
										type="radio"
										name="order-select"
										id="ordered"
										className="mr-4"
										onClick={() =>
											setOrder('ordered')
										}
									/>
									<p className="inline">Ordered</p>
								</label>
								<label htmlFor="randomized">
									<input
										type="radio"
										name="order-select"
										id="randomized"
										className="mr-4"
										onClick={() =>
											setOrder('random')
										}
									/>
									<p className="inline">
										Randomized
									</p>
								</label>

								<label htmlFor="interval">
									Time Interval:
								</label>
								<select
									name="interval"
									id="interval"
									className="bg-white text-navy w-2/5 h-8 my-2 font-serif text-lg"
									onChange={e => {
										setTimeInt(e.target.value);
									}}
								>
									<option value={5000}>5s</option>
									<option value={4000}>4s</option>
									<option value={3000}>3s</option>
									<option value={2000}>2s</option>
									<option value={1000}>1s</option>
									<option value={500}>0.5s</option>
									<option value={250}>0.25s</option>
									<option value={100}>0.1s</option>
								</select>
							</article>
						</section>
						<section className="md:w-1/5">
							<button
								className="font-serif text-navy border-navy border-4 bg-white text-xl rounded-md h-10 w-2/5"
								onClick={() => {
									if (list.length > 0) {
										setPracticing(true);
										if (order === 'ordered') {
											orderedCycle();
										} else {
											randomCycle();
										}
									} else {
										setPracticing(false);
									}
								}}
							>
								Go!
							</button>

							<button
								className="font-serif text-rose-800 border-rose-800 border-4 bg-white text-xl rounded-md h-10 w-2/5 ml-12"
								onClick={() => {
									setList([]);
								}}
								disabled={
									list.length > 0 ? false : true
								}
							>
								Clear
							</button>
						</section>
					</div>
				</>
			)}
		</>
	);
}
