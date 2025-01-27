export default function UserAccount({ children }) {
	return (
		<>
			<Header></Header>
			<ChordsProvider>{children}</ChordsProvider>
			<footer className="bg-navy h-28 fixed bottom-0 w-screen">
				<Image
					src="/guitar_dojo_logo.png"
					width={175}
					height={100}
					alt="Guitar Dojo Logo"
				></Image>
				<Menu />
			</footer>
		</>
	);
}
