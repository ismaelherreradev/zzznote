import { useAtom, useAtomValue } from "jotai";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { noteColors } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { selectedColorAtom } from "~/store";
import type { ColorKey, SetColorProps } from "~/types";

export default function NoteSettings() {
  const color = useAtomValue(selectedColorAtom);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-12 w-12 rounded-full" size="icon" variant="notikSecundaryOutline">
          <div className={cn("flex h-6 w-6 items-center justify-center rounded-full", noteColors[color as ColorKey])}>
            <span className="font-semibold text-notik-black text-xl">A</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit rounded-2xl border-none bg-notik-foreground" side="top">
        <div>
          <SetColor colors={noteColors} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SetColor({ colors }: SetColorProps) {
  const [selectedColor, setSelectedColor] = useAtom(selectedColorAtom);

  const handleColorClick = (colorKey: ColorKey) => setSelectedColor(colorKey);

  return (
    <div className="flex gap-3">
      {Object.keys(colors).map((colorKey) => (
        <Button
          key={colorKey}
          onClick={() => handleColorClick(colorKey as ColorKey)}
          className={cn(
            `hover:${colors[colorKey as ColorKey]} h-5 w-5 rounded-full p-0`,
            colors[colorKey as ColorKey],
            selectedColor === colorKey ? "border-2 border-blue-500" : "",
          )}
        />
      ))}
    </div>
  );
}
