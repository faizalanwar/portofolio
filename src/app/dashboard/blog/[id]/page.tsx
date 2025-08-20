"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function EditBlogPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchDetail = async () => {
        const { data, error } = await supabase
            .from("blogs")
            .select("*")
            .eq("id", id)
            .single();

        setLoading(false);
        if (error || !data) {
            alert("Data tidak ditemukan");
            router.push("/blogs");
            return;
        }
        setTitle(data.title ?? "");
        setThumbnail(data.thumbnail ?? "");
        setDescription(data.description ?? "");
    };

    const updateBlog = async () => {
        const { error } = await supabase
            .from("blogs")
            .update({ title, thumbnail, description })
            .eq("id", id);
        if (error) alert(error.message);
        else router.push("/blogs");
    };

    const deleteBlog = async () => {
        const { error } = await supabase.from("blogs").delete().eq("id", id);
        if (error) alert(error.message);
        else router.push("/blogs");
    };

    useEffect(() => {
        fetchDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-xl mx-auto p-4 space-y-3">
            <h1 className="text-xl font-semibold">Edit Blog</h1>
            <input
                className="w-full border p-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title *"
            />
            <input
                className="w-full border p-2 rounded"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="Thumbnail URL"
            />
            <textarea
                className="w-full border p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Description"
            />
            <div className="flex gap-2">
                <button onClick={updateBlog} className="px-4 py-2 bg-black text-white rounded">
                    Save
                </button>
                <button onClick={deleteBlog} className="px-4 py-2 border rounded">
                    Delete
                </button>
                <button onClick={() => router.push("/blogs")} className="px-4 py-2 border rounded">
                    Cancel
                </button>
            </div>
        </div>
    );
}
