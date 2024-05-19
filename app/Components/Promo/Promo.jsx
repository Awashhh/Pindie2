'use client';
import { useState, useEffect } from 'react'
import Styles from './Promo.module.css'
export const Promo = () =>{

  const [codeIsVisible, setcodeIsVisible] = useState(false);
  const handleButtonClick = () =>{
    setcodeIsVisible(!codeIsVisible);
  }

  useEffect(() => {
    let timeout;
    if (codeIsVisible){
     timeout = setTimeout(() =>{
      setcodeIsVisible(false);
      }, 5000);
    };
    return () => {
      clearTimeout(timeout);
    }
  }, [codeIsVisible]);

    return(
        <section className={Styles['promo']}>
            <div className={Styles['description-block']}>
              <h2 className={Styles['title']}>Твой промо-код</h2>
              <p className={Styles['description']}>Скидка на все курсы Яндекс Практикума для пользователей нашего сайта!</p>
              <button className={`${Styles['button']}`} onClick={handleButtonClick}>{codeIsVisible? 'WEBTEENS10' : 'Получить код'}</button>
            </div>
            <img src="./images/promo-illustration.svg" alt="Собака" className={Styles['image']}/>
          </section>
    )
}