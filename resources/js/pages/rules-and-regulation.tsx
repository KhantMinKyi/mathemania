import FrontendLayout from '@/layouts/frontend-layout';
import { Head } from '@inertiajs/react';

export default function RulesAndRegulation() {
    return (
        <FrontendLayout>
            <Head title="Rules and Regulation" />
            <section className="space-y-6">
                <h1 className="text-3xl font-semibold text-slate-900">
                    Rules and Regulation
                </h1>
                <p className="max-w-2xl text-base text-slate-600">
                    The official rules and regulations will be published here. Review
                    eligibility, scoring, conduct, and submission requirements before
                    participating.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Eligibility
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Participants must meet the age and category requirements
                            listed for each event.
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Scoring
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Points are awarded based on accuracy, speed, and
                            completeness of submitted answers.
                        </p>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
