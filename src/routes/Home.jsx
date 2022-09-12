
import { useState } from "react";
import { useEffect } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { errorFirebase } from "../utils/errorFirebase"

import Button from "../components/Button";
import Perfil from "./Perfil";
import Title from "../components/Title";

const Home = () => {
    
    const {data, error, loading, getDat, addData,deleteData, updateData} = useFirestore()
    const [text, setText] = useState('')
    const [newOriginID, setNewOriginID] = useState();

    useEffect(() => {
        getDat()
    }, [])

    if(loading.getDat){
        return <p>Loading data...</p>
    }
    if(error){
        return <p>{error}</p>
    }

    const pathURL = window.location.href;

    const handleSubmit = async ({ url }) => {
        try {
            if (newOriginID) {
                await updateData(newOriginID, url);
                setNewOriginID("");
            } else {
                await addData(url);
            }
            resetField("url");
        } catch (error) {
            const { code, message } = errorFirebase(error.code);
            setError(code, { message });
        }
    };
    const handleClickDelete = async (nanoid) => {
        console.log("click delete");
        await deleteData(nanoid);
    };

    const handleClickEdit = (item) => {
        setValue("url", item.origin);
        setNewOriginID(item.nanoid);
    };
    

    return (
        <>

            <Title text='HOME'/>

            <form type="text" onSubmit={handleSubmit}>
                <input className="border-2 m-2"
                    type="text" 
                    placeholder="insert text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                />
                {newOriginID ? (
                    <Button
                        type="submit"
                        text="EDIT URL"
                        color="yellow"
                        loading={loading.updateData}
                    />
                ) : (
                    <Button
                        type="submit"
                        text="ADD URL"
                        color="blue"
                        loading={loading.addData}
                    />
                )}
            </form>

            {
                data.map (item => (
                    <div
                    key={item.nanoid}
                    className="p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-2"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {pathURL}
                        {item.nanoid}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {item.origin}
                    </p>
                    <div className="flex space-x-2">
                        <Button
                            type="button"
                            text="Delete"
                            color="red"
                            loading={loading[item.nanoid]}
                            onClick={() => handleClickDelete(item.nanoid)}
                        />
                        <Button
                            type="button"
                            text="Edit"
                            color="yellow"
                            onClick={() => handleClickEdit(item)}
                        />
                    </div>
                </div>
                ))
            }
            <Perfil></Perfil>
        </>
    );
};

export default Home;