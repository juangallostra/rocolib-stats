import { Button, TextInput, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import "./Login.css";

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
    "https://rocolib.onrender.com/api/v1/user/auth",
    // 'http://localhost:5050/api/v1/user/auth',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  ).then((data) => data.json());
}

export default function Login({ setToken, setUsername }: LoginProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (creds: userCreds) => {
    setIsLoading(true);
    const resp = await loginUser({
      ...creds,
    });
    setToken(resp.token);
    setUsername(creds.username);
    setIsLoading(false);
  };

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value !== "" && value.length > 0 ? null : "Username cannot be empty",
      password: (value) =>
        value !== "" && value.length > 0 ? null : "Password cannot be empty",
    },
  });

  return isLoading ? (
    <div className="loader-wrapper">
      <Loader size={"xl"}></Loader>
    </div>
  ) : (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        withAsterisk
        label={"Username"}
        type={"text"}
        {...form.getInputProps("username")}
      />
      <TextInput
        withAsterisk
        label={"Password"}
        type={"password"}
        {...form.getInputProps("password")}
      />
      <div>
        <Button type={"submit"} mt={10}>
          Submit
        </Button>
      </div>
    </form>
  );
}
