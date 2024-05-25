import { api } from ".";
import { FBMediaAI } from "../types/fbmedia_type";

// src/types.ts



export const getFBMediaList = async (): Promise<FBMediaAI[]> => {
    const response = await api.get<FBMediaAI[]>('https://blog-api.thuantr.site/fbapi/fbmedia/');

    const data = response.data
    return data;
};
