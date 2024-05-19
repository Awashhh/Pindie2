'use client';
import { useRouter } from 'next/navigation';
import Styles from './AuthFormVote.module.css';

export default function AuthForm(){
  const router = useRouter();
  return (
    <form className={Styles['form']}>
      <h2 className={Styles['form__title']}>Авторизация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input className={Styles['form__field-input']} type="email" placeholder="hello@world.com"/>
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input className={Styles['form__field-input']} type="password" placeholder='***********'/>
        </label>
      </div>
      <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="button" onClick={()=> router.back()}>Назад</button>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Войти</button>
      </div>
    </form>
  ) 
};