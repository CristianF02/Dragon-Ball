import axios from "axios";

const url = "https://dragonball-api.com/api/characters/";

export const getAllcharacters = async () => {
  const response = await axios.get(url);
  console.log(response.data.items);
  return response.data.items;
};
