import FrontendLayout from '@/layouts/frontend-layout';
import { Head } from '@inertiajs/react';

export default function RegisterHere() {
    return (
        <FrontendLayout>
            <Head title="Register Here" />
            <section className="space-y-6">
                <h1 className="text-3xl font-semibold text-slate-900">
                    Register Here
                </h1>
                <p className="max-w-2xl text-base text-slate-600">
                    Registration details will be posted here. Please check back for
                    upcoming event dates, eligibility requirements, and the full
                    registration workflow.
                </p>
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                    <h2 className="text-lg font-semibold text-slate-900">
                        What to prepare
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li>Participant name and contact details.</li>
                        <li>School or organization information.</li>
                        <li>Preferred competition category.</li>
                    </ul>
                </div>
            </section>
        </FrontendLayout>
    );
}
