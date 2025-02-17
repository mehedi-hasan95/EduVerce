"use client";
import React, { useEffect, useState } from "react";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorCommandList,
  EditorBubble,
} from "novel";
import {
  CharacterCount,
  ImageResizer,
  handleCommandNavigation,
} from "novel/extensions";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./slash-command";
import { Separator } from "@/components/ui/separator";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { TextButtons } from "./selectors/text-buttons";
import { ColorSelector } from "./selectors/color-selector";
import { Video } from "./video";
import { cn } from "@/lib/utils";
import { HtmlParser } from "../html-parser";

const extensions = [...defaultExtensions, slashCommand, Video];

type Props = {
  name?: string;
  content: JSONContent | undefined;
  setContent: React.Dispatch<React.SetStateAction<JSONContent | undefined>>;
  min: number;
  max: number;
  textContent: string | undefined;
  setTextContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  onEdit?: boolean;
  inline?: boolean;
  disabled?: boolean;
  htmlContent?: string | undefined;
  setHtmlContent?: React.Dispatch<React.SetStateAction<string | undefined>>;
};
const Editor = ({
  name,
  setContent,
  content,
  min,
  max,
  setTextContent,
  textContent,
  onEdit,
  inline,
  disabled,
  htmlContent,
  setHtmlContent,
}: Props) => {
  const [openNode, setOpenNode] = useState<boolean>(false);
  const [openColor, setOpenColor] = useState<boolean>(false);
  const [openLink, setOpenLink] = useState<boolean>(false);
  const [characters, setCharacters] = useState<number | undefined>(
    textContent?.length || undefined
  );

  return (
    <div>
      {htmlContent && !onEdit && inline ? (
        <HtmlParser html={htmlContent} />
      ) : (
        <EditorRoot>
          <EditorContent
            className="border p-4 rounded-xl"
            initialContent={content}
            extensions={[
              ...extensions,
              CharacterCount.configure({
                limit: max,
              }),
            ]}
            editorProps={{
              editable: () => !disabled as boolean,
              handleDOMEvents: {
                keydown: (_view, event) => handleCommandNavigation(event),
              },
              attributes: {
                class: `prose prose-lg dark:prose-invert focus:outline-none max-w-full [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl text-themeTextGray`,
              },
            }}
            onUpdate={({ editor }) => {
              const json = editor.getJSON();
              const text = editor.getText();
              const html = editor.getHTML();
              if (setHtmlContent) {
                setHtmlContent(html);
              }
              setContent(json);
              setTextContent(text);
              setCharacters(text.length);
            }}
            slotAfter={<ImageResizer />}
          >
            <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
              <EditorCommandEmpty className="px-2 text-muted-foreground">
                No results
              </EditorCommandEmpty>
              <EditorCommandList>
                {suggestionItems.map((item: any) => (
                  <EditorCommandItem
                    value={item.title}
                    onCommand={(val) => item.command?.(val)}
                    className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                    key={item.title}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </EditorCommandItem>
                ))}
              </EditorCommandList>
            </EditorCommand>

            <EditorBubble
              tippyOptions={{
                placement: "top",
              }}
              className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
            >
              <Separator orientation="vertical" />
              <NodeSelector open={openNode} onOpenChange={setOpenNode} />
              <Separator orientation="vertical" />

              <LinkSelector open={openLink} onOpenChange={setOpenLink} />
              <Separator orientation="vertical" />
              <TextButtons />
              <Separator orientation="vertical" />
              <ColorSelector open={openColor} onOpenChange={setOpenColor} />
            </EditorBubble>
          </EditorContent>
          <div className="flex justify-between py-2">
            <p
              className={cn(
                "text-xs",
                characters &&
                  (characters < min || characters > max) &&
                  "text-red-500"
              )}
            >
              {characters || 0} / {max}
            </p>
          </div>
        </EditorRoot>
      )}
    </div>
  );
};

export default Editor;
