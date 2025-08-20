"use client";

import React from "react";
import { useTheme } from "next-themes";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {
    FORMAT_TEXT_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    UNDO_COMMAND,
    REDO_COMMAND,
} from "lexical";

import { Button } from "@/components/ui/button";

const theme = {
    paragraph: "mb-2",
    text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline underline-offset-2",
    },
};

function Placeholder() {
    return (
        <div className="top-2 left-2 text-gray-400 dark:text-gray-500 pointer-events-none select-none text-sm italic">
            Tulis sesuatu...
        </div>
    );
}

function onError(error: Error) {
    console.error("Lexical Error:", error);
}

function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();

    const applyFormat = (format: "bold" | "italic" | "underline") =>
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);

    return (
        <div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
            <Button size="sm" variant="outline" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>Undo</Button>
            <Button size="sm" variant="outline" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>Redo</Button>

            <Button size="sm" variant="outline" onClick={() => applyFormat("bold")}>B</Button>
            <Button size="sm" variant="outline" onClick={() => applyFormat("italic")}>I</Button>
            <Button size="sm" variant="outline" onClick={() => applyFormat("underline")}>U</Button>

            <Button size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}>Left</Button>
            <Button size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}>Center</Button>
            <Button size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}>Right</Button>
        </div>
    );
}

export default function LexicalEditor() {
    const { theme: mode } = useTheme();

    const initialConfig = {
        namespace: "MyEditor",
        theme,
        onError,
    };

    const containerClasses = `w-full max-w-3xl mx-auto p-4 border rounded-2xl shadow-md transition-colors ${mode === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`;

    const editableClasses = `min-h-[300px] p-2 outline-none transition-colors ${mode === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`;

    return (
        <div className={containerClasses}>
            <LexicalComposer initialConfig={initialConfig}>
                <ToolbarPlugin />

                <RichTextPlugin
                    contentEditable={<ContentEditable className={editableClasses} />}
                    placeholder={<Placeholder />}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <OnChangePlugin onChange={() => { }} />
            </LexicalComposer>
        </div>
    );
}
