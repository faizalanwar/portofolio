"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Blog = {
    id: string;
    title: string;
    thumbnail: string | null;
    description: string | null;
    created_at: string;
};

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const isValidUrl = (url: string | null | undefined): boolean => {
        if (!url) {
            return false;
        }
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };
    const fetchBlogs = async () => {
        const { data, error } = await supabase
            .from("blogs")
            .select("*")
            .order("created_at", { ascending: false });
        if (!error && data) setBlogs(data as Blog[]);
    };

    const addBlog = async () => {
        if (!title.trim()) return;
        setLoading(true);
        const { error } = await supabase
            .from("blogs")
            .insert({ title, thumbnail, description });
        setLoading(false);
        if (!error) {
            setTitle("");
            setThumbnail("");
            setDescription("");
            fetchBlogs();
        } else {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-semibold">Blogs</h1>
            {/*  form creeate nya */}

            <div className="space-y-2 border p-4 rounded">
                <input
                    className="w-full border p-2 rounded"
                    placeholder="Title *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="w-full border p-2 rounded"
                    placeholder="Thumbnail URL (opsional)"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                />
                <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Description (singkat saja)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                />
                <button
                    onClick={addBlog}
                    disabled={loading}
                    className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Add"}
                </button>
            </div>
            {/*  list jadi nya */}

            <ul className="space-y-3">
                {blogs.map((b) => (
                    <li key={b.id} className="border rounded p-3">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-medium">{b.title}</h3>
                                {b.thumbnail && isValidUrl(b.thumbnail) ? (
                                    <img
                                        src={b.thumbnail}
                                        alt={b.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded text-gray-500 text-xs text-center">
                                        <p>No Image</p>
                                    </div>
                                )}
                                {b.description ? (
                                    <p className="text-sm mt-1">{b.description}</p>
                                ) : null}
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(b.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <a
                                    className="px-3 py-1 border rounded"
                                    href={`/blogs/${b.id}`}
                                >
                                    Edit
                                </a>
                                <button
                                    className="px-3 py-1 border rounded"
                                    onClick={async () => {
                                        const { error } = await supabase
                                            .from("blogs")
                                            .delete()
                                            .eq("id", b.id);
                                        if (error) alert(error.message);
                                        else fetchBlogs();
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
                {blogs.length === 0 && (
                    <p className="text-sm text-gray-500">Belum ada data.</p>
                )}
            </ul>
        </div>
    );
}
