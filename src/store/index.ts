// src/store.ts
import { create } from 'zustand';
import { getFBMediaList } from '../api/fbmedia_api';
import { FBMediaAI } from '../types/fbmedia_type';

// Define the shape of your store's state
interface State {
    count: number;
    ai_image: string[];
    increaseCount: () => void;
    decreaseCount: () => void;
    setAiImage: (ai_image: string[]) => void;
    handleTxt2Img: () => void;
    is_processing_image: boolean;
    getFBMediaList: () => void;
    fbmedias: FBMediaAI[];
}

const waiting = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Create the store
const useStore = create<State>((set) => ({
    count: 0,
    ai_image: [],
    is_processing_image: false,
    fbmedias: [],
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
    decreaseCount: () => set((state) => ({ count: state.count - 1 })),
    setAiImage(ai_image: string[]) {
        set({ ai_image });
    },
    handleTxt2Img: async () => {
        try {
            set({ ai_image: [], is_processing_image: true });
            // let res = await api.post('/sdapi/v1/txt2img', txt2imgRequest)
            let image_data = await waiting(4000)

            console.log(image_data);

            const is_base64 = false

            let image = "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/bfeca0a1-2311-4e2c-bf09-98f6d135c41f/width=1024,quality=90/26072164-1547547180-(8k,%20best%20quality,%20masterpiece_1.2),(best%20quality_1.0),%20(ultra%20highres_1.0),%20watercolor,%20a%20beautiful%20woman,%20shoulder,%20hair%20ribbo.jpeg"
            if (is_base64) {
                image = "data:image/jpeg;base64," + image_data;
            }

            set({ ai_image: [image] });
            return image;
        } catch (error) {
            console.log(error);

        }
    },
    getFBMediaList: async () => {
        try {
            const fbmedias = await getFBMediaList();
            set({ fbmedias });
        } catch (error) {
            console.log(error);
        }
    },
}));


export default useStore;
