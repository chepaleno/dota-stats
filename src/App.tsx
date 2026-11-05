import { useState } from "react";
import "./App.css";
import { search, deepSearch, getWinrate } from "./components/api/OpenDota";

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

function App() {
  const [playerName, setPlayerName] = useState<string>("dendi");
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
    // console.log(stats);
    // console.log(playerData.profile.account_id);

    // const playerWinrate = await getWinrate(playerData.profile.account_id);
    // console.log(playerWinrate);
  };
  const [playerBoard, setPlayerBoard] = useState([]);

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
        console.log(playerBoard);
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
      setIsLoading(false)
      setError("Ошибка при загрузке игрока")
      console.log("ошибка");
    }
  };

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
        {stats ? (
          <div>
            <div className="headerIconRank">
              <img className="avatar" src={stats?.avatar} />
              {stats.medal > 0 ? (
                <div className="rankAnd">
                  <img
                    className="medal"
                    src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${stats?.medal}.png`}
                    alt=""
                  />
                  <img
                    className="star"
                    src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_${stats?.star}.png`}
                    alt=""
                  />
                </div>
              ) : null}
            </div>
            <div className="nickNameDiv">{stats?.name}</div>
            <div className="bottomStats">
              <div className="winLoseAll">
                <div>{stats?.win ? `${stats?.win} W` : null}</div>
                <div>{stats?.games ? `${stats?.games} All` : null}</div>
                <div>{stats?.lose ? `${stats?.lose} L` : null}</div>
              </div>
              <div className="lastStats">
                <div className="winrate">
                  {stats?.win ? `${stats?.wr}%` : null}
                </div>
                <div className="winrate">
                  {" "}
                  {stats?.mmr ? Math.trunc(stats?.mmr) + " MMR" : "Нет рйтинга"}
                </div>
                <div className="winrate">
                  {stats?.dotaPlus ? "Гейб доволен" : "Гейб не доволен"}
                </div>
              </div>
            </div>
          </div>
        ) : null}
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
    </div>
  );
}

export default App;

//Микро Ивaшкa
