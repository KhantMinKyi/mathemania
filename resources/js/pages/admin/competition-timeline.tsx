import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Timeline = {
    id: number;
    order: number;
    label: string;
    title: string;
    primary_label: string | null;
    primary_date: string | null;
    secondary_label: string | null;
    secondary_date: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/administration-panel/dashboard' },
    { title: 'Competition Timeline', href: '/administration-panel/competition-timeline' },
];

const formatDate = (value?: string | null) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

const toDateInputValue = (value?: string | null) =>
    value ? value.slice(0, 10) : '';

export default function CompetitionTimelineAdmin() {
    const { timelines } = usePage<{ timelines: Timeline[] }>().props;
    const [editingId, setEditingId] = useState<number | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        order: 0,
        label: '',
        title: '',
        primary_label: '',
        primary_date: '',
        secondary_label: '',
        secondary_date: '',
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (editingId) {
            put(`/administration-panel/competition-timeline/${editingId}`);
            return;
        }

        post('/administration-panel/competition-timeline');
    };

    const handleEdit = (timeline: Timeline) => {
        setEditingId(timeline.id);
        setData({
            order: timeline.order ?? 0,
            label: timeline.label ?? '',
            title: timeline.title ?? '',
            primary_label: timeline.primary_label ?? '',
            primary_date: toDateInputValue(timeline.primary_date),
            secondary_label: timeline.secondary_label ?? '',
            secondary_date: toDateInputValue(timeline.secondary_date),
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        reset();
    };

    const handleDelete = (timelineId: number) => {
        router.delete(`/administration-panel/competition-timeline/${timelineId}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Competition Timeline" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                {editingId ? 'Edit Timeline' : 'Add Timeline'}
                            </h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                Manage the public timeline shown on the home page.
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
                                Order
                            </label>
                            <input
                                type="number"
                                min={0}
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.order}
                                onChange={(event) =>
                                    setData('order', Number(event.target.value))
                                }
                            />
                            {errors.order && (
                                <p className="text-xs text-red-600">
                                    {errors.order}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Section Label
                            </label>
                            <input
                                type="text"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.label}
                                onChange={(event) =>
                                    setData('label', event.target.value)
                                }
                            />
                            {errors.label && (
                                <p className="text-xs text-red-600">
                                    {errors.label}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2 md:col-span-2">
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
                                <p className="text-xs text-red-600">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Primary Label
                            </label>
                            <input
                                type="text"
                                placeholder="Starts"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.primary_label}
                                onChange={(event) =>
                                    setData('primary_label', event.target.value)
                                }
                            />
                            {errors.primary_label && (
                                <p className="text-xs text-red-600">
                                    {errors.primary_label}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Primary Date
                            </label>
                            <input
                                type="date"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.primary_date}
                                onChange={(event) =>
                                    setData('primary_date', event.target.value)
                                }
                            />
                            {errors.primary_date && (
                                <p className="text-xs text-red-600">
                                    {errors.primary_date}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Secondary Label
                            </label>
                            <input
                                type="text"
                                placeholder="Closes"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.secondary_label}
                                onChange={(event) =>
                                    setData('secondary_label', event.target.value)
                                }
                            />
                            {errors.secondary_label && (
                                <p className="text-xs text-red-600">
                                    {errors.secondary_label}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Secondary Date
                            </label>
                            <input
                                type="date"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.secondary_date}
                                onChange={(event) =>
                                    setData('secondary_date', event.target.value)
                                }
                            />
                            {errors.secondary_date && (
                                <p className="text-xs text-red-600">
                                    {errors.secondary_date}
                                </p>
                            )}
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
                                      ? 'Update Timeline'
                                      : 'Create Timeline'}
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
                                Current Timeline
                            </h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                Items are ordered by the "Order" field.
                            </p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {timelines.length} items
                        </span>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead className="text-slate-500">
                                <tr>
                                    <th className="pb-2">Order</th>
                                    <th className="pb-2">Label</th>
                                    <th className="pb-2">Title</th>
                                    <th className="pb-2">Primary Date</th>
                                    <th className="pb-2">Secondary Date</th>
                                    <th className="pb-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {timelines.map((timeline) => (
                                    <tr
                                        key={timeline.id}
                                        className="border-t border-slate-200"
                                    >
                                        <td className="py-3">{timeline.order}</td>
                                        <td className="py-3">
                                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                                                {timeline.label}
                                            </span>
                                        </td>
                                        <td className="py-3 font-medium text-slate-900">
                                            {timeline.title}
                                        </td>
                                        <td className="py-3">
                                            {timeline.primary_label
                                                ? `${timeline.primary_label}: `
                                                : ''}
                                            {formatDate(timeline.primary_date)}
                                        </td>
                                        <td className="py-3">
                                            {timeline.secondary_label
                                                ? `${timeline.secondary_label}: `
                                                : ''}
                                            {formatDate(timeline.secondary_date)}
                                        </td>
                                        <td className="py-3">
                                            <div className="flex flex-wrap gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleEdit(timeline)
                                                    }
                                                    className="text-slate-900 underline underline-offset-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(timeline.id)
                                                    }
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {timelines.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="py-6 text-center text-sm text-slate-500"
                                        >
                                            No timeline items yet. Create the first one above.
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
