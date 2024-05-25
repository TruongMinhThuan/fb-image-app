export interface FBMediaAI {
    id: number;
    image_url: string;
    checkpoint: number;
    title: string;
    stable_diffusion: StableDiffusion;
}

export interface StableDiffusion {
    id: number;
    prompt: string;
    negative_prompt: string;
    steps: number;
    cfg_scale: number;
    seed: number;
    height: number;
    width: number;
    sampler: string;
    batch_size: number;
}