
import { useState } from "react";
import { useEffect } from "react";
import Title from "../components/Title";
import { useFirestore } from "../hooks/useFirestore";
import Perfil from "./Perfil";

const Home = () => {
    
    const {data, error, loading, getDat, addData} = useFirestore()
    const [text, setText] = useState('')
    

    useEffect(() => {
        getDat()
    }, [])

    if(loading.getDat){
        return <p>Loading data...</p>
    }
    if(error){
        return <p>{error}</p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        addData(text)
        setText('')
    }

    return (
        <>

            <Title text='HOME'/>

            <form type="text" onSubmit={handleSubmit}>
                <input type="text" placeholder="insert text" value={text} onChange={(e) => setText(e.target.value)} />
                <button type="submit" >add url</button>
            </form>

            {
                data.map (item => (
                    <div key={item.nanoid}>
                        <p>{item.nanoid}</p>
                        <p>{item.origin}</p>
                        <p>{item.uid}</p>
                    </div>
                ))
            }
            <Perfil></Perfil>
        </>
    );
};

export default Home;