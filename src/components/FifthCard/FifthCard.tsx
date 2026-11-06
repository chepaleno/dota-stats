
import "./FifthCard.css";
interface fifthCardStats {
  totalStats: any;
}

const FifthCard = (props: fifthCardStats) => {
  const { totalStats } = props;
  return (
    <div className="thirdCardMain">
      <h3>💥Влияние на игру💥</h3>
      <div>Общие показатели:</div>
      <div className="statskda">
        <div className="kills">{"⚔️ " + Math.trunc(totalStats.heroDamage) + " HERO DAMAGE"}</div>
        <div className="deaths">{"🏰 " + Math.trunc(totalStats.towerDamage) + " TOWER DAMAGE"}</div>
        <div className="assists">{"❤️ " + totalStats.healing + " HEAL"}</div>
        <div className="kda">{"🎯 " + Math.trunc(totalStats.pings) + " PINGS PER MATCH"}</div>
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

export default FifthCard;
