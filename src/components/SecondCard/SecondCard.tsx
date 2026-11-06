import "./SecondCard.css";
interface secondCardStats {
  friend: any;
}

const SecondCard = (props: secondCardStats) => {
  const { friend } = props;
  return (
    <div className="secondCardMain">
      <img className="secondAvatar" src={friend?.avatar} />
      <div className="nickNameSecondDiv">
        <span>{friend?.name}</span>
        <span className="afterName">Ваш брат по оружию</span>
      </div>
      <div className="fraza">Совместные показатели:</div>
      <div className="winLoseAllSecond">
        <div>{friend?.with_win ? `${friend?.with_win} W` : null}</div>
        <div>{friend?.with_games ? `${friend?.with_games} All` : null}</div>
        <div>{friend?.with_lose ? `${friend?.with_lose} L` : null}</div>
      </div>
      <div className="secondWinrate">{friend?.with_win ? `${friend?.wr}%` : null}</div>
      {/* <div className="fraza">Вы отличная команда</div> */}
    </div>
  );
};

export default SecondCard;
