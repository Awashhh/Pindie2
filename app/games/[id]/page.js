'use client'
import { useRouter } from "next/navigation";
import Styles from "./Game.module.css";
import Definded from '../../Components/Definded/Definded.jsx';
import { useEffect, useState, useContext } from "react";
import { getNormalizedGameDataById, isResponseOk, getMe, getJWT, removeJWT, checkIfUserVoted, vote } from '../../api/api-utilits'
import {endpoints} from '../../api/config'
import { Preloader } from "../../Components/Preloader/Preloader";
import { useStore } from "../../store/app-store";


export default function GamePage(props) {
  const [game, setGame] = useState(null);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isVoted, setIsVoted] = useState(false);
  const router = useRouter();
  const authContext = useStore();

  const handleVote = async () =>{
    const jwt = getJWT();
    let usersIdArray = game.users.length ? game.users.map((user)=> user.id) : [];
    usersIdArray.push(authContext.user.id)
    const  response = await vote(`${endpoints.games}/${game.id}`, jwt, usersIdArray);
    if (isResponseOk(response)) {
      setIsVoted(true);
    }
    setGame(()=> {
      return {
        ...game,
        users: [...game.users, authContext.user]
      }
    })
  }

  useEffect(() => {
    async function fetchData() {
      setPreloaderVisible(true);
      const game = await getNormalizedGameDataById(endpoints.games, props.params.id);
      isResponseOk(game) ? setGame(game) : setGame(null);
      setPreloaderVisible(false)
    }
    fetchData();
  }, []);

  useEffect(() => {
    authContext.user && game ? setIsVoted(checkIfUserVoted(game, authContext.user.id)) : setIsVoted(false)
  }, [authContext.user, game])

  return (
    game ? (
      <main className="main">
        <section className={Styles["game"]}>
          <iframe
            className={Styles["game__iframe"]}
            src={game.link}
          ></iframe>
        </section>
        <section className={Styles["about"]}>
          <h2 className={Styles["about__title"]}>{game.title}</h2>
          <div className={Styles["about__content"]}>
            <p className={Styles["about__description"]}>{game.description}</p>
            <div className={Styles["about__author"]}>
              <p>
                Автор:
                <span className={Styles["about__accent"]}>{game.developer}</span>
              </p>
            </div>
          </div>
          <div className={Styles["about__vote"]}>
            <p className={Styles["about__vote-amount"]}>
              За игру уже проголосовали:
              <span className={Styles["about__accent"]}>{game.users.length}</span>
            </p>
            <button className={`button ${Styles["about__vote-button"]}`} disabled={!authContext.isAuth || isVoted} onClick={handleVote}>
               {isVoted ? "Голос учтен" : "Голосовать"}
            </button>
          </div>
        </section>
      </main>
    ) : preloaderVisible ? (
        <Preloader/>
    ) : (
      <Definded />
    )
  );
}