import { auth, db } from '@/lib/firebaseconfig';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';

export default function SignIn() {
	signInWithEmailAndPassword(auth, email, password)
		.then(userCredential => {
			// Signed in
			const user = userCredential.user;
			// ...
		})
		.catch(error => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});

	return (
		<main>
			<form
				onSubmit={() => {
					console.log('submitted');
				}}
			>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" />
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" />
				<input type="submit">Login</input>
			</form>
		</main>
	);
}
