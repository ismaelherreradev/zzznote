"use client";

import { type Block, BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useMemo, useState } from "react";

import "./styles.css";

function createSchema() {
  return BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      file: undefined as any,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      audio: undefined as any,
    },
  });
}

export default function Editor() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const schema = useMemo(() => createSchema(), []);
  const editor = useCreateBlockNote({ schema });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      data-theming-css
      editor={editor}
      onChange={() => {
        setBlocks(editor.document);
      }}
      shadCNComponents={
        {
          // Pass modified ShadCN components from your project here.
          // Otherwise, the default ShadCN components will be used.
        }
      }
    />
  );
}
