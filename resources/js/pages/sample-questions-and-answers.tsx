import FrontendLayout from '@/layouts/frontend-layout';
import { Head } from '@inertiajs/react';

const categories = [
    {
        title: 'Primary',
        description: 'Sample questions and answers for primary level.',
        questions: '/sample-questions/primary-questions.xlsx',
        answers: '/sample-questions/primary-answers.xlsx',
    },
    {
        title: 'Lower-secondary',
        description: 'Sample questions and answers for lower-secondary level.',
        questions: '/sample-questions/lower-secondary-questions.xlsx',
        answers: '/sample-questions/lower-secondary-answers.xlsx',
    },
    {
        title: 'Upper-secondary',
        description: 'Sample questions and answers for upper-secondary level.',
        questions: '/sample-questions/upper-secondary-questions.xlsx',
        answers: '/sample-questions/upper-secondary-answers.xlsx',
    },
];

export default function SampleQuestionsAndAnswers() {
    return (
        <FrontendLayout>
            <Head title="Sample Questions and Answers" />
            <section className="mx-auto w-full max-w-6xl px-4 py-10">
                <header className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                        Practice
                    </p>
                    <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                        Sample Questions and Answers
                    </h1>
                    <p className="max-w-3xl text-base text-slate-600">
                        Download the Excel files for each category. Each section
                        includes both the questions and the answers.
                    </p>
                </header>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {categories.map((category) => (
                        <div
                            key={category.title}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <h2 className="text-xl font-semibold text-slate-900">
                                {category.title}
                            </h2>
                            <p className="mt-2 text-sm text-slate-600">
                                {category.description}
                            </p>
                            <div className="mt-6 space-y-3">
                                <a
                                    href={category.questions}
                                    className="block rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                                >
                                    Questions (Excel)
                                </a>
                                <a
                                    href={category.answers}
                                    className="block rounded-full bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                    Answers (Excel)
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </FrontendLayout>
    );
}
