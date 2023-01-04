//Firstly, 让firebase可以CRUD to the db
import {initializeApp} from 'firebase/app'

//这是一些Authentication的方法
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithRedirect, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

//doc 从db中拿取document， getDoc setDoc从document中拿取data
import {
    getFirestore, 
    doc, 
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCqiyb6gUkwDPH7DcpSGFEuHnqeekeU904",
    authDomain: "llll-d7f4b.firebaseapp.com",
    projectId: "llll-d7f4b",
    storageBucket: "llll-d7f4b.appspot.com",
    messagingSenderId: "283803901674",
    appId: "1:283803901674:web:021607faf808dc47fa8193"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);



const googleProvider= new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt:'select_account'
})

export const auth= getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth,googleProvider)
export const signInWithGoogleRedirect= ()=> signInWithRedirect(auth,googleProvider)

export const db= getFirestore()

//1.collection的关键字 2.the actual doc that we want to add（json object）
export const addCollectionAndDocuments=async(collectionKey,objectsToAdd)=>{
    //在db这个database中找一个关键字叫collectionKey的，没有的话，firebase自动创建一个空的
    const collectionRef=collection(db, collectionKey)
    const batch=writeBatch(db)

    objectsToAdd.forEach((object)=>{
        const docRef=doc(collectionRef,object.title.toLowerCase())
        //在docRef这个地方，传进去真正的object
        batch.set(docRef, object)
    })
    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments=async()=>{
    const collectionRef=collection(db,'categories')
    const q=query(collectionRef)

    const querySnapshot= await getDocs(q)
    const categoryMap= querySnapshot.docs.reduce((acc,docSnapshot)=>{
        const {title,items}=docSnapshot.data()
        acc[title.toLowerCase()]=items
        return acc
    },{})
    return categoryMap
}
/* 
{
    hats:{
        title:'hats',
        items:[
            {},
            {}
        ]
    }
}
*/

//建一个Users的document
export const createUserDocumentFromAuth= async (userAuth, additionalInformation={})=>{
    if(!userAuth) return;

    const userDocRef= doc(db, 'users', userAuth.uid)

    const userSnapshot= await getDoc(userDocRef)
    
    console.log(userSnapshot);
    console.log(userSnapshot.exists()); //在数据库中是否有引用/数据库是否存在

    //检查快照data是否存在 如果不存在，则在database中建立
    if(!userSnapshot.exists()){
        const {displayName, email}= userAuth
        const createdAt= new Date() //用户什么时候登录

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password)=>{
    if (!email || !password) return ;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
    if (!email || !password) return ;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser= async ()=> await signOut(auth)

//当authentication change时就会执行这个回调函数
export const onAuthStateChangedListener= (callback)=> onAuthStateChanged(auth, callback)


