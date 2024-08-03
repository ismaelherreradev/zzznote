"use client";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { noteColors } from "~/lib/constants";

import { useAtomValue } from "jotai";
import { cn } from "~/lib/utils";
import { selectedColorAtom } from "~/store";
import type { ColorKey } from "~/types";

import NoteSettings from "./note-settings";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";

export default function CreateNote() {
  const color = useAtomValue(selectedColorAtom);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" variant="notikSecundary" size="icon">
          <PlusIcon className="h-5 w-5" />
          <span className="sr-only">Create note</span>
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("border-none", noteColors[color as ColorKey])}>
        <div className="absolute bottom-14">
          <NoteSettings />
        </div>

        <DialogTitle hidden>Are you absolutely sure?</DialogTitle>
        <DialogDescription hidden />
      </DialogContent>
    </Dialog>
  );
}
