import FrontendLayout from '@/layouts/frontend-layout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import * as XLSX from 'xlsx';

type FileMeta = {
    key: string;
    category: string;
    type: string;
    exists: boolean;
    downloadUrl: string | null;
    updatedAt: string | null;
};

type PreviewState = {
    open: boolean;
    loading: boolean;
    error: string | null;
    rows: (string | number | boolean | null)[][];
};

const categoryLabels: Record<string, string> = {
    primary: 'Primary',
    'lower-secondary': 'Lower Secondary',
    'upper-secondary': 'Upper Secondary',
};

const typeLabels: Record<string, string> = {
    results: 'Results',
};

const categoryOrder = ['primary', 'lower-secondary', 'upper-secondary'];
const typeOrder = ['results'];

export default function ExamResults() {
    const { files } = usePage<{ files: FileMeta[] }>().props;
    const [previews, setPreviews] = useState<Record<string, PreviewState>>({});

    const grouped = files.reduce<Record<string, FileMeta[]>>((acc, file) => {
        if (!acc[file.category]) {
            acc[file.category] = [];
        }
        acc[file.category].push(file);
        return acc;
    }, {});

    const handlePreview = async (file: FileMeta) => {
        if (!file.downloadUrl) {
            return;
        }

        const existing = previews[file.key];
        if (existing?.rows?.length) {
            setPreviews((prev) => ({
                ...prev,
                [file.key]: {
                    ...existing,
                    open: !existing.open,
                },
            }));
            return;
        }

        setPreviews((prev) => ({
            ...prev,
            [file.key]: {
                open: true,
                loading: true,
                error: null,
                rows: [],
            },
        }));

        try {
            const response = await fetch(file.downloadUrl);
            if (!response.ok) {
                throw new Error('Unable to load the file.');
            }
            const data = await response.arrayBuffer();
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(sheet, {
                header: 1,
                raw: false,
            }) as (string | number | boolean | null)[][];

            setPreviews((prev) => ({
                ...prev,
                [file.key]: {
                    open: true,
                    loading: false,
                    error: null,
                    rows,
                },
            }));
        } catch (error) {
            setPreviews((prev) => ({
                ...prev,
                [file.key]: {
                    open: true,
                    loading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Preview failed.',
                    rows: [],
                },
            }));
        }
    };

    return (
        <FrontendLayout>
            <Head title="Exam Results" />
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:gap-10">
                <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600">
                                Mathemania 2025-2026
                            </p>
                            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                                Exam Results
                            </h1>
                            <p className="mt-3 max-w-2xl text-base text-slate-600">
                                Preview the full Excel results for each level before
                                downloading. The table is scrollable for large
                                spreadsheets and works smoothly on mobile.
                            </p>
                        </div>
                        <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                                <p className="text-xs font-semibold uppercase text-slate-500">
                                    Categories
                                </p>
                                <p className="mt-2 font-semibold text-slate-900">
                                    Primary, Lower, Upper
                                </p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                                <p className="text-xs font-semibold uppercase text-slate-500">
                                    Format
                                </p>
                                <p className="mt-2 font-semibold text-slate-900">
                                    Excel preview + download
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid gap-6">
                    {categoryOrder.map((category) => {
                        const categoryFiles = grouped[category] ?? [];
                        const sortedFiles = typeOrder
                            .map((type) =>
                                categoryFiles.find((file) => file.type === type),
                            )
                            .filter(Boolean) as FileMeta[];

                        return (
                            <section
                                key={category}
                                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
                                            Category
                                        </p>
                                        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                                            {categoryLabels[category] ?? category}
                                        </h2>
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        {sortedFiles.some((file) => file.exists)
                                            ? 'Excel files available.'
                                            : 'No files uploaded yet.'}
                                    </p>
                                </div>

                                <div className="mt-6 grid gap-4 lg:grid-cols-1">
                                    {sortedFiles.map((file) => {
                                        const preview = previews[file.key];
                                        const previewRows = preview?.rows ?? [];

                                        return (
                                            <div
                                                key={file.key}
                                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 overflow-hidden"
                                            >
                                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-slate-900">
                                                            {typeLabels[file.type] ?? file.type}
                                                        </h3>
                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {file.updatedAt
                                                                ? `Updated ${file.updatedAt}`
                                                                : 'Not uploaded'}
                                                        </p>
                                                    </div>
                                                    {file.downloadUrl ? (
                                                        <a
                                                            href={file.downloadUrl}
                                                            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
                                                        >
                                                            Download
                                                        </a>
                                                    ) : (
                                                        <span className="rounded-full bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-500">
                                                            Unavailable
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handlePreview(file)}
                                                        disabled={!file.downloadUrl}
                                                        className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {preview?.open
                                                            ? 'Hide Preview'
                                                            : 'Preview'}
                                                    </button>
                                                    <span className="text-xs text-slate-500">
                                                        {preview?.open
                                                            ? 'Showing all rows.'
                                                            : 'Preview before download.'}
                                                    </span>
                                                </div>

                                                {preview?.open && (
                                                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
                                                        {preview.loading && (
                                                            <p className="text-xs text-slate-500">
                                                                Loading preview...
                                                            </p>
                                                        )}
                                                        {preview.error && (
                                                            <p className="text-xs text-red-600">
                                                                {preview.error}
                                                            </p>
                                                        )}
                                                        {!preview.loading &&
                                                            !preview.error &&
                                                            previewRows.length > 0 && (
                                                                <div className="max-h-[320px] w-full max-w-full overflow-auto overscroll-contain rounded-xl border border-slate-100 sm:max-h-[420px]">
                                                                    <table className="min-w-max text-left text-xs">
                                                                        <tbody className="text-slate-600">
                                                                            {previewRows.map((row, rowIndex) => (
                                                                                <tr
                                                                                    key={rowIndex}
                                                                                    className="border-b border-slate-100"
                                                                                >
                                                                                    {row.map((cell, cellIndex) => (
                                                                                        <td
                                                                                            key={cellIndex}
                                                                                            className="px-2 py-2 align-top break-words whitespace-normal"
                                                                                        >
                                                                                            {cell ?? ''}
                                                                                        </td>
                                                                                    ))}
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )}
                                                        {!preview.loading &&
                                                            !preview.error &&
                                                            previewRows.length === 0 && (
                                                                <p className="text-xs text-slate-500">
                                                                    No preview data found.
                                                                </p>
                                                            )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </FrontendLayout>
    );
}
