"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LexicalEditor from "@/components/global/lexical"; // komponen lexical kamu
import { EditorState } from "lexical";

export default function NewBlog() {
    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [description, setDescription] = useState<EditorState | null>(null);

    const handleSave = async () => {
        if (!title || !description) return;

        const { error } = await supabase.from("blogs").insert({
            title,
            thumbnail,
            description: JSON.stringify(description.toJSON()) // simpan sebagai string
        });

        if (error) console.error(error);
        else alert("Blog saved!");
    };

    return (
        <div className="max-w-xl mx-auto space-y-4">
            <input
                className="border w-full p-2"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                className="border w-full p-2"
                placeholder="Thumbnail URL"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
            />
            <LexicalEditor onChange={(editorState) => setDescription(editorState)} />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
            >
                Save Blog
            </button>
        </div>
    );
}
