"use client";

import * as React from "react";
import { useState } from "react";
import { Pencil, Trash2, Plus, PackageOpen, Check } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Item {
    title: string;
    description: string;
    id: string;
}

export default function SimpleCrudPage() {
    // Data items
    const [items, setItems] = useState<Item[]>([
        { id: "1", title: "Belajar Next.js", description: "Framework React untuk full-stack" },
        { id: "2", title: "Latihan CRUD", description: "Create, Read, Update, Delete di UI" },
    ]);

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editId, setEditId] = useState<string | null>(null);

    // Delete confirmation
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Toast notification
    const [toast, setToast] = useState<{ message: string; show: boolean }>({
        message: "",
        show: false
    });

    // Show toast
    const showToast = (message: string) => {
        setToast({ message, show: true });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 2000);
    };

    const generateId = () => Math.random().toString(36).substr(2, 9);

    // Submit form
    const handleSubmit = () => {
        if (!title.trim() || !description.trim()) return;

        if (editId) {
            // Update existing
            setItems(prev => prev.map(item =>
                item.id === editId
                    ? { ...item, title: title.trim(), description: description.trim() }
                    : item
            ));
            setEditId(null);
            showToast("Item berhasil diupdate");
        } else {
            // Add new
            const newItem = {
                id: generateId(),
                title: title.trim(),
                description: description.trim()
            };
            setItems(prev => [...prev, newItem]);
            showToast("Item berhasil ditambahkan");
        }

        // Reset form
        setTitle("");
        setDescription("");
    };

    // Start editing
    const startEdit = (item: Item) => {
        setEditId(item.id);
        setTitle(item.title);
        setDescription(item.description);
    };

    // Cancel edit
    const cancelEdit = () => {
        setEditId(null);
        setTitle("");
        setDescription("");
    };

    // Delete item
    const confirmDelete = () => {
        if (deleteId) {
            setItems(prev => prev.filter(item => item.id !== deleteId));
            setDeleteId(null);
            showToast("Item berhasil dihapus");

            // Reset form if editing deleted item
            if (editId === deleteId) {
                cancelEdit();
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 relative">
            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded-md text-sm shadow-sm">
                        <Check className="h-3 w-3" />
                        {toast.message}
                    </div>
                </div>
            )}
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">CRUD Array</h1>
                    <p className="text-muted-foreground">Contoh sederhana CRUD operations</p>
                </div>
                <Badge variant="secondary">{items.length} items</Badge>
            </div>

            {/* Form */}
            <Card className="border shadow-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        {editId ? "Edit Item" : "Tambah Item"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Judul</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Masukkan judul..."
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Deskripsi</label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Masukkan deskripsi..."
                            rows={3}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={handleSubmit}
                            disabled={!title.trim() || !description.trim()}
                        >
                            {editId ? "Update" : "Tambah"}
                        </Button>

                        {editId && (
                            <Button variant="outline" onClick={cancelEdit}>
                                Batal
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* List */}
            <Card className="border shadow-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PackageOpen className="h-4 w-4" />
                        Daftar Item
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {items.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <PackageOpen className="h-8 w-8 mx-auto mb-2" />
                            <p>Belum ada data</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className={`p-4 border rounded-lg ${editId === item.id ? 'border-primary bg-muted/50' : ''
                                        }`}
                                >
                                    <div className="flex justify-between items-start gap-3">
                                        <div>
                                            <h3 className="font-medium">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>

                                        <div className="flex gap-1">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => startEdit(item)}
                                            >
                                                <Pencil className="h-3 w-3" />
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setDeleteId(item.id)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Hapus item?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Item  {item.title}  akan dihapus. Tindakan ini tidak dapat dibatalkan.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel onClick={() => setDeleteId(null)}>
                                                            Batal
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction onClick={confirmDelete}>
                                                            Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}