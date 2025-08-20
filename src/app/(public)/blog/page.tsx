'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Blog = {
    id: string;
    title: string;
    thumbnail: string | null;
    description: string | null;
    created_at: string;
};

// Fungsi helper untuk memeriksa apakah string adalah URL yang valid
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

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = async () => {
        const { data, error } = await supabase
            .from("blogs")
            .select("*")
            .order("created_at", { ascending: false });
        if (!error && data) setBlogs(data as Blog[]);
        if (error) console.error("Error fetching blogs:", error);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Daftar Blog</h2>
            <ul className="space-y-4">
                {blogs.length > 0 ? (
                    blogs.map((b) => (
                        <li key={b.id} className="border rounded p-3">
                            <div className="flex items-center gap-3">
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
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-base truncate">{b.title}</h3>
                                    {b.description && (
                                        <p className="text-sm text-gray-600 mt-1 truncate">{b.description}</p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(b.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">Belum ada data.</p>
                )}
            </ul>
        </div>
    );
}