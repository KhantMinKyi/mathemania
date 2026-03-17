import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Announcement = {
    id: number;
    heading: string;
    title: string;
    content_en: string;
    content_mm: string;
    is_active: boolean;
    updated_at: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/administration-panel/dashboard' },
    { title: 'Announcements', href: '/administration-panel/announcements' },
];

const formatDateTime = (value?: string | null) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(date);
};

export default function AnnouncementsAdmin() {
    const { announcements } = usePage<{ announcements: Announcement[] }>().props;
    const [editingId, setEditingId] = useState<number | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        heading: 'IMPORTANT ANNOUCEMENT!',
        title: '',
        content_en: '',
        content_mm: '',
        is_active: false,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (editingId) {
            put(`/administration-panel/announcements/${editingId}`);
            return;
        }

        post('/administration-panel/announcements');
    };

    const handleEdit = (announcement: Announcement) => {
        setEditingId(announcement.id);
        setData({
            heading: announcement.heading ?? '',
            title: announcement.title ?? '',
            content_en: announcement.content_en ?? '',
            content_mm: announcement.content_mm ?? '',
            is_active: Boolean(announcement.is_active),
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        reset();
    };

    const handleDelete = (announcementId: number) => {
        router.delete(`/administration-panel/announcements/${announcementId}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Announcements" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                {editingId ? 'Edit Announcement' : 'Add Announcement'}
                            </h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                Update the important announcement shown on the welcome page.
                            </p>
                        </div>
                        {editingId && (
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                Editing item #{editingId}
                            </span>
                        )}
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 grid gap-4 md:grid-cols-2"
                    >
                        <div className="grid gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Heading
                            </label>
                            <input
                                type="text"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.heading}
                                onChange={(event) =>
                                    setData('heading', event.target.value)
                                }
                            />
                            {errors.heading && (
                                <p className="text-xs text-red-600">
                                    {errors.heading}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Title
                            </label>
                            <input
                                type="text"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.title}
                                onChange={(event) =>
                                    setData('title', event.target.value)
                                }
                            />
                            {errors.title && (
                                <p className="text-xs text-red-600">{errors.title}</p>
                            )}
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                English Content
                            </label>
                            <textarea
                                rows={6}
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.content_en}
                                onChange={(event) =>
                                    setData('content_en', event.target.value)
                                }
                                placeholder="Use blank lines to separate paragraphs."
                            />
                            {errors.content_en && (
                                <p className="text-xs text-red-600">
                                    {errors.content_en}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Myanmar Content
                            </label>
                            <textarea
                                rows={6}
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.content_mm}
                                onChange={(event) =>
                                    setData('content_mm', event.target.value)
                                }
                                placeholder="Use blank lines to separate paragraphs."
                            />
                            {errors.content_mm && (
                                <p className="text-xs text-red-600">
                                    {errors.content_mm}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-3 md:col-span-2">
                            <input
                                id="is_active"
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300"
                                checked={data.is_active}
                                onChange={(event) =>
                                    setData('is_active', event.target.checked)
                                }
                            />
                            <label htmlFor="is_active" className="text-sm text-slate-700">
                                Set as active announcement
                            </label>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                            >
                                {processing
                                    ? 'Saving...'
                                    : editingId
                                      ? 'Update Announcement'
                                      : 'Create Announcement'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                Current Announcements
                            </h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                The active announcement appears on the welcome page.
                            </p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {announcements.length} items
                        </span>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-sm">
                            <thead className="text-slate-500">
                                <tr>
                                    <th className="pb-2">Heading</th>
                                    <th className="pb-2">Title</th>
                                    <th className="pb-2">Status</th>
                                    <th className="pb-2">Updated</th>
                                    <th className="pb-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {announcements.map((announcement) => (
                                    <tr
                                        key={announcement.id}
                                        className="border-t border-slate-200"
                                    >
                                        <td className="py-3">
                                            {announcement.heading}
                                        </td>
                                        <td className="py-3 font-medium text-slate-900">
                                            {announcement.title}
                                        </td>
                                        <td className="py-3">
                                            {announcement.is_active ? (
                                                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3">
                                            {formatDateTime(announcement.updated_at)}
                                        </td>
                                        <td className="py-3">
                                            <div className="flex flex-wrap gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleEdit(announcement)
                                                    }
                                                    className="text-slate-900 underline underline-offset-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(announcement.id)
                                                    }
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {announcements.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="py-6 text-center text-sm text-slate-500"
                                        >
                                            No announcements yet. Create the first one above.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
