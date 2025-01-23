import Link from 'next/link';

export default function NavBtn({ title, closed, delay, closeFn }) {
	return (
		<Link href={title.split(' ')[0].toLowerCase()} onClick={closeFn}>
			<button
				className={` relative bg-sand text-navy rounded-3xl w-56 h-10 text-right px-4 transition-all duration-150 ${
					closed ? `-right-64` : ` right-0`
				}`}
				style={{ transitionDelay: `${delay * 50}ms` }}
			>
				{title}
			</button>
		</Link>
	);
}
