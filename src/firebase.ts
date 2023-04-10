// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {addDoc, collection, Firestore, getDocs, getFirestore, doc, onSnapshot} from 'firebase/firestore';
import {FacebookAuthProvider, getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env["REACT_APP_API_KEY"],
    authDomain: process.env["REACT_APP_AUTH_DOMAIN"],
    projectId: process.env["REACT_APP_PROJECT_ID"],
    storageBucket: process.env["REACT_APP_STORAGE_BUCKET"],
    messagingSenderId: process.env["REACT_APP_MESSAGING_SENDER_ID"],
    appId: process.env["REACT_APP_APP_ID"],
};

// Initialize Firebase
export const provider = new GoogleAuthProvider();
export const faceProvider = new FacebookAuthProvider();
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export enum collectionType {
    users = "users",
    trips = "trips"
}

export interface IStore {
    db: Firestore,
    setCollection: collectionType
}

export interface IFireUser {
    email: string | null,
    name: string | null,
    number: string | null;
    role: string | null,

}

export interface IFireTrip {
    driverId: string | null,
    driverName: string | null,
    origin: string | null,
    destination: string | null,
    passangersAmount: number | null,
    vehiclePlateNumber: string | null

}

export interface ISetStore {
    db: Firestore,
    setCollection: collectionType
    addUser?: IFireUser
    addTrip?: IFireTrip
}

export async function getFireStore({db, setCollection}: IStore) {
    const citySnapshot = await getDocs(collection(db, setCollection));
    return citySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))


}

// export async function getFireStore({db, setCollection}: IStore) {
//     const arrData: any = [];
//     const col = collection(db, "users")
//    const unsub = await  onSnapshot(col, (col) =>{
//         col.docs.forEach(elem =>{
//             arrData.push({
//                 id: elem.id,
//                 ...elem.data()
//             })
//        })
//    })
//   return arrData;
//
// }
export async function addFireStore({db, setCollection, addUser, addTrip}: ISetStore) {
    try {
        const citySnapshot = await addDoc(collection(db, setCollection), {...addUser, ...addTrip});
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}