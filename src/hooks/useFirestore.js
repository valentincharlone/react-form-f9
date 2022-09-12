import { collection, getDocs, query, setDoc, where, doc } from "firebase/firestore/lite"
import { useState } from "react"
import { db, auth } from "../firebase"
import { nanoid } from "nanoid"

export const useFirestore = () => {

    const [data, setData] = useState([])
    const [error,setError] = useState()
    const [loading, setLoading] = useState(false)

    

    const getDat = async () => {
        try {
            setLoading((prev) => ({ ...prev, addData: true }));
            const dataRef = collection(db, 'urls')
            const q = query(dataRef, where ("uid", "==", auth.currentUser.uid))
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map((doc) => doc.data())
            setData(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    const addData = async (url) => {
        try {
            setLoading((prev) => ({ ...prev, addData: true }));
            const newDoc = {
                enable: true,
                nanoid: nanoid(6),
                origin: url,
                uid: auth.currentUser.uid,
            };

            const docRef = doc(db, "urls", newDoc.nanoid);
            await setDoc(docRef, newDoc);
            setData([...data, newDoc]);
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading((prev) => ({ ...prev, addData: false }));
        }
    };

 
    return (
        {data, error, loading, getDat, addData}
    )
}
