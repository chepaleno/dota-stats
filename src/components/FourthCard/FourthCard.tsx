
import "./FourthCard.css";
interface fourthCardStats {
  totalStats: any;
}

const FourthCard = (props: fourthCardStats) => {
  const { totalStats } = props;
  return (
    <div className="thirdCardMain">
      <h3>💰Фарм и Экономика💰</h3>
      <div>Общие показатели:</div>
      <div className="statskda">
        <div className="kills">{"💰 " + Math.trunc(totalStats.gpm * (totalStats.duration / 60)) + " GOLD"}</div>
        <div className="deaths">{"⭐ " + Math.trunc(totalStats.xpm * (totalStats.duration / 60)) + " XP"}</div>
        <div className="assists">{"⚔️ " + totalStats.lastHits + " LAST HITS"}</div>
        <div className="kda">{"🎯 " + totalStats.denies + " DENIES"}</div>
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

export default FourthCard;
