import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
	apiKey: "AIzaSyDSTyFYkQEf7va8A6HiQGIJMz5CVu1SPCE",
	authDomain: "crown-clothing-93667.firebaseapp.com",
	databaseURL: "https://crown-clothing-93667.firebaseio.com",
	projectId: "crown-clothing-93667",
	storageBucket: "crown-clothing-93667.appspot.com",
	messagingSenderId: "108358695920",
	appId: "1:108358695920:web:26875087d4df4390a3fb35",
	measurementId: "G-FZKCBN78NS"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`)

	const snapShot = await userRef.get()
	
	if (!snapShot.exists) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (e) {
			console.log('error', e.message);
		}
	}

	return userRef
}

firebase.initializeApp(config);
 
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account"})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;