import { api } from ".";
import { FBMediaAI } from "../types/fbmedia_type";

// src/types.ts



export const getFBMediaList = async (): Promise<FBMediaAI[]> => {
    const response = await api.get<FBMediaAI[]>('/fbapi/fbmedia');
    console.log('====================================');
    console.log(response.data);
    console.log('====================================');
    return response.data;
};
