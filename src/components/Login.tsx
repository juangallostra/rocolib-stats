import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form'
import React from 'react';

interface LoginProps {
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}
interface userCreds {
    username: string;
    password: string;
}

async function loginUser(credentials: userCreds) {
    return fetch(
        'https://rocolib.herokuapp.com/api/v1/user/auth',
        // 'http://localhost:5050/api/v1/user/auth',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
    )
        .then(data => data.json())
}

export default function Login({ setToken, setUsername }: LoginProps) {

    const handleSubmit = async (creds: userCreds) => {
        const resp = await loginUser({
            ...creds
        });
        setToken(resp.token);
        setUsername(creds.username);
    }

    const form = useForm(
        {
            initialValues: {
                username: '',
                password: ''
            },
            validate: {
                username: (value) => value !== "" && value.length > 0 ? null : 'Username cannot be empty',
                password: (value) => value !== "" && value.length > 0 ? null : 'Password cannot be empty',
            }
        }
    )

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput withAsterisk label={"Username"} type={'text'} {...form.getInputProps('username')} />
            <TextInput withAsterisk label={"Password"} type={"password"} {...form.getInputProps('password')} />
            <div>
                <Button type={'submit'} mt={10}>
                    Submit
                </Button>
            </div>
        </form>
    )
}