import Seo from '@/components/seo';
import FrontendLayout from '@/layouts/frontend-layout';
import { usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';

const heroVideoSrc =
    '/video/Mathemania-Event-Small-Size%20(1).mp4';

type AnnouncementTab = 'en' | 'mm';

type Timeline = {
    id: number;
    order: number;
    label: string;
    title: string;
    primary_label: string | null;
    primary_date: string | null;
    secondary_label: string | null;
    secondary_date: string | null;
};

type Announcement = {
    id: number;
    heading: string;
    title: string;
    content_en: string;
    content_mm: string;
    is_active: boolean;
};

const examCenters = [
    {
        name: 'SKT International School',
        location: 'Riverside Campus, Yangon',
        image: '/img/skt_riverside_campus.webp',
    },
    {
        name: 'Naypyidaw International School of Acumen',
        location: 'NISA Campus, Naypyidaw',
        image: '/img/nisa.webp',
    },
    {
        name: 'Mandalay International School of Acumen',
        location: 'MISA Campus, Mandalay',
        image: '/img/misa.webp',
    },
];

export default function Welcome() {
    const { timelines = [], announcement, appUrl } = usePage<{
        timelines?: Timeline[];
        announcement?: Announcement | null;
        appUrl?: string;
    }>().props;
    const [activeTab, setActiveTab] = useState<AnnouncementTab>('en');
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [carouselIndex, setCarouselIndex] = useState(0);

    const scrollCarousel = (direction: 'prev' | 'next') => {
        const nextIndex =
            direction === 'next'
                ? (carouselIndex + 1) % examCenters.length
                : (carouselIndex - 1 + examCenters.length) % examCenters.length;

        setCarouselIndex(nextIndex);
        slideRefs.current[nextIndex]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        });
    };

    const fallbackTimelines: Timeline[] = [
        {
            id: 1,
            order: 1,
            label: 'Registration',
            title: 'Registration Window',
            primary_label: 'Starts',
            primary_date: '2025-07-25',
            secondary_label: 'Closes',
            secondary_date: '2025-08-31',
        },
        {
            id: 2,
            order: 2,
            label: 'Competition',
            title: 'Competition Date',
            primary_label: null,
            primary_date: '2025-09-13',
            secondary_label: 'Results',
            secondary_date: '2025-10-15',
        },
        {
            id: 3,
            order: 3,
            label: 'Ceremony',
            title: 'Awarding Ceremony',
            primary_label: null,
            primary_date: '2025-10-25',
            secondary_label: null,
            secondary_date: null,
        },
    ];

    const timelineItems = timelines.length > 0 ? timelines : fallbackTimelines;

    const fallbackAnnouncement: Announcement = {
        id: 0,
        heading: 'IMPORTANT ANNOUCEMENT!',
        title: 'Mathemania 2025–2026',
        content_en: `Dear participants,

Mathemania is an annual math-based puzzle competition organized by BFI Education Services since 2005. It comprises three levels, each featuring a variety of mathematics-based puzzles.

The purpose of this contest is to boost enthusiasm for mathematics and strengthen students’ analytical, visual, critical thinking, and problem-solving skills. It also inspires students to develop perseverance and resilience. Mathemania challenges mathematics enthusiasts and encourages them to appreciate the subject in diverse and engaging ways.

We are excited to host the 21st MATHEMANIA (2025–2026) on 13 September 2025 at three campuses across Myanmar: SKT International School (Riverside Campus) in Yangon, Naypyidaw International School of Acumen (NISA) in Naypyidaw, and Mandalay International School of Acumen (MISA) in Mandalay.

Please kindly read the contest information and rules & regulations, and sign up!

With best wishes,
BFI Education Services`,
        content_mm: `မင်္ဂလာပါ စိတ်ပါဝင်စားသော ကျောင်းသား/သူများနှင့် လူကြီးမိဘများခင်ဗျ,

Mathemania ပြိုင်ပွဲသည် ၂၀၀၅ ခုနှစ်မှစတင်၍ BFI Education Services Co.Ltd မှ နှစ်စဉ်ကျင်းပသော ပြိုင်ပွဲတစ်ခုဖြစ်ပြီး မူလတန်း၊ အလယ်တန်းနှင့် အထက်တန်းကျောင်းသားကျောင်းသူများအတွက် ရည်ရွယ်ထားသော ဘက်စုံသချာၤ ဉာဏ်စမ်းပြိုင်ပွဲ ဖြစ်ပါသည်။

ဤပြိုင်ပွဲတွင် မတူညီသောအဆင့် ၃ ခုပါဝင်သည်။ အဆင့်တစ်ခုစီတွင် သင်္ချာအခြေခံပဟေဠိများ အမျိုးမျိုးပါဝင်ပါသည်။ ဤပြိုင်ပွဲ၏ ရည်ရွယ်ချက်မှာ သင်္ချာဘာသာရပ်အပေါ် စိတ်အားထက်သန်မှုနှင့် ကျောင်းသားများ၏ သုံးသပ် ဝေဖန် ပိုင်းခြားတွေးခေါ်မှု စွမ်းရည်/အမြင်စွမ်းရည်/ ပြသနာများကို ဖြေရှင်း နိုင်သည့်စွမ်းရည်များ ကို မြှင့်တင်ရန်ဖြစ်သည်။ ထို့ပြင် ယခုပြိုင်ပွဲမျိုးသည် ကျောင်းသားများ၏ ဇွဲ လုံ့လ အပြည့်ဖြင့် လိုရာပန်းတိုင်သို့ တစိုက်မတ်မတ် သွားလိုစိတ်ကိုလည်း မြှင့်တင်ပေးပါသည်။ ဤပြိုင်ပွဲသည် သင်္ချာဝါသနာရှင်ကျောင်းသားများကို စိန်ခေါ် ပြီး သင်္ချာကို နည်းအမျိုးမျိုးဖြင့် နှစ်သက်လာစေရန် ထောက်ပံ့ ပေးပါသည်။ ကျွန်ုပ်တို့၏ ၂၁ကြိမ်မြောက် Mathemania ပြိုင်ပွဲမှ ကြိုဆိုပါသည်။

ပြိုင်ပွဲတွင် ကျောင်းသားကျောင်းသူများသည် မိမိတို့၏ ရွယ်တူချင်းများနှင့် ပျော်ရွင်စွာဉာဏ်ရည် ယှဉ်ပြိုင်ရင်း သင်္ချာဆိုင်ရာ ဘက်စုံစွမ်းရည်များ တိုးတက်စေမည်ဟု ယုံကြည်ပါသည်။

ကျေးဇူးပြုပြီး ပြိုင်ပွဲဝင် အချက်အလက်များနှင့် စည်းကမ်းချက်များအား သေချာဖတ်ရှုပြီးမှ စာရင်းပေးသွင်းပေးပါရန် လေးစားစွာ ပန်ကြားအပ်ပါတယ်။

ဆန္ဒမွန်များစွာဖြင့်
BFI Education Services`,
        is_active: false,
    };

    const announcementContent = announcement ?? fallbackAnnouncement;
    const parseParagraphs = (content: string) =>
        content
            .split(/\n{2,}/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);
    const renderParagraph = (paragraph: string, key: string) => {
        const lines = paragraph.split('\n');
        return (
            <p key={key}>
                {lines.map((line, index) => (
                    <span key={`${key}-line-${index}`}>
                        {line}
                        {index < lines.length - 1 && <br />}
                    </span>
                ))}
            </p>
        );
    };

    const formatDate = (value?: string | null) => {
        if (!value) return null;
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    const jsonLd = appUrl
        ? {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Mathemania',
              url: appUrl,
              logo: new URL('/img/mathemania.png', appUrl).toString(),
              sameAs: ['https://bfi.edu.mm'],
          }
        : undefined;

    return (
        <FrontendLayout transparentHeader>
            <Seo
                title="Mathemania 2025–2026"
                description="Official Mathemania math puzzle competition by BFI Education Services. View announcements, exam dates, venues, and registration information."
                image="/img/mathemania.png"
                jsonLd={jsonLd}
            />
            <section className=" h-screen overflow-hidden">
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={heroVideoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />
            </section>

            <section className="mx-auto  p-4  mt-12 grid w-full max-w-6xl items-center gap-10 md:mt-16 md:grid-cols-2">
                <div className="space-y-4 text-lg text-slate-700">
                    <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl">
                        Please kindly read the information regarding the contest as
                        well as rules & regulations and sign up!
                    </h2>
                    <p className="text-base text-slate-600 md:text-lg">
                        Stay informed on eligibility, scoring, and event timelines
                        before registering.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                        <img
                            src="/img/bfi.webp"
                            alt="BFI logo"
                            className="h-20 w-auto object-contain"
                        />
                        <img
                            src="/img/mathemania.png"
                            alt="Mathemania logo"
                            className="h-36 w-auto object-contain md:h-28"
                        />
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <img
                            src="/img/misa.webp"
                            alt="MISA logo"
                            className="h-10 w-auto object-contain"
                        />
                        <img
                            src="/img/nisa.webp"
                            alt="NISA logo"
                            className="h-10 w-auto object-contain"
                        />
                        <img
                            src="/img/skt_city_campus.webp"
                            alt="SKT City Campus logo"
                            className="h-10 w-auto object-contain"
                        />
                        <img
                            src="/img/skt_riverside_campus.webp"
                            alt="SKT Riverside Campus logo"
                            className="h-10 w-auto object-contain"
                        />
                    </div>
                </div>
            </section>

            <section className="mx-auto mt-16  w-full max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                            {announcementContent.heading}
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
                            {announcementContent.title}
                        </h2>
                    </div>
                    <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1">
                        <button
                            type="button"
                            onClick={() => setActiveTab('en')}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                activeTab === 'en'
                                    ? 'bg-slate-900 text-white'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            English
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('mm')}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                activeTab === 'mm'
                                    ? 'bg-slate-900 text-white'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Myanmar
                        </button>
                    </div>
                </div>

                <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-700">
                    {activeTab === 'en' ? (
                        parseParagraphs(announcementContent.content_en).map(
                            (paragraph, index) =>
                                renderParagraph(paragraph, `en-${index}`),
                        )
                    ) : (
                        parseParagraphs(announcementContent.content_mm).map(
                            (paragraph, index) =>
                                renderParagraph(paragraph, `mm-${index}`),
                        )
                    )}
                </div>
            </section>

            <section className="mx-auto mt-16  p-4  w-full max-w-6xl">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                            Key Dates
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
                            Competition Timeline
                        </h2>
                    </div>
                    <p className="max-w-lg text-sm text-slate-600">
                        Follow the timeline to stay on track from registration to
                        awarding.
                    </p>
                </div>

                <div className="relative mt-10">
                    <div className="absolute left-6 top-0 hidden h-full w-px bg-slate-200 md:block" />
                    <div className="grid gap-6 md:gap-8">
                        {timelineItems.map((timeline, index) => {
                            const primaryDate = formatDate(
                                timeline.primary_date,
                            );
                            const secondaryDate = formatDate(
                                timeline.secondary_date,
                            );

                            return (
                                <div
                                    key={timeline.id}
                                    className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:pl-16"
                                >
                                    <div className="absolute left-2 top-6 hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-900 md:flex">
                                        {index + 1}
                                    </div>
                                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                                                {timeline.label}
                                            </p>
                                            <h3 className="mt-2 text-lg font-semibold text-slate-900">
                                                {timeline.title}
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                                            {primaryDate && (
                                                <span className="rounded-full border border-slate-200 px-3 py-1">
                                                    {timeline.primary_label
                                                        ? `${timeline.primary_label}: `
                                                        : ''}
                                                    {primaryDate}
                                                </span>
                                            )}
                                            {secondaryDate && (
                                                <span className="rounded-full border border-slate-200 px-3 py-1">
                                                    {timeline.secondary_label
                                                        ? `${timeline.secondary_label}: `
                                                        : ''}
                                                    {secondaryDate}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative py-16 mt-16 w-full overflow-hidden ">
                <div className="absolute inset-0 bg-[url('/img/footer-banner.webp')] bg-no-repeat bg-cover opacity-65" />
                <div className="relative grid gap-6 p-4 md:grid-cols-[1.2fr_0.8fr] md:items-center  container max-w-6xl mx-auto">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                            MATHEMANIA
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-slate-900 md:text-3xl">
                            The purpose of this contest is to boost enthusiasm
                            towards Mathematics and strengthen the
                            analytical/visual/critical thinking and
                            problem-solving skills of students.
                        </h2>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                        <p className="font-semibold text-slate-900">
                            Designed for growth
                        </p>
                        <p className="mt-2">
                            Mathemania helps students build confidence, curiosity,
                            and resilience through engaging puzzle challenges.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto mt-16 w-full max-w-6xl p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                            MATHEMANIA
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
                            EXAM CENTER
                        </h2>
                    </div>
                    <p className="max-w-lg text-sm text-slate-600">
                        Explore the three official campuses hosting Mathemania.
                    </p>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => scrollCarousel('prev')}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                        aria-label="Scroll to previous exam center"
                    >
                        Prev
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollCarousel('next')}
                        className="rounded-full border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                        aria-label="Scroll to next exam center"
                    >
                        Next
                    </button>
                </div>

                <div className="mt-6 flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth">
                    {examCenters.map((center, index) => (
                        <div
                            key={center.name}
                            ref={(el) => {
                                slideRefs.current[index] = el;
                            }}
                            className="group relative h-64 min-w-[260px] snap-center overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm sm:min-w-[320px] md:min-w-[360px]"
                        >
                            <img
                                src={center.image}
                                alt={center.name}
                                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                                <p className="text-sm font-semibold">
                                    {center.name}
                                </p>
                                <p className="text-xs text-white/80">
                                    {center.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </FrontendLayout>
    );
}
