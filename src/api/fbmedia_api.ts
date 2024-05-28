import { api } from ".";
import { FBMediaAI, StableDiffusion } from "../types/fbmedia_type";

// src/types.ts



export const getFBMediaList = async (): Promise<FBMediaAI[]> => {
    const response = await api.get<FBMediaAI[]>('https://blog-api.thuantr.site/fbapi/fbmedia/');

    const data = response.data
    return data;
};


export const text2img = async (data?: StableDiffusion): Promise<any> => {
    const response = await api.post('https://blog-api.thuantr.site/fbapi/fbmedia/txt2img/', data );

    const res = response.data
    console.log('data: ', res);

    return res['images'][0]
};
