// import { useEffect } from "react";

// const OpenDota = () => {
export const search = async (playerName:string) => {
  try {
    const url = `https://api.opendota.com/api/search?q=${playerName}`;

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data
  } catch (error) {
    console.log("какие-то шоколадки");
  }
};

export const deepSearch = async (playerId:number) => {
  try {
    const url = `https://api.opendota.com/api/players/${playerId}`;

    const deepResponse = await fetch(url);
    const deepData = await deepResponse.json();
    // console.log(deepData);
    return deepData
  } catch (error) {
    console.log("какие-то шоколадки");
  }
};

export const getWinrate = async (playerId:number) => {
  try {
    const url = `https://api.opendota.com/api/players/${playerId}/wl`

    const deepResponse = await fetch(url);
    const winrate = await deepResponse.json();
    // console.log(deepData);
    return winrate
  } catch (error) {
    
  }
}
