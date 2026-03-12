import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/administration-panel/dashboard' },
    { title: 'Users', href: '/administration-panel/users' },
    { title: 'Create', href: '/administration-panel/users/create' },
];

export default function UsersCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        is_admin: false,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        post('/administration-panel/users');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                            Create User
                        </h1>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Add a new user who can sign in with a username.
                        </p>
                    </div>
                    <Link
                        href="/administration-panel/users"
                        className="text-sm text-slate-600 underline underline-offset-4"
                    >
                        Back to users
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar"
                >
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                            />
                            {errors.name && (
                                <p className="text-xs text-red-600">{errors.name}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Username</label>
                            <input
                                type="text"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.username}
                                onChange={(event) => setData('username', event.target.value)}
                            />
                            {errors.username && (
                                <p className="text-xs text-red-600">{errors.username}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-600">{errors.email}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Password</label>
                            <input
                                type="password"
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                                value={data.password}
                                onChange={(event) => setData('password', event.target.value)}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-600">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <input
                            id="is_admin"
                            type="checkbox"
                            checked={data.is_admin}
                            onChange={(event) => setData('is_admin', event.target.checked)}
                            className="h-4 w-4 rounded border-slate-300"
                        />
                        <label htmlFor="is_admin" className="text-sm text-slate-700">
                            Grant admin access
                        </label>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                        >
                            {processing ? 'Saving...' : 'Create User'}
                        </button>
                        <Link
                            href="/administration-panel/users"
                            className="text-sm text-slate-600 underline underline-offset-4"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
