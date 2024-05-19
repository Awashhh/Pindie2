'use client'
import Styles from './AuthForm.module.css';
import { useEffect, useState } from 'react';
import { authorize, isResponseOk, getMe } from '../../api/api-utilits';
import { endpoints } from '../../api/config';
import { useStore } from '../../store/app-store';

export const AuthForm = (props) => {
	const [authData, setAuthData] = useState({ email: '', password: '' })
	const [message, setMessage] = useState({ status: null, text: null })
	
	const authContext = useStore()

	const handleInput = e => {
		const newAuthData = authData
		newAuthData[e.target.name] = e.target.value
		setAuthData(newAuthData)
		console.log(authData)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const userData = await authorize(endpoints.auth, authData)
		if (isResponseOk(userData)) {
			authContext.login({ ...userData, id: userData._id }, userData.jwt)
			setMessage({ status: 'success', text: 'Вы авторизовались!' })
			console.log(message)
		} else {
			setMessage({ status: 'error', text: 'Неверные почта или пароль' })
			console.log(message)
		}
	}
	useEffect(() => {
		let timer
		if (authContext.user) {
			// Данные о user из контекста
			timer = setTimeout(() => {
				setMessage({ status: null, text: null })
				props.closePopup()
			}, 1000)
		}
		return () => clearTimeout(timer)
	}, [authContext.user]) // Данные о user из контекста

	return (
		<form className={Styles['form']} onSubmit={handleSubmit}>
			<h2 className={Styles['form__title']}>Авторизация</h2>
			<div className={Styles['form__fields']}>
				<label className={Styles['form__field']}>
					<span className={Styles['form__field-title']}>Email</span>
					<input
						className={Styles['form__field-input']}
						onInput={handleInput}
						name='email'
						type='email'
						placeholder='hello@world.com'
					/>
				</label>
				<label className={Styles['form__field']}>
					<span className={Styles['form__field-title']}>Пароль</span>
					<input
						className={Styles['form__field-input']}
						onInput={handleInput}
						name='password'
						type='password'
						placeholder='***********'
					/>
				</label>
			</div>
			<p className='form__message'>{message.text}</p>
			<div className={Styles['form__actions']}>
				<button className={Styles['form__reset']} type='reset'>
					Очистить
				</button>
				<button className={Styles['form__submit']} type='submit'>
					Войти
				</button>
			</div>
		</form>
	)
};
