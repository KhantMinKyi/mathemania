import FrontendLayout from '@/layouts/frontend-layout';
import { Head, usePage } from '@inertiajs/react';

const categories = [
    {
        key: 'primary',
        title: 'Primary',
        description: 'Sample questions and answers for primary level.',
    },
    {
        key: 'lower-secondary',
        title: 'Lower-secondary',
        description: 'Sample questions and answers for lower-secondary level.',
    },
    {
        key: 'upper-secondary',
        title: 'Upper-secondary',
        description: 'Sample questions and answers for upper-secondary level.',
    },
];

type FileMeta = {
    key: string;
    category: string;
    type: string;
    exists: boolean;
    downloadUrl: string | null;
};

export default function SampleQuestionsAndAnswers() {
    const { files } = usePage<{ files: FileMeta[] }>().props;
    const fileMap = new Map(
        files.map((file) => [file.category + '-' + file.type, file]),
    );

    return (
        <FrontendLayout>
            <Head title="Sample Questions and Answers">
                <meta
                    name="description"
                    content="Download Mathemania sample questions and answers for primary, lower-secondary, and upper-secondary levels."
                />
                <meta
                    name="keywords"
                    content="Mathemania sample questions, answers, primary, lower-secondary, upper-secondary"
                />
                <meta
                    property="og:title"
                    content="Mathemania Sample Questions and Answers"
                />
                <meta
                    property="og:description"
                    content="Practice with official Mathemania sample questions and answers."
                />
                <meta property="og:type" content="website" />
            </Head>
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
                        (() => {
                            const questions = fileMap.get(
                                category.key + '-questions',
                            );
                            const answers = fileMap.get(
                                category.key + '-answers',
                            );

                            if (!questions?.exists && !answers?.exists) {
                                return null;
                            }

                            return (
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
                                {questions?.exists && questions.downloadUrl && (
                                    <a
                                        href={questions.downloadUrl}
                                        className="block rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                                    >
                                        Questions (Excel)
                                    </a>
                                )}
                                {answers?.exists && answers.downloadUrl && (
                                    <a
                                        href={answers.downloadUrl}
                                        className="block rounded-full bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        Answers (Excel)
                                    </a>
                                )}
                            </div>
                        </div>
                            );
                        })()
                    ))}
                </div>
            </section>
        </FrontendLayout>
    );
}
