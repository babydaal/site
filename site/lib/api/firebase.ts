// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore, getDoc, getDocs, CollectionReference, query, where, Query, DocumentData, doc, limit } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence, signInAnonymously } from "firebase/auth"
import { ProductData } from "../src/models/product";
import { CartData } from "../src/models/cart";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAAoWmN1Y-BGCm9ITrearBcODXjvUDpJNo",
  authDomain: "babydaal-dev.firebaseapp.com",
  projectId: "babydaal-dev",
  storageBucket: "babydaal-dev.appspot.com",
  messagingSenderId: "291348022105",
  appId: "1:291348022105:web:27c58a0b8d564b4c14c248",
  measurementId: "G-8X8XMBPKDD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence).then(resp => {
  console.log('working with local storage.')
})

export interface GetProductsOpts {
  productIds: string[] | undefined
  onlyAvailable: boolean
}

export const signIn = async () => {
  return signInAnonymously(auth).then(user => {
    console.log(`signed in as uid=${user.user.uid}`)
    return user
  })
}

export const getCart = async (uid: string): Promise<CartData> => {
  const ref = doc(db, 'carts', uid)
  const snap = await getDoc(ref)
  if (snap.exists()) {
    return snap.data() as CartData
  } else {
    return { items: {}, pickup: null }
  }
}

export const getProducts = async (opts: GetProductsOpts = <GetProductsOpts>{}): Promise<ProductData[]> => {
  console.log('running getProducts, opts', opts)
  let col: Query<DocumentData>
  col = collection(db, 'products')
  if (opts.productIds && opts.productIds.length) {
     col = query(col, where('id', 'in', opts.productIds))
  }
  if (opts.onlyAvailable) {
    col = query(col, where('is_available', '==', true))
  }
  try {
    const res = await getDocs(col)
    return res.docs.map(d => {return {id: d.id, ...d.data()} as ProductData})
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getProductByName = async (name: string): Promise<ProductData> => {
  try {
    const res = await getDocs(
        query(
            collection(db, 'products'),
            where('name', '==', name.toLowerCase()),
            limit(1)
        )
    )
    if (res.empty) {
        throw new Error(`Product ${name} not found`)
    }
    const snap = res.docs[0]
    return {
        id: snap.id,
        ...snap.data()
    } as ProductData
  } catch (err) {
    console.error(err)
    throw new Error(`Product ${name} not found`)
  }
}

export const getProduct = async (id: string): Promise<ProductData> => {
  let snap = await getDoc(doc(db, `products/${id}`))
  return {id: snap.id, ...snap.data()} as ProductData
}