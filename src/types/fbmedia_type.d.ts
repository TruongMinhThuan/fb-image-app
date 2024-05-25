export interface FBMediaAI {
    id: number;
    image_url: string;
    views: number;
    prompt: string;
    negative_prompt: string;
    title: string;
    steps: number;
    cfg_scale: number;
    seed: number | null;
    height: number;
    width: number;
    sampler: string;
    batch_size: number;
}