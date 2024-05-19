'use client'
import { Banner } from './Components/Banner/Banner';
import { Promo } from './Components/Promo/Promo';
import { CardsList, CardsListSection } from './Components/CardsListSection/CardsListSection';
import Styles from './page.module.css'
// импортируем стили
// импортируем данные
import { useGetDataByCategory } from './api/api-hooks'
import { endpoints } from './api/config';
import { Preloader } from './Components/Preloader/Preloader';

export default function Home() {
	const popularGames = useGetDataByCategory(endpoints.games, 'popular')
	const newGames = useGetDataByCategory(endpoints.games, 'new')

	return (
		<main className='main'>
			{ popularGames&&newGames ? (
				<>
					<Banner />
					<CardsListSection id='popular' title='Популярные' data={popularGames} type='slider' />
					<CardsListSection id='new' title='Новые' data={newGames} type='slider'  />
					<Promo />
				</>
			) : (
			<Preloader/>
			)}
		</main>
	)
}
