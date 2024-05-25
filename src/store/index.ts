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
    handleTxt2Img: (item: FBMediaAI) => void;
    is_processing_image: boolean;
    getFBMediaList: () => void;
    fbmedias: FBMediaAI[];
    is_page_loading: boolean;
    getRandomAIImage: () => void;
    puzzle_image: string;
    is_puzzle_open: boolean;
    togglePuzzle: (value: boolean) => void;
    selected_ai_image: FBMediaAI;
    setSelectedAiImage: (selected_ai_image: FBMediaAI) => void;
}

const waiting = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Create the store
const useStore = create<State>((set, get) => ({
    count: 0,
    ai_image: [],
    is_processing_image: false,
    fbmedias: [],
    is_page_loading: false,
    puzzle_image: '',
    is_puzzle_open: false,
    selected_ai_image: {} as FBMediaAI,
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
    decreaseCount: () => set((state) => ({ count: state.count - 1 })),
    setAiImage(ai_image: string[]) {
        set({ ai_image });
    },
    setSelectedAiImage: (selected_ai_image: FBMediaAI) => {
        set({ selected_ai_image });
    },
    handleTxt2Img: async (item: FBMediaAI) => {
        try {
            set({ ai_image: [], is_processing_image: true });
            // let res = await api.post('/sdapi/v1/txt2img', txt2imgRequest)
            let image_data = await waiting(1200)

            console.log(image_data);

            const is_base64 = false

            let image = item.image_url
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
            set({ is_page_loading: true });
            const fbmedias = await getFBMediaList();
            console.log(fbmedias);

            set({ fbmedias });
        } catch (error) {
            console.log(error);
        } finally {
            set({ is_page_loading: false });
        }
    },
    getRandomAIImage: async () => {
        try {
            set({ ai_image: [], is_processing_image: true });
            let image_data = await waiting(2000)

            console.log(image_data);

            const is_base64 = false

            // get image from state in zuztan
            const randomIndex = Math.floor(Math.random() * get().fbmedias.length);
            let image = get().fbmedias[randomIndex].image_url

            if (is_base64) {
                image = "data:image/jpeg;base64," + image_data;
            }

            set({ ai_image: [image] });
            return image;

        } catch (error) {
            console.log(error);

        }
    },
    selectePuzzleImage: (image: string) => {
        set({ puzzle_image: image });
    },
    togglePuzzle: (value: boolean) => {
        set((state) => ({ is_puzzle_open: value }));
    },
}));


export default useStore;
