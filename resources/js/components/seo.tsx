import { Head, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

type JsonLd =
    | Record<string, unknown>
    | Array<Record<string, unknown>>;

type SeoProps = {
    title: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article' | 'profile';
    keywords?: string;
    canonical?: string;
    noindex?: boolean;
    jsonLd?: JsonLd;
};

const defaultDescription =
    'Mathemania is an annual math-based puzzle competition organized by BFI Education Services, designed to build students’ analytical, visual, and problem-solving skills.';
const defaultKeywords =
    'Mathemania, math competition, Myanmar, BFI Education Services, puzzle competition, students, schools';

const normalizeUrl = (value: string, baseUrl?: string) => {
    if (!value) return value;
    if (value.startsWith('http://') || value.startsWith('https://')) {
        return value;
    }
    if (!baseUrl) {
        return value;
    }
    return new URL(value, baseUrl).toString();
};

export default function Seo({
    title,
    description = defaultDescription,
    image = '/img/mathemania.png',
    type = 'website',
    keywords,
    canonical,
    noindex = false,
    jsonLd,
}: SeoProps) {
    const { url, props } = usePage<
        SharedData & {
            appUrl?: string;
            appName?: string;
            appLocale?: string;
        }
    >();
    const appUrl = props.appUrl;
    const appName = props.appName || 'Mathemania';
    const appLocale = props.appLocale || 'en_US';
    const canonicalUrl = canonical || (appUrl ? new URL(url, appUrl).toString() : undefined);
    const imageUrl = normalizeUrl(image, appUrl);
    const fullTitle = title ? `${title} - ${appName}` : appName;
    const keywordContent = keywords || defaultKeywords;

    return (
        <Head title={title}>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywordContent} />
            <meta
                name="robots"
                content={noindex ? 'noindex,nofollow' : 'index,follow'}
            />

            {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

            <meta property="og:site_name" content={appName} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
            {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
            {appLocale ? <meta property="og:locale" content={appLocale} /> : null}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}

            {jsonLd ? (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            ) : null}
        </Head>
    );
}
