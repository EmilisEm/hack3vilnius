import axios from "axios";
import { imageDataResponse, imageUrlResponse } from "./types/imageResponse";

export const getStreetImageUrl = async (minLong: number, minLat: number, maxLong: number, maxLat: number) => {
    const idResponse = await axios.get<imageUrlResponse>(`https://graph.mapillary.com/images?access_token=MLYARDLPTblBZCAlTD9F6EqdnYZAquhfQFkFA9ZBkA9TLsjKr36bMoQzilKZAdVWKD2gd2scgOEARkfn7eHgIgbkMR9pE4x3bJipxMDKDLwpKV3UYicpkYfQtjaekPApwZDZD&fields=id&limit=1&bbox=${minLong},${minLat},${maxLong},${maxLat}`);
    const id = idResponse.data.data[0].id;
    const imageUrlResponse = await axios.get<imageDataResponse>(`https://graph.mapillary.com/${id}?access_token=MLYARDLPTblBZCAlTD9F6EqdnYZAquhfQFkFA9ZBkA9TLsjKr36bMoQzilKZAdVWKD2gd2scgOEARkfn7eHgIgbkMR9pE4x3bJipxMDKDLwpKV3UYicpkYfQtjaekPApwZDZD&fields=id,thumb_2048_url`);
    
    return imageUrlResponse.data.thumb_2048_url;
}