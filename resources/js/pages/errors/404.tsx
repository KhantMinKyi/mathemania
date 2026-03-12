import FrontendLayout from '@/layouts/frontend-layout';
import { Head, Link } from '@inertiajs/react';

export default function NotFound() {
    return (
        <FrontendLayout>
            <Head title="Page Not Found">
                <meta
                    name="description"
                    content="The page you are looking for could not be found."
                />
            </Head>
            <section className="mx-auto w-full max-w-6xl px-4 py-16">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan-100/70 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-slate-100 blur-2xl" />

                    <div className="relative grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                        <div className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                                Error
                            </p>
                            <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
                                404
                            </h1>
                            <p className="text-lg text-slate-600">
                                The page you are looking for does not exist or has
                                been moved.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/"
                                    className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                    Go back home
                                </Link>
                                <Link
                                    href="/rules-and-regulation"
                                    className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                                >
                                    View rules
                                </Link>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                            <p className="font-semibold text-slate-900">
                                Need help?
                            </p>
                            <p className="mt-2">
                                If you expected a page here, contact the Mathemania
                                team or return to the homepage to continue browsing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
