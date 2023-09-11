import { useState } from "react";


export default function useRegisterForm() {
	const [name, setName] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [isError, setIsError] = useState<boolean>(false)

	return {
		inputs: [
			{
				type: "text",
				inputName: "Nome",
				inputId: "name",
				onChange: setName,
			},
			{
				type: "text",
				inputName: "E-mail",
				inputId: "email",
				onChange: setEmail,
			},
			{
				type: "password",
				inputName: "Senha",
				inputId: "password",
				onChange: setPassword,
			},
		],
		name,
		email,
		password,
		isError,
		setIsError
	};
}