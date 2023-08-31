import { useState } from "react";

export default function useLoginForm() {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [isError, setIsError] = useState<boolean>(false)

	return {
		inputs: [
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
		email,
		password,
		isError,
		setIsError
	};
}
