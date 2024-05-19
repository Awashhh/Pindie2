'use client'
import { CardsListSection } from "../Components/CardsListSection/CardsListSection";
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from '../Components/Preloader/Preloader'

export default function Tds() {
    const tdsGames = useGetDataByCategory(endpoints.games, 'TDS');
    
	return (
		<main className='main-inner'>
			{tdsGames ? (
				<CardsListSection id='tds' title='tds' data={tdsGames} />
			) : (
				<Preloader />
			)}
		</main>
	)
}