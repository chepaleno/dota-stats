interface FirstCardStats {
  stats: any;
}

const FirstCard = (props: FirstCardStats) => {
    const { stats } = props;
    // console.log(stats)
  return (
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
            {stats.star !== 0 ? (
            <img
              className="star"
              src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_${stats?.star}.png`}
              alt=""
            />) : null}
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
          <div className="winrate">{stats?.win ? `${stats?.wr}%` : null}</div>
          <div className="winrate">
            {" "}
            {stats?.mmr ? Math.trunc(stats?.mmr) + " MMR" : "Нет рйтинга"}
          </div>
          <div className="winrate">
            {stats?.dotaPlus ? "Гейб доволен" : "Гейб не доволен"}
          </div>
        </div>
      </div>
      {/* <div className="navigate_arrows">
        <div className="arrow">⬅️</div>
        <div className="arrow">➡️</div>
      </div> */}
    </div>
  );
};

export default FirstCard;
