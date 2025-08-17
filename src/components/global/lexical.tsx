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

// Theme config bisa di-extend sesuai kebutuhan
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
        <div className=" top-2 left-2 text-gray-400 dark:text-gray-500 pointer-events-none select-none text-sm italic transition-opacity duration-200">
            Tulis sesuatu...
        </div>
    );
}


function onError(error: any) {
    console.error("Lexical Error:", error);
}

export default function LexicalEditor() {
    const { theme: mode } = useTheme();

    const initialConfig = {
        namespace: "MyEditor",
        theme,
        onError,
    };

    const containerClasses = `w-full max-w-2xl mx-auto p-4 border rounded-2xl shadow-md transition-colors ${mode === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`;

    const editableClasses = `min-h-[200px] p-2 outline-none transition-colors ${mode === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`;

    return (
        <div className={containerClasses}>
            <LexicalComposer initialConfig={initialConfig}>
                <RichTextPlugin
                    contentEditable={<ContentEditable className={editableClasses} />}
                    placeholder={<Placeholder />}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <OnChangePlugin
                    onChange={(editorState) => {
                        editorState.read(() => {
                            // Contoh ambil text
                            // console.log($getRoot().getTextContent());
                        });
                    }}
                />
            </LexicalComposer>
        </div>
    );
}
