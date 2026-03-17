import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

type RegistrationSettings = {
    id: number;
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
    qr_image_url: string | null;
    updated_at?: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/administration-panel/dashboard' },
    { title: 'Registration', href: '/administration-panel/registration' },
];

const formatDateTime = (value?: string | null) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(date);
};

export default function RegistrationAdmin() {
    const { settings, steps, bankAccounts } = usePage<{
        settings: RegistrationSettings | null;
        steps: RegistrationStep[];
        bankAccounts: BankAccount[];
    }>().props;

    const settingsForm = useForm({
        register_link: settings?.register_link ?? '',
        attention_en: settings?.attention_en ?? '',
        attention_mm: settings?.attention_mm ?? '',
        note_en: settings?.note_en ?? '',
        note_mm: settings?.note_mm ?? '',
    });

    const stepForm = useForm({
        language: 'en' as 'en' | 'mm',
        order: 0,
        content: '',
        hint: '',
    });

    const bankForm = useForm<{
        order: number;
        bank_name: string;
        account_name: string;
        account_number: string;
        qr_image: File | null;
    }>({
        order: 0,
        bank_name: '',
        account_name: '',
        account_number: '',
        qr_image: null,
    });

    const [editingStepId, setEditingStepId] = useState<number | null>(null);
    const [editingBankId, setEditingBankId] = useState<number | null>(null);
    const [activeSection, setActiveSection] = useState<
        'settings' | 'steps' | 'banks'
    >('settings');

    const stepCounts = useMemo(() => {
        return steps.reduce(
            (acc, step) => {
                acc[step.language] += 1;
                return acc;
            },
            { en: 0, mm: 0 },
        );
    }, [steps]);

    const handleSettingsSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        settingsForm.post('/administration-panel/registration/settings', {
            preserveScroll: true,
        });
    };

    const handleStepSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (editingStepId) {
            stepForm.put(
                `/administration-panel/registration/steps/${editingStepId}`,
                { preserveScroll: true },
            );
            return;
        }

        stepForm.post('/administration-panel/registration/steps', {
            preserveScroll: true,
        });
    };

    const handleStepEdit = (step: RegistrationStep) => {
        setEditingStepId(step.id);
        stepForm.setData({
            language: step.language,
            order: step.order ?? 0,
            content: step.content ?? '',
            hint: step.hint ?? '',
        });
    };

    const handleStepCancel = () => {
        setEditingStepId(null);
        stepForm.reset();
    };

    const handleStepDelete = (stepId: number) => {
        router.delete(`/administration-panel/registration/steps/${stepId}`, {
            preserveScroll: true,
        });
    };

    const handleBankSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (editingBankId) {
            bankForm.post(
                `/administration-panel/registration/banks/${editingBankId}`,
                {
                    preserveScroll: true,
                    forceFormData: true,
                },
            );
            return;
        }

        bankForm.post('/administration-panel/registration/banks', {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const handleBankEdit = (bank: BankAccount) => {
        setEditingBankId(bank.id);
        bankForm.setData({
            order: bank.order ?? 0,
            bank_name: bank.bank_name ?? '',
            account_name: bank.account_name ?? '',
            account_number: bank.account_number ?? '',
            qr_image: null,
        });
    };

    const handleBankCancel = () => {
        setEditingBankId(null);
        bankForm.reset();
    };

    const handleBankDelete = (bankId: number) => {
        router.delete(`/administration-panel/registration/banks/${bankId}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registration" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                Registration Management
                            </h2>
                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                                Choose a section below to update the public Registration page.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: 'settings', label: 'Link & Notes' },
                                { id: 'steps', label: 'Steps' },
                                { id: 'banks', label: 'Bank Accounts' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() =>
                                        setActiveSection(
                                            item.id as 'settings' | 'steps' | 'banks',
                                        )
                                    }
                                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                        activeSection === item.id
                                            ? 'bg-slate-900 text-white'
                                            : 'border border-slate-200 text-slate-700 hover:text-slate-900'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {activeSection === 'settings' && (
                    <div className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    Registration Link & Notes
                                </h3>
                                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                                    Update the registration link and the guidance text shown above the steps.
                                </p>
                            </div>
                            {settings && (
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                    Saved settings
                                </span>
                            )}
                        </div>

                        <form
                            onSubmit={handleSettingsSubmit}
                            className="mt-6 grid gap-4 md:grid-cols-2"
                        >
                            <div className="grid gap-2 md:col-span-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Register Link
                                </label>
                                <input
                                    type="url"
                                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                    value={settingsForm.data.register_link}
                                    onChange={(event) =>
                                        settingsForm.setData(
                                            'register_link',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="https://forms.gle/..."
                                />
                                {settingsForm.errors.register_link && (
                                    <p className="text-xs text-red-600">
                                        {settingsForm.errors.register_link}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    English Highlight
                                </label>
                                <textarea
                                    rows={4}
                                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                    value={settingsForm.data.attention_en}
                                    onChange={(event) =>
                                        settingsForm.setData(
                                            'attention_en',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Use blank lines to separate paragraphs."
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Myanmar Highlight
                                </label>
                                <textarea
                                    rows={4}
                                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                    value={settingsForm.data.attention_mm}
                                    onChange={(event) =>
                                        settingsForm.setData(
                                            'attention_mm',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Use blank lines to separate paragraphs."
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    English Note
                                </label>
                                <textarea
                                    rows={3}
                                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                    value={settingsForm.data.note_en}
                                    onChange={(event) =>
                                        settingsForm.setData(
                                            'note_en',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Optional small note shown under English steps."
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Myanmar Note
                                </label>
                                <textarea
                                    rows={3}
                                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                    value={settingsForm.data.note_mm}
                                    onChange={(event) =>
                                        settingsForm.setData(
                                            'note_mm',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Optional small note shown under Myanmar steps."
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={settingsForm.processing}
                                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                                >
                                    {settingsForm.processing ? 'Saving...' : 'Save Settings'}
                                </button>
                                {settingsForm.recentlySuccessful && (
                                    <span className="text-sm text-emerald-600">
                                        Saved.
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                )}

                {activeSection === 'steps' && (
                    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                        <div className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        Registration Steps
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                                        Add or edit steps in English and Myanmar.
                                    </p>
                                </div>
                                {editingStepId && (
                                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                        Editing step #{editingStepId}
                                    </span>
                                )}
                            </div>

                            <form
                                onSubmit={handleStepSubmit}
                                className="mt-6 grid gap-4 md:grid-cols-2"
                            >
                                <div className="grid gap-2">
                                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                        Language
                                    </label>
                                    <select
                                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                        value={stepForm.data.language}
                                        onChange={(event) =>
                                            stepForm.setData(
                                                'language',
                                                event.target.value as 'en' | 'mm',
                                            )
                                        }
                                    >
                                        <option value="en">English</option>
                                        <option value="mm">Myanmar</option>
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                        Order
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                        value={stepForm.data.order}
                                        onChange={(event) =>
                                            stepForm.setData(
                                                'order',
                                                Number(event.target.value),
                                            )
                                        }
                                    />
                                </div>
                                <div className="grid gap-2 md:col-span-2">
                                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                        Step Content
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                        value={stepForm.data.content}
                                        onChange={(event) =>
                                            stepForm.setData('content', event.target.value)
                                        }
                                        placeholder="Write the step without numbering."
                                    />
                                    {stepForm.errors.content && (
                                        <p className="text-xs text-red-600">
                                            {stepForm.errors.content}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2 md:col-span-2">
                                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                        Hint (optional)
                                    </label>
                                    <textarea
                                        rows={2}
                                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                        value={stepForm.data.hint}
                                        onChange={(event) =>
                                            stepForm.setData('hint', event.target.value)
                                        }
                                        placeholder="Optional supporting text shown under the step."
                                    />
                                </div>

                                <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={stepForm.processing}
                                        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                                    >
                                        {stepForm.processing
                                            ? 'Saving...'
                                            : editingStepId
                                              ? 'Update Step'
                                              : 'Add Step'}
                                    </button>
                                    {editingStepId && (
                                        <button
                                            type="button"
                                            onClick={handleStepCancel}
                                            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>

                            <div className="mt-8 overflow-x-auto">
                                <table className="w-full min-w-[720px] text-left text-sm">
                                    <thead className="text-slate-600">
                                        <tr>
                                            <th className="pb-2">Order</th>
                                            <th className="pb-2">Language</th>
                                            <th className="pb-2">Content</th>
                                            <th className="pb-2">Hint</th>
                                            <th className="pb-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-800">
                                        {steps.map((step) => (
                                            <tr
                                                key={step.id}
                                                className="border-t border-slate-200"
                                            >
                                                <td className="py-3">{step.order}</td>
                                                <td className="py-3">
                                                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                                                        {step.language === 'en'
                                                            ? 'English'
                                                            : 'Myanmar'}
                                                    </span>
                                                </td>
                                                <td className="py-3 font-medium text-slate-900">
                                                    {step.content}
                                                </td>
                                                <td className="py-3 text-slate-600">
                                                    {step.hint || '—'}
                                                </td>
                                                <td className="py-3">
                                                    <div className="flex flex-wrap gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleStepEdit(step)
                                                            }
                                                            className="text-slate-900 underline underline-offset-4"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleStepDelete(step.id)
                                                            }
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {steps.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="py-6 text-center text-sm text-slate-600"
                                                >
                                                    No steps yet. Add the first one above.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                Steps Summary
                            </h3>
                            <div className="mt-4 grid gap-4">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                        English Steps
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold admin-accent">
                                        {stepCounts.en}
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                        Myanmar Steps
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold admin-accent-strong">
                                        {stepCounts.mm}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'banks' && (
                    <div className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    Bank Account Details
                                </h3>
                                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                                    Manage bank details and upload QR images for the public page.
                                </p>
                            </div>
                            {editingBankId && (
                                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                    Editing bank #{editingBankId}
                                </span>
                            )}
                        </div>

                        <form
                            onSubmit={handleBankSubmit}
                            className="mt-6 grid gap-4 md:grid-cols-2"
                        >
                            <div className="grid gap-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                    value={bankForm.data.order}
                                    onChange={(event) =>
                                        bankForm.setData(
                                            'order',
                                            Number(event.target.value),
                                        )
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Bank Name
                                </label>
                                <input
                                    type="text"
                                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                    value={bankForm.data.bank_name}
                                    onChange={(event) =>
                                        bankForm.setData(
                                            'bank_name',
                                            event.target.value,
                                        )
                                    }
                                />
                                {bankForm.errors.bank_name && (
                                    <p className="text-xs text-red-600">
                                        {bankForm.errors.bank_name}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Account Name
                                </label>
                                <input
                                    type="text"
                                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                    value={bankForm.data.account_name}
                                    onChange={(event) =>
                                        bankForm.setData(
                                            'account_name',
                                            event.target.value,
                                        )
                                    }
                                />
                                {bankForm.errors.account_name && (
                                    <p className="text-xs text-red-600">
                                        {bankForm.errors.account_name}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Account Number / Phone
                                </label>
                                <input
                                    type="text"
                                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                    value={bankForm.data.account_number}
                                    onChange={(event) =>
                                        bankForm.setData(
                                            'account_number',
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    QR Image (optional)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                                    onChange={(event) =>
                                        bankForm.setData(
                                            'qr_image',
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                />
                                {bankForm.errors.qr_image && (
                                    <p className="text-xs text-red-600">
                                        {bankForm.errors.qr_image}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={bankForm.processing}
                                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                                >
                                    {bankForm.processing
                                        ? 'Saving...'
                                        : editingBankId
                                          ? 'Update Bank'
                                          : 'Add Bank'}
                                </button>
                                {editingBankId && (
                                    <button
                                        type="button"
                                        onClick={handleBankCancel}
                                        className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="mt-6 overflow-x-auto">
                            <table className="w-full min-w-[760px] text-left text-sm">
                                <thead className="text-slate-600">
                                    <tr>
                                        <th className="pb-2">Order</th>
                                        <th className="pb-2">Bank</th>
                                        <th className="pb-2">Account</th>
                                        <th className="pb-2">QR</th>
                                        <th className="pb-2">Updated</th>
                                        <th className="pb-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-800">
                                    {bankAccounts.map((bank) => (
                                        <tr
                                            key={bank.id}
                                            className="border-t border-slate-200"
                                        >
                                            <td className="py-3">{bank.order}</td>
                                            <td className="py-3">
                                                <p className="font-semibold text-slate-900">
                                                    {bank.bank_name}
                                                </p>
                                                <p className="text-xs text-slate-600">
                                                    {bank.account_name}
                                                </p>
                                            </td>
                                            <td className="py-3">
                                                {bank.account_number || '—'}
                                            </td>
                                            <td className="py-3">
                                                {bank.qr_image_url ? (
                                                    <img
                                                        src={bank.qr_image_url}
                                                        alt={`${bank.bank_name} QR`}
                                                        className="h-12 w-12 rounded-md border border-slate-200 object-contain"
                                                    />
                                                ) : (
                                                    '—'
                                                )}
                                            </td>
                                            <td className="py-3">
                                                {formatDateTime(bank.updated_at)}
                                            </td>
                                            <td className="py-3">
                                                <div className="flex flex-wrap gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleBankEdit(bank)
                                                        }
                                                        className="text-slate-900 underline underline-offset-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleBankDelete(bank.id)
                                                        }
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {bankAccounts.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="py-6 text-center text-sm text-slate-600"
                                            >
                                                No bank accounts yet. Add the first one above.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
