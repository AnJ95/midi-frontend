type Icon = "sun" | "off" | "chill" | "party" | "rave" | "rainbow";

export type Json = any;

export interface PresetButtonDefinition {
    id: string,
    category: string,
    icon: Icon,
    color: string,
    text: string
}

export interface PresetCategoryDefinition {
    id: string,
    text: string
}