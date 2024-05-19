'use client'
import { CardsListSection } from '../Components/CardsListSection/CardsListSection'
import { endpoints } from '../api/config'
import { useGetDataByCategory } from '../api/api-hooks'
import { Preloader } from '../Components/Preloader/Preloader'

export default function Popular() {
	const popularGames = useGetDataByCategory(endpoints.games, 'popular')

		return (
			<main className='main-inner'>
				{popularGames ? (
					<CardsListSection id='Popular' title='Popular' data={popularGames} />
				) : (
					<Preloader />
				)}
			</main>
		)
}
