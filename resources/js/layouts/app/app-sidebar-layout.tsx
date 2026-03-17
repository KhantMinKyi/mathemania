import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent
                variant="sidebar"
                className="overflow-x-hidden text-slate-900 dark:text-white [&_.text-slate-600]:text-slate-700 [&_.text-slate-500]:text-slate-600 [&_.text-slate-400]:text-slate-600 dark:[&_.text-slate-900]:text-white dark:[&_.text-slate-800]:text-white dark:[&_.text-slate-700]:text-white dark:[&_.text-slate-600]:text-white dark:[&_.text-slate-500]:text-white dark:[&_.text-slate-400]:text-white [&_a:hover]:cursor-pointer [&_button:hover]:cursor-pointer [&_a:hover]:text-slate-900 dark:[&_a:hover]:text-white dark:[&_.bg-white]:bg-[color:var(--card)] dark:[&_.bg-slate-50]:bg-[color:var(--muted)] dark:[&_.bg-slate-100]:bg-[color:var(--muted)] dark:[&_.bg-slate-200]:bg-[color:var(--accent)] dark:[&_.border-slate-200]:border-[color:var(--border)] dark:[&_.border-slate-100]:border-[color:var(--border)] dark:[&_.bg-slate-900]:bg-[color:var(--accent)] dark:[&_.text-white]:text-white dark:[&_.bg-slate-900:hover]:bg-[color:var(--primary)] dark:[&_.bg-slate-900:hover]:text-[color:var(--primary-foreground)]"
            >
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
