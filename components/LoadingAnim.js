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
			<p className="text-navy font-serif text-lg">Loading...</p>
		</div>
	);
}
