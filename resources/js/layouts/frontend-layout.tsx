import AppLogo from '@/components/app-logo';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren, useEffect, useState } from 'react';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Register Here', href: '/register-here' },
    { label: 'Rules and Regulation', href: '/rules-and-regulation' },
];

export default function FrontendLayout({
    children,
    transparentHeader = false,
}: PropsWithChildren<{ transparentHeader?: boolean }>) {
    const { url } = usePage();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 16);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const isActive = (href: string) =>
        href === '/' ? url === '/' : url.startsWith(href);

    const isSolid = isScrolled || !transparentHeader;

    return (
        <div className="flex min-h-screen flex-col font-bold bg-cyan-50 text-slate-900">
            <header
                className={`sticky top-0 z-40 transition-colors duration-300 ${
                    isSolid
                        ? 'border-b border-slate-200 bg-white/95 text-slate-900 backdrop-blur'
                        : 'border-b border-transparent bg-transparent text-white'
                }`}
            >
                <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
                    <Link
                        href="/"
                        className={`flex items-center gap-2 ${
                            isSolid ? 'text-slate-900' : 'text-white'
                        }`}
                        onClick={() => setMobileOpen(false)}
                    >
                        <AppLogo />
                    </Link>

                    <button
                        type="button"
                        className={`rounded-md border px-3 py-2 text-sm font-medium md:hidden ${
                            isSolid
                                ? 'border-slate-200 text-slate-700'
                                : 'border-white/40 text-white'
                        }`}
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-expanded={mobileOpen}
                        aria-controls="frontend-nav"
                    >
                        Menu
                    </button>

                    <nav className="hidden items-center gap-6 md:flex text-lg">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={
                                    isActive(item.href)
                                        ? isSolid
                                            ? 'text-cyan-700'
                                            : 'text-cyan-700'
                                        : isSolid
                                          ? 'text-slate-600 hover:text-slate-900'
                                          : 'text-white/80 hover:text-white'
                                }
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div
                    id="frontend-nav"
                    className={`border-t border-slate-200 bg-white md:hidden ${
                        mobileOpen ? 'block' : 'hidden'
                    }`}
                >
                    <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={
                                    isActive(item.href)
                                        ? 'text-cyan-700'
                                        : 'text-slate-600 hover:text-slate-900'
                                }
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="flex-1  py-10 ">
                {children}
            </main>

            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src="/img/bfi.webp"
                            alt="BFI logo"
                            className="h-16 w-auto object-contain"
                        />
                        <img
                            src="/img/mathemania.png"
                            alt="Mathemania logo"
                            className="h-16 w-auto object-contain"
                        />
                    </div>
                    <div className="flex flex-col gap-3 text-sm md:items-end">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-500">
                            School Links
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://skt.edu.mm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 hover:text-slate-900"
                            >
                                SKT International School
                            </a>
                            <a
                                href="https://misa.edu.mm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 hover:text-slate-900"
                            >
                                Mandalay International School of Acumen
                            </a>
                            <a
                                href="https://nisa.edu.mm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 hover:text-slate-900"
                            >
                                  Naypyitaw International School of Acumen
                            </a>
                            <a
                                href="https://bfi.edu.mm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 hover:text-slate-900"
                            >
                                BFI Education Services
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-200">
                    <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                            <span>Copyright © 2026 Mathemania</span>
                            <Link
                                href="/privacy-policy"
                                className="text-slate-500 hover:text-slate-900"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                        <span>Developed by BFI Education Services's Developer</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
