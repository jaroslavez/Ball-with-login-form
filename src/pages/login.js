import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

import { fetchAccountData } from "../store/accountSlice";

import styles from '../../styles/login.module.scss';

import LoginLayout from "../components/LoginLayout";

import { LOGIN } from "../copyright";

export default function Login() {
    const {
        register,
        formState: {errors},
        handleSubmit,
        setError,
        clearErrors,
    } = useForm({
        criteriaMode: 'all'
    });

    const [IsPasswordShow, setIsPasswordShow] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    return (
        <form className={styles["login-form"]} onSubmit={preHandleSubmit}>
            <h1>{LOGIN.title}</h1>
            <ErrorMessage 
                errors={errors} 
                name="server-problem" 
                render={({message}) => <span className={styles["login-form__error-message"]}>{message}</span>}
            />
            <label>{LOGIN.name}</label>
            <input className={styles["login-form__input"]} {...register("username", {
                required: LOGIN.required,
                minLength: {
                    value: 4,
                    message: LOGIN.smallName,
                },
                maxLength: {
                    value: 15,
                    message: LOGIN.largeName,
                }
            })}/>

            <ErrorMessage 
                errors={errors} 
                name="username" 
                render={({message}) => <span className={styles["login-form__error-message"]}>{message}</span>}
            />

            <label>{LOGIN.password}</label>
            <input className={`${styles["login-form__input"]} ${styles["login-form__input_password"]}`} 
                type={IsPasswordShow ? "text" : "password"} 
                {...register("password", {
                    required: LOGIN.required,
                    minLength: {
                        value: 8,
                        message: LOGIN.smallPassword,
                    },
                    maxLength: {
                        value: 20,
                        message: LOGIN.largePassword,
                    }
                    })
                }
            />

            <ErrorMessage 
                errors={errors} 
                name="password" 
                render={({message}) => <span className={styles["login-form__error-message"]}>{message}</span>}
            />

            <div className={styles["checkbox-wrapper"]}>
                <input className={styles["checkbox-wrapper__checkbox"]} type="checkbox" onChange={() => setIsPasswordShow(state => !state)}/>
                <label>{LOGIN.showPassword}</label>
            </div>

            <input className={styles["login-form__submit-btn"]} type="submit" />
        </form>
    );

    function preHandleSubmit(e) {
        clearErrors("server-problem");
        const func = handleSubmit(onSubmit);
        func(e);
    }

    async function onSubmit(data) {
        try{
            await dispatch(fetchAccountData(JSON.stringify(data))).unwrap();
            setCookie("auth", true);
            router.push('/');
        }
        catch(e) {
            const error = e.response.status;
            if(error === 400){
                setError("server-problem", {
                    type: 'server',
                    message: LOGIN.wrongPassOrName,
                })
            }
            else {
                setError("server-problem", {
                    type: 'server',
                    message: LOGIN.undefinedError,
                })
            }
        }
        
    }
}

Login.getLayout = function getLayout(page) {
    return (
        <LoginLayout>
            {page}
        </LoginLayout>
    )
} 