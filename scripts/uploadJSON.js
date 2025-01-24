const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin
const serviceAccount = require('./../guitar-dojo-7596e-firebase-adminsdk-fbsvc-6805acd853.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Import JSON Data
const importJsonToFirestore = async (filePath, collectionName) => {
	try {
		// Read JSON file
		const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

		// Use Firestore batch to upload data
		const batch = db.batch();

		// Iterate over each key in the JSON object
		Object.keys(data).forEach(docId => {
			const docRef = db.collection(collectionName).doc(docId); // Create a document with the key as the ID
			batch.set(docRef, data[docId]); // Set the document with the JSON content
		});

		// Commit the batch
		await batch.commit();
		console.log('Data imported successfully!');
	} catch (error) {
		console.error('Error importing data:', error);
	}
};

// Run the function
const filePath = './../lib/chords.json'; // Path to your JSON file
const collectionName = 'chords-general'; // Firestore collection name
importJsonToFirestore(filePath, collectionName);
