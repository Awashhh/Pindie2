'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import Styles from './Header.module.css'
import { Overlay } from '../Overlay/Overlay';
import { Popup } from '../Popup/Popup';
import { AuthForm } from '../AuthForm/AuthForm';
import { useStore } from '../../store/app-store';

export const Header = () => {
  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const openPopup = () =>{
    setPopupIsOpened(true);
  };
  const closePopup = () =>{
    setPopupIsOpened(false);
  }
  const pathname = usePathname();
	
	const context = useStore();

	const handleLogout = () => {
		context.logout();
	}

	const switchTheme = () =>{
		context.setTheme(context.theme);
	}

  return (
		<header className={Styles['header']}>
			<div>
				{pathname === '/' ? (
					<div className='logo'>
						<img
							className={Styles['logo__image']}
							src='/images/logo.svg'
							alt='Логотип Pindie'
						/>
					</div>
				) : (
					<Link href='/' className={Styles['logo']}>
						<img
							className={Styles['logo__image']}
							src='/images/logo.svg'
							alt='Логотип Pindie'
						/>
					</Link>
				)}
			</div>
			<nav className={Styles['menu']}>
				<ul className={Styles['menu__list']}>
					<li className={Styles['menu__item']}>
						<Link
							href='/new'
							className={`${Styles['menu__link']} ${
								pathname === '/new' && Styles['menu__link_active']
							}`}
						>
							Новинки
						</Link>
					</li>
					<li className={Styles['menu__item']}>
						<Link
							href='/popular'
							className={`${Styles['menu__link']} ${
								pathname === '/popular' && Styles['menu__link_active']
							}`}
						>
							Популярные
						</Link>
					</li>
					<li className={Styles['menu__item']}>
						<Link
							href='/shooters'
							className={`${Styles['menu__link']} ${
								pathname === '/shooters' && Styles['menu__link_active']
							}`}
						>
							Шутеры
						</Link>
					</li>
					<li className={Styles['menu__item']}>
						<Link
							href='/runners'
							className={`${Styles['menu__link']} ${
								pathname === '/runners' && Styles['menu__link_active']
							}`}
						>
							Ранеры
						</Link>
					</li>
					<li className={Styles['menu__item']}>
						<Link
							href='/pixel'
							className={`${Styles['menu__link']} ${
								pathname === '/pixel' && Styles['menu__link_active']
							}`}
						>
							Пиксельные
						</Link>
					</li>
					<li className={Styles['menu__item']}>
						<Link
							href='/tds'
							className={`${Styles['menu__link']} ${
								pathname === '/tds' && Styles['menu__link_active']
							}`}
						>
							TDS
						</Link>
					</li>
				</ul>
				<div className={Styles['auth']}>
					{context.isAuth ? (
					<button className={`${Styles['auth__button']} ${popupIsOpened && Styles['auth__button__popupIsOpened']}`} onClick={handleLogout}>
						Выйти
					</button>
					) : (
					<button className={`${Styles['auth__button']} ${popupIsOpened && Styles['auth__button__popupIsOpened']}`} onClick={openPopup}>
						Войти
					</button>
					)
					}		
				</div>
			</nav>
			<Overlay isOpened={popupIsOpened} closePopup={closePopup} />
			<Popup isOpened={popupIsOpened} closePopup={closePopup}>
				<AuthForm closePopup={closePopup} />
			</Popup>
		</header>
	)
}
