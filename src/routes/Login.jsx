import React from 'react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title'
import { UserContext } from '../context/UserProvider'
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import ButtonLoading from '../components/ButtonLoading'

const Login = () => {
    const { loginUser } = useContext(UserContext);
    const navegate = useNavigate();
    const { required, patternEmail, minLength, validateTrim } = formValidate();
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            setLoading(true)
            await loginUser(email, password);
            navegate("/");
        } catch (error) {
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        }
        finally{
            setLoading(false)
        }
    };

return (
    <>
        <Title text="Login" />
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                label="Ingresa tu correo"
                type="email"
                placeholder="Ingrese email"
                {...register("email", {
                    required,
                    pattern: patternEmail,
                })}
                error={errors.email}
            >
                <FormError error={errors.email} />
            </FormInput>

            <FormInput
                label="Ingresa contraseña"
                type="password"
                placeholder="Ingrese Password"
                {...register("password", {
                    minLength,
                    validate: validateTrim,
                })}
                error={errors.password}
            >
                <FormError error={errors.password} />
            </FormInput>
            {
                loading ? 
                <ButtonLoading></ButtonLoading>
                :
                <Button text="Login" type="submit" />

            }   
        </form>
    </>
  );
};

export default Login;