import { useState, useEffect } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { errorFirebase } from "../utils/errorFirebase"
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";

import Button from "../components/Button";
import Title from "../components/Title";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";


const Home = () => {
    
    const {patternURL, required} = formValidate()

    const {data, error, loading, getDat, addData,deleteData, updateData} = useFirestore()
    const [newOriginID, setNewOriginID] = useState();
    const [copy, setCopy] = useState({ propiedadX: true });

    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
        setError,
        setValue,
    } = useForm();

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

    const onSubmit = async ({ url }) => {
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

    const handleClickCopy = async (nanoid) => {
        await navigator.clipboard.writeText(window.location.href + nanoid);
        console.log("copiado");
        setCopy({ [nanoid]: true });
    };
    

    return (
        <>

            <Title text='HOME'/>

            <form  onSubmit={handleSubmit(onSubmit)}className="rounded-lg border">
            <FormInput
                    label="Ingresa tu URL"
                    type="text"
                    placeholder=" youtube.com "
                    {...register("url", {
                        required,
                        pattern: patternURL,
                    })}
                    error={errors.url}
                >
                    <FormError error={errors.url} />
                </FormInput>

                
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
                    className="p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-2 mt-4"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        
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
                        <Button
                            type ="button"
                            text={copy[item.nanoid] ? "Copied" : "Copy"}
                            color="purple"
                            onClick={() =>handleClickCopy(item.nanoid)}
                        >
                        </Button>
                    </div>
                </div>
                ))
            }
        </>
    );
};

export default Home;