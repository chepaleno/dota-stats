import { useState } from "react";
import "./App.css";
import SecondCard from "./components/SecondCard/SecondCard";
import {
  search,
  deepSearch,
  getWinrate,
  getFriend,
  totals,
} from "./components/api/OpenDota";
import FirstCard from "./components/FirstCard/FirstCard";
import ThirdCard from "./components/ThirdCard/ThirdCard";
import FourthCard from "./components/FourthCard/FourthCard";
import FifthCard from "./components/FifthCard/FifthCard";
import SixthCard from "./components/SixthCard/SixthCard";

interface PlayerStats {
  name: string;
  mmr: number | null;
  dotaPlus: boolean;
  avatar: string;
  medal: number;
  star: number;
  win: number | null;
  lose: number | null;
  games: number | null;
  wr: number | null;
}

interface FriendStats {
  name: string;
  // mmr: number | null;
  // dotaPlus: boolean;
  avatar: string;
  // medal: number;
  // star: number;
  // win: number | null;
  // with_lose: number | null;
  with_games: number | null;
  with_win: number | null;
  with_lose: number | null;
  wr: number | null;
}

interface totalStats {
  kills: number | null;
  deaths: number | null;
  assists: number | null;
  kda: number | null;

  gpm: number | null;
  xpm: number | null;
  lastHits: number | null;
  denies: number | null;

  heroDamage: number | null;
  towerDamage: number | null;
  healing: number | null;

  // throwsGame:getTotalStats[0].sum
  // comebacks:getTotalStats[0].sum
  pings: number | null;
  duration: number | null;
}

function App() {
  const [playerName, setPlayerName] = useState<string>("Микро Ивaшкa");
  const [moreThanOneName, setMoreThanOneName] = useState<boolean>(false);
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchPlayerStats = async (playerData: any) => {
    const playerWinrate = await getWinrate(playerData.profile.account_id);

    const allGames = playerWinrate.win + playerWinrate.lose;

    function roundTo(num: number, decimals: number) {
      const factor = 10 ** decimals;
      return Math.round(num * factor) / factor;
    }

    setStats({
      name: playerData.profile.personaname,
      mmr: playerData.computed_mmr,
      dotaPlus: playerData.profile.plus,
      avatar: playerData.profile.avatarfull,
      medal: playerData.rank_tier
        ? Number(playerData.rank_tier.toString().split("")[0])
        : 0,
      star: playerData.rank_tier
        ? Number(playerData.rank_tier.toString().split("")[1])
        : 0,
      win: playerWinrate.win ? playerWinrate.win : null,
      lose: playerWinrate.lose ? playerWinrate.lose : null,
      games: allGames ? allGames : null,
      wr: roundTo((playerWinrate.win / allGames) * 100, 2),
    });

    const bestFriend = await getFriend(playerData.profile.account_id);
    setFriend({
      name: bestFriend.personaname,
      avatar: bestFriend.avatarfull,
      with_games: bestFriend.with_games,
      with_win: bestFriend.with_win,
      with_lose: bestFriend.with_games - bestFriend.with_win,
      wr: roundTo((bestFriend.with_win / bestFriend.with_games) * 100, 2),
    });

    const getTotalStats = await totals(playerData.profile.account_id);
    console.log(getTotalStats);
    setTotalStats({
      kills: getTotalStats[0].sum,
      deaths: getTotalStats[1].sum,
      assists: getTotalStats[2].sum,
      kda: roundTo(
        ((getTotalStats[0].sum + getTotalStats[2].sum) / getTotalStats[1].sum) *
          1,
        2,
      ),
      // (getTotalStats[0].sum + getTotalStats[2].sum) / getTotalStats[1].sum,
      // getTotalStats[3].sum,

      gpm: getTotalStats[4].sum / getTotalStats[4].n,
      xpm: getTotalStats[5].sum / getTotalStats[5].n,
      lastHits: getTotalStats[6].sum,
      denies: getTotalStats[7].sum,

      heroDamage: getTotalStats[11].sum,
      towerDamage: getTotalStats[12].sum,
      healing: getTotalStats[13].sum,
      pings: getTotalStats[23].sum / getTotalStats[23].n,

      // throwsGame:getTotalStats[0].sum,
      // comebacks:getTotalStats[0].sum,

      duration: getTotalStats[9].sum,
    });
    setNumberPage(1);
    // setFriend(
    //   friend
    // )
    // console.log(friend.personaname)
    // console.log(stats);
    // console.log(playerData.profile.account_id);

    // const playerWinrate = await getWinrate(playerData.profile.account_id);
    // console.log(playerWinrate);
  };
  const [playerBoard, setPlayerBoard] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [friend, setFriend] = useState<FriendStats | null>(null);
  const [totalStats, setTotalStats] = useState<totalStats | null>(null);
  console.log(totalStats);

  const onClickPlayerName = async () => {
    setIsLoading(true);
    setError("");
    setStats(null);
    try {
      const answer = await search(playerName);
      // console.log(answer);
      if (answer.length > 1) {
        setMoreThanOneName(true);
        setPlayerBoard(answer);
        // console.log(playerBoard);
        setIsLoading(false);
      }
      if (answer.length === 1) {
        const deepAnswer = await deepSearch(answer[0].account_id);

        await fetchPlayerStats(deepAnswer);

        // console.log(stats);
        // console.log(deepAnswer);
        setIsLoading(false);
      }
      if (answer.length === 0) {
        console.log("такого игрока нет");
        setIsLoading(false);
        setError("Такого игрока нет");
      }
    } catch (error) {
      setError("Что-то не так");
      setIsLoading(false);
    }
  };

  const onClickDeepSearch = async (item: number) => {
    setIsLoading(true);
    try {
      const deepAnswer = await deepSearch(item);
      await fetchPlayerStats(deepAnswer);

      setMoreThanOneName(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("Ошибка при загрузке игрока");
      console.log("ошибка");
    }
  };

  const backArrowClick = () => {
    if (numberPage > 1) {
      setNumberPage((prev) => prev - 1);
    } else {
      setNumberPage(6)
    }
  };

  const UpArrowClick = () => {
    if (numberPage < 6) {
      setNumberPage((prev) => prev + 1);
    } else {
      setNumberPage(1)
    }
  };
  let page;
  switch (numberPage) {
    case 1:
      page = 1;
      break;
    case 2:
      page = 2;
      break;
    case 3:
      page = 3;
      break;
    case 4:
      page = 4;
      break;
    case 5:
      page = 5;
      break;
    case 6:
      page = 6;
      break;
    default:
  }

  // console.log(numberPage);

  return (
    <div className="app-container">
      <h1>game stats</h1>
      <div className="search-bar">
        {" "}
        <input
          type="text"
          className="playerNameInput"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="введите ваш ник steam"
        />
        <button className="playerNameButton" onClick={onClickPlayerName}>
          ввести
        </button>
      </div>
      {isLoading ? <div className="Loading">Loading...</div> : null}
      {error ? <div className="Error">{error}</div> : null}

      <div className={`${stats ? "playerStats" : null}`}>
        {stats && page === 1 ? <FirstCard stats={stats} /> : null}
        {stats && page === 2 ? <SecondCard friend={friend} /> : null}
        {stats && page === 3 ? <ThirdCard totalStats={totalStats} /> : null}
        {stats && page === 4 ? <FourthCard totalStats={totalStats} /> : null}
        {stats && page === 5 ? <FifthCard totalStats={totalStats} /> : null}
        {stats && page === 6 ? <SixthCard totalStats={totalStats} /> : null}

        {/* <div className="navigate_arrows">
          <div className="arrow backArrow" onClick={backArrowClick}>⬅️</div>
          <div className="arrow upArrow" onClick={UpArrowClick}>➡️</div>
        </div> */}
      </div>
      <div>
        {moreThanOneName
          ? playerBoard.map(
              (
                item: {
                  account_id: number;
                  avatarfull: string;
                  personaname: string;
                },
                index,
              ) => (
                <div
                  key={index}
                  className="playerboard-row"
                  onClick={() => {
                    onClickDeepSearch(item.account_id);
                  }}
                >
                  <span>{index + 1 + " "}</span>
                  <img className="deepAvatar" src={item.avatarfull} />
                  <div className="personaName">{item.personaname}</div>
                </div>
              ),
            )
          : null}
      </div>
      {stats ? (
        <div className="navigate_arrows">
          <div className="arrow backArrow" onClick={backArrowClick}>
            ⬅️
          </div>
          <div className="point">
            <span className={`${page === 1 ? 'activePoint' : ''}`}>.</span>
            <span className={`${page === 2 ? 'activePoint' : ''}`}>.</span>
            <span className={`${page === 3 ? 'activePoint' : ''}`}>.</span>
            <span className={`${page === 4 ? 'activePoint' : ''}`}>.</span>
            <span className={`${page === 5 ? 'activePoint' : ''}`}>.</span>
            <span className={`${page === 6 ? 'activePoint' : ''}`}>.</span>
          </div>
          <div className="arrow upArrow" onClick={UpArrowClick}>
            ➡️
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;

// Микро Ивaшкa
// CoBYnyA
