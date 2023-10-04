const requiredInputField = 'поле обязательно для заполнения'

const inputLengthMessage = 'введите от 6 до 50 символов'

export const nameValidation = {
	required: requiredInputField,
	pattern: {
		value: /^[^а-яА-Я]*$/,
		message: 'name не может содержать русские буквы',
	},
	// validate: (value: string) => {
	// 	if (value.match(/[а-яА-Я]/)) {
	// 		return 'name не может содержать русские буквы'
	// 	}
	// 	return true
	// },
	minLength: {
		value: 6,
		message: inputLengthMessage,
	},
	maxLength: {
		value: 50,
		message: inputLengthMessage,
	},
}

export const emailValidation = {
	required: requiredInputField,
	pattern: {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
		message: 'Неверный формат почты',
	},
	minLength: {
		value: 6,
		message: inputLengthMessage,
	},
	maxLength: {
		value: 50,
		message: inputLengthMessage,
	},
}

export const passwordValidation = {
	required: requiredInputField,
	minLength: {
		value: 6,
		message: inputLengthMessage,
	},
	maxLength: {
		value: 50,
		message: inputLengthMessage,
	},
}
