export type ColorKey = "golden-yellow" | "burnt-orange" | "light-sky-blue" | "pale-green" | "cream";

export type NoteColors = Record<ColorKey, string>;

export type SetColorProps = {
  colors: NoteColors;
};
