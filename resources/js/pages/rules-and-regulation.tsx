import Seo from '@/components/seo';
import FrontendLayout from '@/layouts/frontend-layout';
import { usePage } from '@inertiajs/react';
import { Suspense, lazy, useState } from 'react';

type RulesTab = 'en' | 'mm';

type RuleSection = {
    id: number;
    order: number;
    title_en: string;
    title_mm: string;
    body_en: string;
    body_mm: string;
    is_active: boolean;
};

const RulesFallback = lazy(() => import('./rules-and-regulation-fallback'));

export default function RulesAndRegulation() {
    const { rules = [] } = usePage<{ rules?: RuleSection[] }>().props;
    const [activeTab, setActiveTab] = useState<RulesTab>('en');
    const hasRules = rules.length > 0;

    const renderBody = (content: string) => {
        if (!content) return null;
        const hasHtml = /<\/?[a-z][\s\S]*>/i.test(content);
        if (hasHtml) {
            return (
                <div
                    className="space-y-3 text-sm leading-relaxed text-slate-700 [&_table]:w-full [&_table]:min-w-[420px] [&_th]:pb-2 [&_th]:text-left [&_th]:text-slate-500 [&_td]:py-3 [&_tr]:border-t [&_tr]:border-slate-200 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            );
        }

        return (
            <div className="space-y-3 text-sm leading-relaxed text-slate-700">
                {content.split(/\n{2,}/).map((paragraph, index) => (
                    <p key={`${index}-${paragraph.slice(0, 10)}`}>{paragraph}</p>
                ))}
            </div>
        );
    };

    return (
        <FrontendLayout>
            <Seo
                title="Rules and Regulations"
                description="Mathemania competition rules, eligibility, schedules, venues, awards, and registration details."
                keywords="Mathemania rules, math competition, eligibility, registration, Myanmar"
            />
            <section className="mx-auto w-full max-w-6xl px-4 py-10">
                <header className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                        Mathemania Competition
                    </p>
                    <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                        Rules and Regulations
                    </h1>
                    <p className="max-w-3xl text-base text-slate-600">
                        Please review the full competition rules, schedules, and
                        registration details below.
                    </p>
                </header>

                <div className="mt-6 flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('en')}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            activeTab === 'en'
                                ? 'bg-slate-900 text-white'
                                : 'border border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        English
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('mm')}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            activeTab === 'mm'
                                ? 'bg-slate-900 text-white'
                                : 'border border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        Myanmar
                    </button>
                </div>

                <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
                    {hasRules ? (
                        rules.map((rule) => {
                            const title =
                                activeTab === 'en'
                                    ? rule.title_en
                                    : rule.title_mm;
                            const body =
                                activeTab === 'en'
                                    ? rule.body_en
                                    : rule.body_mm;

                            return (
                                <section
                                    key={rule.id}
                                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                                >
                                    <h2 className="text-xl font-semibold text-slate-900">
                                        {title}
                                    </h2>
                                    <div className="mt-3">{renderBody(body)}</div>
                                </section>
                            );
                        })
                    ) : (
                        <Suspense
                            fallback={
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                                    Loading rules...
                                </div>
                            }
                        >
                            <RulesFallback tab={activeTab} />
                        </Suspense>
                    )}
                </div>
            </section>
        </FrontendLayout>
    );
}
