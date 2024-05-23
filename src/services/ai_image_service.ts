import axios from 'axios';

export const txt2img = async (text: string) => {
    const response = await axios.post('http://localhost:5000/ai/text2img', {
        text,
    });
    
    return response.data;
};
