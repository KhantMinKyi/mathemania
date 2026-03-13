import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

type Timeline = {
    id: number;
    label: string;
    title: string;
    primary_label: string | null;
    primary_date: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { stats, nextTimeline } = usePage<{
        stats: { timelines: number; users: number };
        nextTimeline?: Timeline | null;
    }>().props;

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-lg">
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_65%)]" />
                    <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
                                Administration Panel
                            </p>
                            <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
                                Mathemania Operations Overview
                            </h1>
                            <p className="mt-2 max-w-xl text-sm text-slate-200">
                                Track registration milestones, manage files, and keep the competition on schedule.
                            </p>
                        </div>
                        <div className="grid w-full max-w-sm gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-200">
                                    Timeline Items
                                </p>
                                <p className="mt-2 text-2xl font-semibold">
                                    {stats?.timelines ?? 0}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-200">
                                    Users
                                </p>
                                <p className="mt-2 text-2xl font-semibold">
                                    {stats?.users ?? 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Next Key Date
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            The closest upcoming milestone from the competition timeline.
                        </p>
                        <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                            {nextTimeline ? (
                                <>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                                        {nextTimeline.label}
                                    </p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">
                                        {nextTimeline.title}
                                    </p>
                                    <p className="mt-3 text-sm text-slate-600">
                                        {nextTimeline.primary_label
                                            ? `${nextTimeline.primary_label}: `
                                            : ''}
                                        {formatDate(nextTimeline.primary_date)}
                                    </p>
                                </>
                            ) : (
                                <p className="text-sm text-slate-500">
                                    Add timeline items to see the next upcoming milestone.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Quick Actions
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Jump straight to the tools you use most.
                        </p>
                        <div className="mt-5 grid gap-3">
                            <a
                                href="/administration-panel/competition-timeline"
                                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
                            >
                                Manage Competition Timeline
                                <span className="text-slate-400">→</span>
                            </a>
                            <a
                                href="/administration-panel/simple-q-a"
                                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
                            >
                                Upload Sample Questions
                                <span className="text-slate-400">→</span>
                            </a>
                            <a
                                href="/administration-panel/exam-results"
                                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
                            >
                                Upload Exam Results
                                <span className="text-slate-400">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
