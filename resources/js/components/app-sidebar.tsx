import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    CalendarRange,
    ClipboardList,
    FileText,
    LayoutGrid,
    Megaphone,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

const baseNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Simple Q&A',
        href: '/administration-panel/simple-q-a',
        icon: FileText,
    },
    {
        title: 'Exam Results',
        href: '/administration-panel/exam-results',
        icon: FileText,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = Boolean(auth?.user?.is_admin);
    const mainNavItems: NavItem[] = [
        ...baseNavItems,
        ...(isAdmin
            ? [
                  {
                      title: 'Competition Timeline',
                      href: '/administration-panel/competition-timeline',
                      icon: CalendarRange,
                  },
                  {
                      title: 'Registration',
                      href: '/administration-panel/registration',
                      icon: ClipboardList,
                  },
                  {
                      title: 'Rules & Regulations',
                      href: '/administration-panel/rules-and-regulation',
                      icon: FileText,
                  },
                  {
                      title: 'Announcements',
                      href: '/administration-panel/announcements',
                      icon: Megaphone,
                  },
                  {
                      title: 'Users',
                      href: '/administration-panel/users',
                      icon: Users,
                  },
              ]
            : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
