import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

type FileMeta = {
    key: string;
    category: string;
    type: string;
    exists: boolean;
    downloadUrl: string | null;
    updatedAt: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/administration-panel/dashboard' },
    { title: 'Simple Q&A', href: '/administration-panel/simple-q-a' },
];

export default function SimpleQA() {
    const { files } = usePage<{ files: FileMeta[] }>().props;
    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        delete: destroy,
    } =
        useForm<{
            category: string;
            type: string;
            file: File | null;
        }>({
            category: 'primary',
            type: 'questions',
            file: null,
        });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        post('/administration-panel/simple-q-a', {
            forceFormData: true,
        });
    };

    const handleDelete = (category: string, type: string) => {
        destroy('/administration-panel/simple-q-a', {
            data: { category, type },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Simple Q&A" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Upload Questions & Answers
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Upload Excel files for Primary, Lower-secondary, and
                        Upper-secondary categories. Files are stored in
                        `storage/app/sample-questions`.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_2fr_auto]"
                    >
                        <div className="grid gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Category
                            </label>
                            <select
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.category}
                                onChange={(event) =>
                                    setData('category', event.target.value)
                                }
                            >
                                <option value="primary">Primary</option>
                                <option value="lower-secondary">
                                    Lower-secondary
                                </option>
                                <option value="upper-secondary">
                                    Upper-secondary
                                </option>
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                File Type
                            </label>
                            <select
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.type}
                                onChange={(event) =>
                                    setData('type', event.target.value)
                                }
                            >
                                <option value="questions">Questions</option>
                                <option value="answers">Answers</option>
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Excel File
                            </label>
                            <input
                                type="file"
                                accept=".xlsx,.xls"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                onChange={(event) =>
                                    setData(
                                        'file',
                                        event.target.files?.[0] ?? null,
                                    )
                                }
                            />
                            {errors.file && (
                                <p className="text-xs text-red-600">
                                    {errors.file}
                                </p>
                            )}
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                            >
                                {processing ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                    </form>

                    {recentlySuccessful && (
                        <p className="mt-3 text-sm text-emerald-600">
                            Upload completed.
                        </p>
                    )}
                </div>

                <div className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Current Files
                    </h2>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[560px] text-left text-sm">
                            <thead className="text-slate-500">
                                <tr>
                                    <th className="pb-2">Category</th>
                                    <th className="pb-2">Type</th>
                                    <th className="pb-2">Status</th>
                                    <th className="pb-2">Updated</th>
                                    <th className="pb-2">Download</th>
                                    <th className="pb-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {files.map((file) => (
                                    <tr
                                        key={file.key}
                                        className="border-t border-slate-200"
                                    >
                                        <td className="py-3 capitalize">
                                            {file.category}
                                        </td>
                                        <td className={`py-3 capitalize ${file.type == 'questions' ? " text-blue-500" : ' text-gray-700'}`}
                                        >
                                            {}
                                            {file.type}
                                        </td>
                                        <td className={`py-3  ${file.exists ? " text-green-700" : ' text-red-500'}`}>
                                            {file.exists ? 'Uploaded' : 'Missing'}
                                        </td>
                                        <td className="py-3">
                                            {file.updatedAt ?? '—'}
                                        </td>
                                        <td className="py-3">
                                            {file.downloadUrl ? (
                                                <a
                                                    href={file.downloadUrl}
                                                    className="text-slate-900 underline underline-offset-4"
                                                >
                                                    Download
                                                </a>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                        <td className="py-3">
                                            {file.exists ? (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            file.category,
                                                            file.type,
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
