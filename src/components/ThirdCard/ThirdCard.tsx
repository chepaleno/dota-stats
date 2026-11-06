import "./ThirdCard.css";
interface thirdCardStats {
  totalStats: any;
}

const ThirdCard = (props: thirdCardStats) => {
  const { totalStats } = props;
  return (
    <div className="thirdCardMain">
      <h3>⚔️Боевая немощь⚔️</h3>
      <div>Общие показатели:</div>
      <div className="statskda">
        <div className="kills">{"⚔️ " + totalStats.kills + " KILLS"}</div>
        <div className="deaths">{"💀 " + totalStats.deaths + " DEATHS"}</div>
        <div className="assists">{"🤝 " + totalStats.assists + " ASSISTS"}</div>
        <div className="kda">{"🏆 " + totalStats.kda + " KDA"}</div>
      </div>
      <div className="grass">Потрогайте траву🙏</div>

      {/* <img className="secondAvatar" src={totalStats?.avatar} />
      <div className="nickNameSecondDiv">
        <span>{totalStats?.name}</span>
        <span className="afterName">Ваш брат по оружию</span>
      </div>
      <div className="fraza">Совместные показатели:</div>
      <div className="winLoseAllSecond">
        <div>{totalStats?.with_win ? `${totalStats?.with_win} W` : null}</div>
        <div>{totalStats?.with_games ? `${totalStats?.with_games} All` : null}</div>
        <div>{totalStats?.with_lose ? `${totalStats?.with_lose} L` : null}</div>
      </div>
      <div className="secondWinrate">{totalStats?.with_win ? `${totalStats?.wr}%` : null}</div> */}
      {/* <div className="fraza">Вы отличная команда</div> */}
    </div>
  );
};

export default ThirdCard;
