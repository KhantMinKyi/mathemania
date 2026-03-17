import FrontendLayout from '@/layouts/frontend-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

type StepsTab = 'en' | 'mm' | 'bank';

type RegistrationSettings = {
    register_link: string | null;
    attention_en: string | null;
    attention_mm: string | null;
    note_en: string | null;
    note_mm: string | null;
};

type RegistrationStep = {
    id: number;
    language: 'en' | 'mm';
    order: number;
    content: string;
    hint: string | null;
};

type BankAccount = {
    id: number;
    order: number;
    bank_name: string;
    account_name: string;
    account_number: string | null;
    qr_image_path?: string | null;
    qr_image_url: string | null;
};

const splitParagraphs = (value?: string | null) => {
    if (!value) return [];
    return value
        .split(/\n\s*\n/g)
        .map((chunk) => chunk.trim())
        .filter(Boolean);
};

export default function RegisterHere() {
    const { settings, steps, bankAccounts } = usePage<{
        settings: RegistrationSettings | null;
        steps: RegistrationStep[];
        bankAccounts: BankAccount[];
    }>().props;

    const [activeTab, setActiveTab] = useState<StepsTab>('en');
    const [activeImage, setActiveImage] = useState<string | null>(null);

    const englishSteps = useMemo(
        () => steps.filter((step) => step.language === 'en'),
        [steps],
    );
    const myanmarSteps = useMemo(
        () => steps.filter((step) => step.language === 'mm'),
        [steps],
    );
    const bankQrImages = useMemo(
        () =>
            bankAccounts
                .map((bank) => ({
                    ...bank,
                    resolved_qr_url:
                        bank.qr_image_url ||
                        (bank.qr_image_path
                            ? `/storage/${bank.qr_image_path}`
                            : null),
                }))
                .filter((bank) => bank.resolved_qr_url),
        [bankAccounts],
    );
    const registerLink = settings?.register_link?.trim() ?? '';

    return (
        <FrontendLayout>
            <Head title="Mathemania Registration">
                <meta
                    name="description"
                    content="Mathemania registration steps, bank account details, and official registration form link."
                />
                <meta
                    name="keywords"
                    content="Mathemania registration, BFI Education Services, math competition registration, Myanmar"
                />
                <meta property="og:title" content="Mathemania Registration" />
                <meta
                    property="og:description"
                    content="Follow the official Mathemania registration steps and submit your form."
                />
                <meta property="og:type" content="website" />
            </Head>
            <section className="mx-auto w-full max-w-6xl px-4 py-10 text-slate-800">
                <header className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-700">
                        Registration
                    </p>
                    <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                        Mathemania Registration
                    </h1>
                    <p className="max-w-3xl text-base text-slate-700">
                        Follow the steps below, review the details carefully, and
                        submit your registration using the official link.
                    </p>
                </header>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Registration Steps
                        </h2>
                        <div className="mt-5 flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab('en')}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    activeTab === 'en'
                                        ? 'bg-slate-900 text-white'
                                        : 'border border-slate-200 text-slate-700 hover:text-slate-900'
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
                                        : 'border border-slate-200 text-slate-700 hover:text-slate-900'
                                }`}
                            >
                                Myanmar
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('bank')}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    activeTab === 'bank'
                                        ? 'bg-slate-900 text-white'
                                        : 'border border-slate-200 text-slate-700 hover:text-slate-900'
                                }`}
                            >
                                Bank Account Detail
                            </button>
                        </div>

                        <div className="mt-6 text-sm leading-relaxed text-slate-700">
                            {activeTab === 'en' && (
                                <div className="space-y-4">
                                    {splitParagraphs(settings?.attention_en).length >
                                        0 && (
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800">
                                            {splitParagraphs(
                                                settings?.attention_en,
                                            ).map((paragraph, index) => (
                                                <p
                                                    key={`en-attention-${index}`}
                                                    className={
                                                        index === 0
                                                            ? 'font-semibold'
                                                            : 'mt-2'
                                                    }
                                                >
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                    <ol className="space-y-3 text-slate-800">
                                        {englishSteps.map((step, index) => (
                                            <li key={step.id}>
                                                Step {index + 1}. {step.content}
                                                {step.hint && (
                                                    <div className="mt-1 text-xs text-slate-700">
                                                        {step.hint}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                        {englishSteps.length === 0 && (
                                            <li className="text-slate-700">
                                                Registration steps will be updated
                                                soon.
                                            </li>
                                        )}
                                    </ol>
                                    {settings?.note_en && (
                                        <p className="text-sm text-slate-700">
                                            {settings.note_en}
                                        </p>
                                    )}
                                </div>
                            )}
                            {activeTab === 'mm' && (
                                <div className="space-y-4">
                                    {splitParagraphs(settings?.attention_mm).length >
                                        0 && (
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800">
                                            {splitParagraphs(
                                                settings?.attention_mm,
                                            ).map((paragraph, index) => (
                                                <p
                                                    key={`mm-attention-${index}`}
                                                    className={
                                                        index === 0
                                                            ? 'font-semibold'
                                                            : 'mt-2'
                                                    }
                                                >
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                    <ol className="space-y-3 text-slate-800">
                                        {myanmarSteps.map((step, index) => (
                                            <li key={step.id}>
                                                အဆင့် {index + 1}။ {step.content}
                                                {step.hint && (
                                                    <div className="mt-1 text-xs text-slate-700">
                                                        {step.hint}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                        {myanmarSteps.length === 0 && (
                                            <li className="text-slate-700">
                                                မှတ်ပုံတင်ရန် အဆင့်များကို မကြာမီ
                                                ထပ်မံ တင်ပြပေးပါမည်။
                                            </li>
                                        )}
                                    </ol>
                                    {settings?.note_mm && (
                                        <p className="text-sm text-slate-700">
                                            {settings.note_mm}
                                        </p>
                                    )}
                                </div>
                            )}
                            {activeTab === 'bank' && (
                                <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800">
                                    <p className="font-semibold">
                                        The BFI Education Services bank accounts
                                        details are as below.
                                    </p>
                                    <div className="space-y-4">
                                        {bankAccounts.map((bank) => {
                                            const resolvedQr =
                                                bank.qr_image_url ||
                                                (bank.qr_image_path
                                                    ? `/storage/${bank.qr_image_path}`
                                                    : null);
                                            return (
                                            <div
                                                key={bank.id}
                                                className="rounded-xl border border-slate-200 bg-white p-4 text-slate-800"
                                            >
                                                <div className="flex flex-wrap items-start justify-between gap-3">
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900">
                                                            {bank.bank_name}
                                                        </p>
                                                        <p className="text-sm">
                                                            {bank.account_name}
                                                        </p>
                                                        {bank.account_number && (
                                                            <p className="text-sm">
                                                                Account number:{' '}
                                                                {
                                                                    bank.account_number
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    {resolvedQr && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setActiveImage(
                                                                    resolvedQr ??
                                                                        null,
                                                                )
                                                            }
                                                            className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-2"
                                                        >
                                                            <img
                                                                src={resolvedQr ?? ''}
                                                                alt={`${bank.bank_name} QR`}
                                                                className="h-16 w-16 object-contain"
                                                            />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            );
                                        })}
                                        {bankAccounts.length === 0 && (
                                            <p className="text-sm text-slate-700">
                                                Bank details will be shared soon.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Registration Form
                        </h2>
                        <p className="mt-3 text-sm text-slate-700">
                            After Reading Registration Steps, please go to this
                            link to register!
                        </p>
                        <a
                            href={registerLink || '#'}
                            target={registerLink ? '_blank' : undefined}
                            rel={registerLink ? 'noopener noreferrer' : undefined}
                            aria-disabled={!registerLink}
                            className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                                registerLink
                                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                                    : 'cursor-not-allowed bg-slate-200 text-slate-500'
                            }`}
                        >
                            {registerLink
                                ? 'Go to This Link to Register !'
                                : 'Registration link is coming soon'}
                        </a>
                        {bankQrImages.length > 0 && (
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                {bankQrImages.map((bank) => (
                                    <button
                                        key={bank.id}
                                        type="button"
                                        className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                        onClick={() =>
                                            setActiveImage(
                                                bank.resolved_qr_url ?? null,
                                            )
                                        }
                                    >
                                        <img
                                            src={bank.resolved_qr_url ?? ''}
                                            alt={`${bank.bank_name} QR`}
                                            className="h-28 w-full object-contain"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                        <p className="mt-5 text-sm text-slate-700">
                            You can practice our Sample Questions{' '}
                            <Link
                                href="/sample-questions-and-answers"
                                className="font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-800"
                            >
                                HERE
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </section>
            {activeImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={() => setActiveImage(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="w-full max-w-2xl rounded-3xl bg-white p-4 shadow-xl md:p-6"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            src={activeImage}
                            alt="Preview"
                            className="h-auto w-full object-contain"
                        />
                    </div>
                </div>
            )}
        </FrontendLayout>
    );
}
