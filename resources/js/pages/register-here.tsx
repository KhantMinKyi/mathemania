import FrontendLayout from '@/layouts/frontend-layout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

type StepsTab = 'en' | 'mm' | 'bank';

export default function RegisterHere() {
    const [activeTab, setActiveTab] = useState<StepsTab>('en');
    const [activeImage, setActiveImage] = useState<string | null>(null);

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
            <section className="mx-auto w-full max-w-6xl px-4 py-10">
                <header className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                        Registration
                    </p>
                    <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                        Mathemania Registration
                    </h1>
                    <p className="max-w-3xl text-base text-slate-600">
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
                            <button
                                type="button"
                                onClick={() => setActiveTab('bank')}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    activeTab === 'bank'
                                        ? 'bg-slate-900 text-white'
                                        : 'border border-slate-200 text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Bank Account Detail
                            </button>
                        </div>

                        <div className="mt-6 text-sm leading-relaxed text-slate-600">
                            {activeTab === 'en' && (
                                <div className="space-y-4">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                                        <p className="font-semibold">
                                            Be attentive:
                                        </p>
                                        <p className="mt-2">
                                            Registration can be done by a teacher
                                            for a group of students or individually
                                            by a student or parents.
                                        </p>
                                        <p className="mt-2">
                                            You can choose the language you like
                                            to fill out the form, but fill out the
                                            application in English only.
                                        </p>
                                        <p className="mt-2">
                                            Be attentive: Registration can be done
                                            by a teacher for a group of students or
                                            individually by a student or his
                                            parents. A unique email address is
                                            required for each enrolled student. You
                                            can choose the language you like to
                                            fill out the form, but fill out the
                                            application in English only.
                                        </p>
                                    </div>
                                    <ol className="space-y-3">
                                        <li>Step 1. Enter your full name</li>
                                        <li>Step 2. Fill in your father’s name.</li>
                                        <li>Step 3. Select your gender.</li>
                                        <li>Step 4. Fill in your date of birth.</li>
                                        <li>Step 5. Select Myanmar as a country.</li>
                                        <li>Step 6. Write your school name.</li>
                                        <li>Step 7. Fill in your home address.</li>
                                        <li>Step 8. Fill in your phone number.</li>
                                        <li>
                                            Step 9. Upload your NRC or Student ID.
                                            <div className="mt-1 text-xs text-slate-500">
                                                (Upload any document that proves
                                                your date of birth. Example: Birth
                                                certificate or NRC)
                                            </div>
                                        </li>
                                        <li>
                                            Step 10. Choose your Level & Age Group
                                            (Class)
                                            <div className="mt-1 text-xs text-slate-500">
                                                (Please choose the Level close to
                                                your grade if your actual Grade is
                                                not in the default range once your
                                                DOB is valid for application.)
                                            </div>
                                        </li>
                                        <li>
                                            Step 11. Choose your competition
                                            center
                                        </li>
                                        <li>
                                            Step 12. Make payment and upload the
                                            screenshot or Receipt of your payment
                                            (receipt, screenshot etc.)
                                        </li>
                                        <li>Step 13. Click on the Signup button.</li>
                                    </ol>
                                    <p className="text-sm text-slate-600">
                                        Note: Please contact 09754644440 to confirm
                                        your online registration and any questions
                                        before October 26.
                                    </p>
                                </div>
                            )}
                            {activeTab === 'mm' && (
                                <div className="space-y-4">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                                        မှတ်ချက် – ဖောင်ဖြည့်ရန် သင်နှစ်သက်သည့်
                                        ဘာသာစကားကို သင်ရွေးချယ်နိုင်သော်လည်း
                                        လျှောက်လွှာကို အင်္ဂလိပ်ဘာသာဖြင့်သာ
                                        ဖြည့်စွက်ပေးပါရန်။
                                    </div>
                                    <ol className="space-y-3">
                                        <li>အဆင့် ၁။ သင့်အမည်အပြည့်အစုံကို ဖြည့်ပါ။</li>
                                        <li>အဆင့် ၂။ သင့်ဖခင်အမည်ကို ဖြည့်ပါ။</li>
                                        <li>အဆင့် ၃။ ကျား/မ ရွေးချယ်ပေးပါ။</li>
                                        <li>အဆင့် ၄။ သင့်မွေးသက္ကရာဇ်ကို ဖြည့်ပါ။</li>
                                        <li>အဆင့် ၅။ မြန်မာနိုင်ငံကို သင့်နိုင်ငံအဖြစ်ရွေးချယ်ပါ။</li>
                                        <li>အဆင့် ၆။ သင်၏ကျောင်းအမည်ကိုရေးပါ။</li>
                                        <li>အဆင့် ၇။ သင့်အိမ်လိပ်စာကို ဖြည့်ပေးပါ။</li>
                                        <li>အဆင့် ၈။ သင့်ဖုန်းနံပါတ်ကိုဖြည့် ။</li>
                                        <li>
                                            အဆင့် ၉။ သင်၏ NRC(နိုင်ငံသား
                                            မှတ်ပုံတင်ကဒ်) (သို့) ကျောင်းသား ID
                                            သို့မဟုတ် မွေးစာရင်းကို upload လုပ်ပါ။
                                        </li>
                                        <li>
                                            အဆင့် ၁၀။ သင်၏ အဆင့်နှင့် အသက်အုပ်စု
                                            (အတန်း) ကို ရွေးပါ။(သင့်အသက်အလိုက်
                                            ‌‌‌ဖြေဆိုရမည့်အထက်တွင်
                                            ဖော်ပြထားသောဇယားပါအတိုင်း မိမိအတန်းကို
                                            ရွေးပါ။)
                                        </li>
                                        <li>
                                            အဆင့် ၁၁။ သင်ဖြေဆိုလိုသည့်
                                            စာမေးပွဲစင်တာကို ရွေးချယ်ပါ။
                                        </li>
                                        <li>
                                            အဆင့် ၁၂။ အောက်တွင်
                                            ဖော်ပြထားသည့် အကောင့်တစ်ခုခုသို့
                                            ငွေပေးချေမှုပြုလုပ်ပါ။ ထို့နောက်
                                            ငွေပေးချေ ပြီးကြောင်း  ပြေစာဓါတ်ပုံ
                                            (သို့) ငွေပေးချေသည့် အထောက်အထား
                                            screenshot  ကို upload လုပ်ပေးပါ။
                                        </li>
                                        <li>
                                            အဆင့် ၁၃။ Sign up ပါ‌သော ခလုတ်ကို
                                            နှိပ်ပါ။
                                        </li>
                                    </ol>
                                    <p className="text-sm text-slate-600">
                                        မှတ်ချက်- မှတ်ပုံတင်ခြင်းပြီးမြောက်/မပြီးမြောက်
                                        ကြောင်း အောက်တိုဘာ (၂၆ရက်) ရက်နေ့ မတိုင်မီ
                                        09754644440 သို့ ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။
                                    </p>
                                </div>
                            )}
                            {activeTab === 'bank' && (
                                <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                                    <p className="font-semibold">
                                        The BFI Education Services bank accounts
                                        details are as below.
                                    </p>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                CB Bank
                                            </p>
                                            <p>U Aye Htun Win</p>
                                            <p>Account number: 0086 6001 0028 5773</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                AYA Bank
                                            </p>
                                            <p>U Aye Htun Win</p>
                                            <p>Account number: 20026619299</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                KBZ Bank
                                            </p>
                                            <p>U Aye Htun Win</p>
                                            <p>Account number: 04530 1045 0211 1502</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                KBZ Pay
                                            </p>
                                            <p>U Aye Htun Win</p>
                                            <p>(09420240035)</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Registration Form
                        </h2>
                        <p className="mt-3 text-sm text-slate-600">
                            After Reading Registration Steps, please go to this
                            link to register!
                        </p>
                        <a
                            href="https://forms.gle/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Go to This Link to Register !
                        </a>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <img
                                    src="/img/kpay.jpg"
                                    alt="KBZ Pay"
                                    className="h-28 w-full cursor-zoom-in object-contain"
                                    onClick={() => setActiveImage('/img/kpay.jpg')}
                                />
                            </div>
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <img
                                    src="/img/cb.jpg"
                                    alt="CB Bank"
                                    className="h-28 w-full cursor-zoom-in object-contain"
                                    onClick={() => setActiveImage('/img/cb.jpg')}
                                />
                            </div>
                        </div>
                        <p className="mt-5 text-sm text-slate-600">
                            You can practice our Sample Questions{' '}
                            <Link
                                href="/sample-questions-and-answers"
                                className="font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-700"
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
