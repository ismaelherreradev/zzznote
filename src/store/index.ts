import { atom } from "jotai";
import type { ColorKey } from "~/types";

export const selectedColorAtom = atom<ColorKey | null>("golden-yellow");
