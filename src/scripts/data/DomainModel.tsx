export type Icon = "sun" | "off" | "chill" | "party" | "rave" | "rainbow" | "left" | "right";

export type Json = any;
export type Color = string;

export interface iRowCol {
    row: number,
    column: number
}

export interface PresetButtonDefinition {
    row: number,
    column: number,
    icon: Icon,
    color: Color,
    text: string
}

export interface PresetCategoryDefinition {
    row: number,
    id: string,
    text: string
}

export interface FaderDefinition {
    row: number,
    column: number,
    icon: Icon,
    color: Color,
    text: string
}

export interface FaderState {
    row: number,
    column: number,
    state: number
}