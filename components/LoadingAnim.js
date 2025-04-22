import Image from 'next/image';

export default function LoadingAnimation() {
	return (
		<div>
			<Image
				src="/guitar_pick.svg"
				width={100}
				height={100}
				alt="Guitar Dojo Logo"
			/>
			<p>Loading...</p>
		</div>
	);
}
