import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

type RuleSection = {
    id: number;
    order: number;
    title_en: string;
    title_mm: string;
    body_en: string;
    body_mm: string;
    is_active: boolean;
    updated_at: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/administration-panel/dashboard' },
    { title: 'Rules and Regulation', href: '/administration-panel/rules-and-regulation' },
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

export default function RulesAndRegulationAdmin() {
    const { rules } = usePage<{ rules: RuleSection[] }>().props;
    const [editingId, setEditingId] = useState<number | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        order: 0,
        title_en: '',
        title_mm: '',
        body_en: '',
        body_mm: '',
        is_active: true,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (editingId) {
            put(`/administration-panel/rules-and-regulation/${editingId}`);
            return;
        }

        post('/administration-panel/rules-and-regulation');
    };

    const handleEdit = (rule: RuleSection) => {
        setEditingId(rule.id);
        setData({
            order: rule.order ?? 0,
            title_en: rule.title_en ?? '',
            title_mm: rule.title_mm ?? '',
            body_en: rule.body_en ?? '',
            body_mm: rule.body_mm ?? '',
            is_active: Boolean(rule.is_active),
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        reset();
    };

    const handleDelete = (ruleId: number) => {
        router.delete(`/administration-panel/rules-and-regulation/${ruleId}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rules and Regulation" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                {editingId
                                    ? 'Edit Rule Section'
                                    : 'Add Rule Section'}
                            </h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                Manage the public rules and regulations page content.
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                You can use HTML for tables, lists, and links inside the
                                body fields.
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
                                <p className="text-xs text-red-600">{errors.order}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-3 md:justify-end">
                            <div className="flex items-center gap-2">
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
                                    Show on website
                                </label>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                English Title
                            </label>
                            <input
                                type="text"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.title_en}
                                onChange={(event) =>
                                    setData('title_en', event.target.value)
                                }
                            />
                            {errors.title_en && (
                                <p className="text-xs text-red-600">
                                    {errors.title_en}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Myanmar Title
                            </label>
                            <input
                                type="text"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.title_mm}
                                onChange={(event) =>
                                    setData('title_mm', event.target.value)
                                }
                            />
                            {errors.title_mm && (
                                <p className="text-xs text-red-600">
                                    {errors.title_mm}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                English Body
                            </label>
                            <Editor
                                tinymceScriptSrc="/tinymce/tinymce.min.js"
                                value={data.body_en}
                                onEditorChange={(value) =>
                                    setData('body_en', value)
                                }
                                init={{
                                    height: 360,
                                    license_key: 'gpl',
                                    promotion: false,
                                    branding: false,
                                    base_url: '/tinymce',
                                    skin_url: '/tinymce/skins/ui/oxide',
                                    content_css:
                                        '/tinymce/skins/content/default/content.min.css',
                                    menubar:
                                        'file edit view insert format tools table help',
                                    plugins:
                                        'link lists table code autoresize paste',
                                    toolbar:
                                        'undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link table | removeformat | code',
                                    content_style:
                                        'body { font-family: "Instrument Sans", sans-serif; font-size: 14px; }',
                                }}
                            />
                            {errors.body_en && (
                                <p className="text-xs text-red-600">{errors.body_en}</p>
                            )}
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Myanmar Body
                            </label>
                            <Editor
                                tinymceScriptSrc="/tinymce/tinymce.min.js"
                                value={data.body_mm}
                                onEditorChange={(value) =>
                                    setData('body_mm', value)
                                }
                                init={{
                                    height: 360,
                                    license_key: 'gpl',
                                    promotion: false,
                                    branding: false,
                                    base_url: '/tinymce',
                                    skin_url: '/tinymce/skins/ui/oxide',
                                    content_css:
                                        '/tinymce/skins/content/default/content.min.css',
                                    menubar:
                                        'file edit view insert format tools table help',
                                    plugins:
                                        'link lists table code autoresize paste',
                                    toolbar:
                                        'undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link table | removeformat | code',
                                    content_style:
                                        'body { font-family: "Instrument Sans", sans-serif; font-size: 14px; }',
                                }}
                            />
                            {errors.body_mm && (
                                <p className="text-xs text-red-600">{errors.body_mm}</p>
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
                                      ? 'Update Section'
                                      : 'Create Section'}
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
                                Rule Sections
                            </h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                Sections are shown on the public page in order.
                            </p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {rules.length} items
                        </span>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[780px] text-left text-sm">
                            <thead className="text-slate-500">
                                <tr>
                                    <th className="pb-2">Order</th>
                                    <th className="pb-2">English Title</th>
                                    <th className="pb-2">Status</th>
                                    <th className="pb-2">Updated</th>
                                    <th className="pb-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {rules.map((rule) => (
                                    <tr key={rule.id} className="border-t border-slate-200">
                                        <td className="py-3">{rule.order}</td>
                                        <td className="py-3 font-medium text-slate-900">
                                            {rule.title_en}
                                        </td>
                                        <td className="py-3">
                                            {rule.is_active ? (
                                                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                                                    Visible
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                                                    Hidden
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 text-slate-500">
                                            {formatDateTime(rule.updated_at)}
                                        </td>
                                        <td className="py-3">
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(rule)}
                                                    className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(rule.id)}
                                                    className="rounded-md border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {rules.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="py-6 text-center text-sm text-slate-500"
                                        >
                                            No rule sections yet. Add one above to get
                                            started.
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
