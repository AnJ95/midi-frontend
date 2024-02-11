type Icon = "sun" | "off" | "chill" | "party" | "rave" | "rainbow";

export type Json = any;
export type Color = string;

export interface PresetButtonDefinition {
    id: string,
    category: string,
    icon: Icon,
    color: Color,
    text: string
}

export interface PresetCategoryDefinition {
    id: string,
    text: string
}

export interface FaderDefinition {
    "id": string,
    "icon": Icon,
    "color": Color,
    "text": string
}

export interface FaderState {
    "id": string,
    "state": number
}