import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/administration-panel/dashboard' },
    { title: 'Users', href: '/administration-panel/users' },
];

export default function UsersIndex() {
    const { users } = usePage<{ users: User[] }>().props;
    const { delete: destroy, processing } = useForm();

    const handleDelete = (userId: number) => {
        if (!window.confirm('Delete this user?')) {
            return;
        }

        destroy(`/administration-panel/users/${userId}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                            Users
                        </h1>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Manage usernames, roles, and access for the admin portal.
                        </p>
                    </div>
                    <Link
                        href="/administration-panel/users/create"
                        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Create User
                    </Link>
                </div>

                <div className="rounded-2xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead className="text-slate-500">
                                <tr>
                                    <th className="pb-2">Name</th>
                                    <th className="pb-2">Username</th>
                                    <th className="pb-2">Email</th>
                                    <th className="pb-2">Role</th>
                                    <th className="pb-2">Created</th>
                                    <th className="pb-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t border-slate-200"
                                    >
                                        <td className="py-3 font-medium">
                                            {user.name}
                                        </td>
                                        <td className="py-3">{user.username ?? '—'}</td>
                                        <td className="py-3">{user.email}</td>
                                        <td className="py-3">
                                            {user.is_admin ? 'Admin' : 'Staff'}
                                        </td>
                                        <td className="py-3">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-3">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`/administration-panel/users/${user.id}/edit`}
                                                    className="text-slate-900 underline underline-offset-4"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(user.id)}
                                                    disabled={processing}
                                                    className="text-red-600 hover:text-red-700 disabled:opacity-60"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
