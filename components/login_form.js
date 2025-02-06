'use client';
import { auth, db } from '@/lib/firebaseconfig.js';
import { setDoc, doc } from 'firebase/firestore';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';

export default function LoginOrSignup() {
	// console.log(db);
	const router = useRouter();
	const [email, setEmail] = useState(null);
	const [pass, setPass] = useState(null);
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [username, setUsername] = useState(null);
	const [useSignup, setUseSignup] = useState(false);
	const emailExp =
		/^[a-zA-Z1-9._-]{2,}[.]?[a-zA-Z1-9._-]?[@]{1}[a-zA-Z1-9_-]{2,}[.]{1}[ca|com]{1}$]/;

	const login = () => {
		//check form vailidity
		if (emailExp.test(email) || pass.trim() == '') {
			alert(
				'Invalid email and/or password. Please check your input and try again'
			);
			return;
		}
		console.log(email, pass);
		signInWithEmailAndPassword(auth, email, pass)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user;
			})
			.catch(error => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(`code:${errorCode} msg:${errorMessage}`);
			});
	};

	const signUp = () => {
		if (
			email.trim() === '' ||
			pass.trim() === '' ||
			firstName.trim() === '' ||
			lastName.trim() === '' ||
			username.trim() === ''
		) {
			return;
		}
		createUserWithEmailAndPassword(auth, email, pass)
			.then(userCredential => {
				// Signed up
				const user = userCredential.user;
				console.log(`${userCredential}: signed up`);
				addUserInfo(user.uid);
			})
			.catch(error => {
				errorCode = error.code;
				errorMessage = error.message;

				if (errorCode === 'auth/network-request-failed') {
					alert(
						'Network error. Please check your internet connection.'
					);
				} else if (errorCode === 'auth/email-already-in-use') {
					alert('This email is already in use.');
				} else {
					alert(`Error: ${errorCode} - ${errorMessage}`);
				}

				console.error(
					`SignUp Error: ${errorCode} - ${errorMessage}`
				);
			});
	};

	const addUserInfo = async uid => {
		await setDoc(doc(db, 'users', uid), {
			name_first: firstName,
			name_last: lastName,
			username: username,
			email: email,
		});
	};

	useEffect(() => {
		if (typeof window === 'undefined') return; // Prevent server-side execution

		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				// Redirect to homepage if the user is already logged in
				router.push('/user_account');
			}
		});

		return () => unsubscribe(); // Cleanup listener on unmount
	}, [router]);

	return (
		<main className="w-full bg-sand h-screen mx-auto pt-12">
			<section>
				{useSignup ? (
					<>
						<label
							className="block font-serif text-navy text-xl mt-4 w-3/5 mx-auto"
							htmlFor="name_first"
						>
							First Name:
						</label>
						<input
							type="name_first"
							id="name_first"
							name="name_first"
							className="w-3/5 h-8 text-lg block rounded-md mx-auto p-2 text-navy"
							autoComplete="off"
							onChange={e => {
								setFirstName(e.target.value);
							}}
						/>
						<label
							className="block font-serif text-navy text-xl mt-4 w-3/5 mx-auto"
							htmlFor="name_last"
						>
							Last Name:
						</label>
						<input
							type="name_last"
							id="name_last"
							name="name_last"
							className="w-3/5 h-8 text-lg block rounded-md mx-auto p-2 text-navy"
							autoComplete="off"
							onChange={e => {
								setLastName(e.target.value);
							}}
						/>
						<label
							className="block font-serif text-navy text-xl mt-4 w-3/5 mx-auto"
							htmlFor="username"
						>
							Username:
						</label>
						<input
							type="username"
							id="username"
							name="username"
							className="w-3/5 h-8 text-lg block rounded-md mx-auto p-2 text-navy"
							autoComplete="off"
							onChange={e => {
								setUsername(e.target.value);
							}}
						/>
					</>
				) : (
					''
				)}

				<label
					className="block font-serif text-navy text-xl mt-4 w-3/5 mx-auto"
					htmlFor="email"
				>
					Email:
				</label>
				<input
					type="email"
					id="email"
					name="email"
					className="w-3/5 h-8 text-lg block rounded-md mx-auto p-2 text-navy"
					autoComplete="off"
					onChange={e => {
						setEmail(e.target.value);
					}}
				/>
				<label
					className="block font-serif text-navy text-xl mt-4 w-3/5 mx-auto"
					htmlFor="password"
				>
					Password:
				</label>
				<input
					type="password"
					id="password"
					name="password"
					className="w-3/5 h-8 text-lg rounded-md block mx-auto p-2 text-navy"
					autoComplete="off"
					onChange={e => {
						setPass(e.target.value);
					}}
				/>
				<button
					className="block w-3/5 border-navy border-4 h-12 font-serif text-navy text-xl rounded-lg mx-auto my-6"
					onClick={e => {
						e.preventDefault();
						if (!useSignup) {
							login();
						} else {
							signUp();
						}
					}}
				>{`${useSignup ? 'Register' : 'Login'}`}</button>
			</section>
			{useSignup ? (
				<>
					<p className="font-serif text-navy text-m text-center">
						Already have an account?
					</p>
					<p
						className="font-serif text-navy text-m cursor-pointer text-center w-2/5 md:w-1/5 mx-auto border-2 border-navy rounded-md"
						onClick={() => {
							setUseSignup(!useSignup);
						}}
					>
						Login Here!
					</p>
				</>
			) : (
				<>
					<p className="font-serif text-navy text-m text-center">
						Don't have an account?
					</p>
					<p
						className="font-serif text-navy text-m cursor-pointer text-center border-2 border-navy w-2/5 md:w-1/5 mx-auto rounded-md"
						onClick={() => {
							setUseSignup(!useSignup);
						}}
					>
						Sign Up Here!
					</p>
				</>
			)}
		</main>
	);
}
