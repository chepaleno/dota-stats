
import "./SixthCard.css";
interface sixsthCardStats {
  totalStats: any;
}

const SixthCard = (props: sixsthCardStats) => {
  const { totalStats } = props;
  return (
    <div className="thirdCardMain">
      <h3>⏱️Время в матчах⏱️</h3>
      <div>Общие показатели:</div>
      <div className="statskda">
        <div className="kills">{"⏱️ " + Math.trunc(totalStats.duration) + " секунд"}</div>
        <div className="deaths">{"⏳ " + Math.trunc(totalStats.duration / 60) + " минут"}</div>
        <div className="assists">{"🕒 " + Math.trunc(totalStats.duration / 3600) + " часов"}</div>
        <div className="kda">{"🗓️ " + Math.trunc((totalStats.duration * 100) / 31536000) + "% от армии"}</div>
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

export default SixthCard;
