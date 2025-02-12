'use client';

import ChordTemplate from '@/components/chord_template';
import { useState } from 'react';

export default function RunTrial({ chords, orderType }) {
	return (
		<>
			<ChordTemplate chordData={currChord} />
		</>
	);
}
