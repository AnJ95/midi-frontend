export type Icon = "sun" | "off" | "chill" | "party" | "rave" | "rainbow" | "left" | "right";

export type Json = any;
export type Color = string;


export interface iRow {
    row: number
}

export interface iRowCol extends iRow {
    column: number
}

export interface iTyped {
    type?: string
}

export interface PresetButtonDefinition extends iRowCol {
    icon: Icon,
    color: Color,
    text: string
}

export interface PresetCategoryDefinition extends iRow {
    text: string
}

export interface FaderDefinition extends iRowCol {
    icon: Icon,
    color: Color,
    text: string
}

export interface FaderState extends iRowCol, iTyped {
    state: number
}

export interface FaderHighlight extends iRowCol, iTyped {
    value: boolean
}

export interface PageChangeAction extends iRow, iTyped {
    direction: string
}

export interface PresetSetAction extends iRow, iTyped {
}