import { type ReactElement } from 'react';

type RulesTab = 'en' | 'mm';

export default function RulesFallback({
    tab,
}: {
    tab: RulesTab;
}): ReactElement {
    if (tab === 'en') {
        return (
            <>
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Purpose
                    </h2>
                    <p className="mt-3">
                        Mathemania is an annual math-based puzzle competition
                        organized by BFI Education Services since 2005. It comprises
                        3 different levels where each level consists of different
                        types of Mathematics based puzzles. The purpose of this
                        contest is to boost enthusiasm towards Mathematics and
                        strengthen the analytical/visual/critical thinking and
                        problem-solving skills of students. It inspires students to
                        develop their perseverance and resilience. Mathemania
                        challenges Mathematics lovers, encouraging them to love
                        Mathematics in different ways.
                    </p>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Eligibility
                    </h2>
                    <p className="mt-3">
                        Contestants are assigned to Primary, Secondary, High school
                        level according to their date of births. Anyone who falls
                        into one of the age groups of the following categories; can
                        participate in this contest.
                    </p>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[540px] text-left text-sm">
                            <thead className="text-slate-500">
                                <tr>
                                    <th className="pb-2">Level & Age Group</th>
                                    <th className="pb-2">Date of birth</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                <tr className="border-t border-slate-200">
                                    <td className="py-3">
                                        Primary Level (Age 9-10)
                                    </td>
                                    <td className="py-3">
                                        March 31, 2016 – April 1, 2014
                                    </td>
                                </tr>
                                <tr className="border-t border-slate-200">
                                    <td className="py-3">
                                        Lower Secondary (Age 11-13)
                                    </td>
                                    <td className="py-3">
                                        March 31, 2014 – April 1, 2011
                                    </td>
                                </tr>
                                <tr className="border-t border-slate-200">
                                    <td className="py-3">
                                        Upper Secondary (Age 14-16)
                                    </td>
                                    <td className="py-3">
                                        March 31, 2011 – April 1, 2008
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Dates & Time
                    </h2>
                    <p className="mt-3">
                        The contest will be held on Saturday, November 2, 2024 for
                        all categories according to the following schedules.
                    </p>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[420px] text-left text-sm">
                            <thead className="text-slate-500">
                                <tr>
                                    <th className="pb-2">
                                        Competition Schedule, November 2, 2024
                                        (Saturday)
                                    </th>
                                    <th className="pb-2">Time</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                <tr className="border-t border-slate-200">
                                    <td className="py-3">Primary</td>
                                    <td className="py-3">
                                        10:00 AM - 11:30 AM
                                    </td>
                                </tr>
                                <tr className="border-t border-slate-200">
                                    <td className="py-3">Upper Secondary</td>
                                    <td className="py-3">
                                        10:00 AM - 11:30 AM
                                    </td>
                                </tr>
                                <tr className="border-t border-slate-200">
                                    <td className="py-3">Lower Secondary</td>
                                    <td className="py-3">
                                        01:00 PM - 02:30 PM
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">
                        Participants of each level are requested to come at least
                        45 minutes before the respective contest starts.
                    </p>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Event Venue
                    </h2>
                    <ul className="mt-3 space-y-2">
                        <li>SKT International School (Riverside Campus)</li>
                        <li>Mandalay International Science Academy</li>
                        <li>Nay Pyi Taw International Science Academy</li>
                    </ul>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Task Instructions
                    </h2>
                    <p className="mt-3">
                        The question set for each level consists of 30
                        multiple-choice questions.
                    </p>
                    <p className="mt-3">
                        Basic knowledge of math skills, such as addition,
                        subtraction, division and multiplication are required.
                        Also, students can apply their visual skills, logical
                        thinking and reasoning skills out of their respective
                        taught curriculums. Puzzle based questions are created
                        from patterns, logic based, geometric visual questions,
                        counting topics. The questions are available both in
                        English and Myanmar languages. The total time allowance is
                        90 minutes for every category. Applicants will be provided
                        with Sample Questions once the registration is approved.
                    </p>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Announcement of Results
                    </h2>
                    <p className="mt-3">
                        The Contest results will be announced tentatively three
                        weeks after the competition day. A notification of results
                        announcement can be viewed on our website
                        (mathemania.bfi.edu.mm).
                    </p>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Winners and Awards
                    </h2>
                    <p className="mt-3">
                        The successful contestants from each level will be
                        rewarded as follows:
                    </p>
                    <ul className="mt-3 space-y-2">
                        <li>Top first 5% – Gold Medal and Certificate</li>
                        <li>Top second 10% – Silver Medal and Certificate</li>
                        <li>Top third 15% – Bronze Medal and Certificate</li>
                    </ul>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[520px] text-left text-sm">
                            <thead className="text-slate-500">
                                <tr>
                                    <th className="pb-2">Primary</th>
                                    <th className="pb-2">Lower Secondary</th>
                                    <th className="pb-2">Upper Secondary</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                <tr className="border-t border-slate-200">
                                    <td className="py-3">1st : Smart Watch</td>
                                    <td className="py-3">1st : Smart Watch</td>
                                    <td className="py-3">1st : Smart Watch</td>
                                </tr>
                                <tr className="border-t border-slate-200">
                                    <td className="py-3">2nd : Drawing Tablet</td>
                                    <td className="py-3">2nd : Drawing Tablet</td>
                                    <td className="py-3">2nd : Drawing Tablet</td>
                                </tr>
                                <tr className="border-t border-slate-200">
                                    <td className="py-3">3rd : Drawing Tablet</td>
                                    <td className="py-3">3rd : Drawing Tablet</td>
                                    <td className="py-3">3rd : Drawing Tablet</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3">
                        Prize distribution after the contest: The Awarding Ceremony
                        will be held on November 30, 2024 at SKT Conference Hall.
                        There will be 3 grand prize winners for each category as
                        mentioned in the table above. Top 30% of winners will be
                        awarded in each category. The winners will be chosen with
                        the highest points from all the exam centers.
                    </p>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Registration
                    </h2>
                    <p className="mt-3">
                        Registration starts: 26 September 2024
                    </p>
                    <p className="mt-1">Registration ends: 26 October 2024</p>
                    <p className="mt-3">
                        Registrations are accepted two options; online and through
                        our registration offices.
                    </p>
                    <p className="mt-3">
                        Register in our offices in SKT Riverside Campus, SKT City
                        Campus, MISA and NISA Campuses during office hours (8:00 am
                        – 4:00 pm). Contestants are required to give a copy of NRC
                        or any other official document that can prove the birthday.
                        Contestants are required to pay an application fee of
                        30,000 Kyats.
                    </p>
                    <p className="mt-3">
                        The contestants can also register online through the
                        following provided link:
                    </p>
                    <p className="mt-1 text-slate-900">
                        http://www.mathemania.com.mm/register-here/
                    </p>
                    <div className="mt-4 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p>
                            Be attentive: Registration can be done by a teacher for
                            a group of students or individually by a student or
                            parents.
                        </p>
                        <p>
                            You can choose the language you like to fill out the
                            form, but fill out the application in English only.
                        </p>
                        <p>
                            Be attentive: Registration can be done by a teacher for
                            a group of students or individually by a student or his
                            parents. A unique email address is required for each
                            enrolled student. You can choose the language you like
                            to fill out the form, but fill out the application in
                            English only.
                        </p>
                    </div>
                    <ol className="mt-4 space-y-2">
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
                                (Upload any document that proves your date of
                                birth. Example: Birth certificate or NRC)
                            </div>
                        </li>
                        <li>
                            Step 10. Choose your Level & Age Group (Class)
                            <div className="mt-1 text-xs text-slate-500">
                                (Please choose the Level close to your grade if
                                your actual Grade is not in the default range once
                                your DOB is valid for application.)
                            </div>
                        </li>
                        <li>Step 11. Choose your competition center</li>
                        <li>
                            Step 12. Make payment and upload the screenshot or
                            Receipt of your payment (receipt, screenshot etc.)
                        </li>
                        <li>Step 13. Click on the Signup button.</li>
                    </ol>
                    <p className="mt-4">
                        Note: Please contact 09754644440 to confirm your online
                        registration and any questions before October 26.
                    </p>
                    <p className="mt-4">
                        Further information can be observed in our rules and
                        regulations. If you have any questions concerning the
                        contest, please contact at all campus phone number
                    </p>
                    <ul className="mt-3 space-y-2">
                        <li>
                            SKT Riverside Campus ((01)450396-7, (01)9410010-20 ,
                            09 424451186)
                        </li>
                        <li>
                            SKT City Campus ((01) 9551795 – 6 , (01) 543926 , 09
                            456 481 950)
                        </li>
                        <li>MISA (09 777 488802, 09 7774888 03)</li>
                        <li>NISA (09 428 4603 73, 09 895 0950 80)</li>
                    </ul>
                    <p className="mt-4">
                        We look forward to welcoming your students at MATHEMANIA
                        2024-2025.
                    </p>
                    <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="font-semibold text-slate-900">
                            The BFI Education Services bank accounts details are as
                            below.
                        </p>
                        <div className="space-y-2">
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
                </section>
            </>
        );
    }

    return (
        <>
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">
                    စည်းမျဥ်း စည်းကမ်း အချက်အလက်များ
                </h2>
                <div className="mt-3 space-y-4">
                    <div>
                        <p className="font-semibold text-slate-900">
                            ၁။ ပြိုင်ပွဲကျင်းပရခြင်း ၏ ရည်ရွယ်ချက်
                        </p>
                        <p className="mt-2">
                            Mathemania သည် 2005 ခုနှစ်မှစတင်၍ BFI Education
                            Services မှ စီစဉ်ကျင်းပသော သင်္ချာအခြေခံ
                            ပဟေဠိပြိုင်ပွဲ တစ်ခု ဖြစ်သည်။ ဤပြိုင်ပွဲတွင်
                            မတူညီသောအဆင့် ၃ ခုပါဝင်သည်။ အဆင့်တစ်ခုစီတွင်
                            သင်္ချာ အခြေခံပဟေဠိများ အမျိုးမျိုးပါဝင်ပါသည်။
                            ဤပြိုင်ပွဲ၏ ရည်ရွယ်ချက်မှာ သင်္ချာဘာသာရပ်အပေါ်
                            စိတ်အား ထက်သန်မှုနှင့် ကျောင်းသားများ၏ သုံးသပ်
                            ဝေဖန် ပိုင်းခြားတွေးခေါ်မှု စွမ်းရည်/အမြင်စွမ်းရည်/
                            ပြသနာများကို ဖြေရှင်းနိုင်သည့်စွမ်းရည်များ ကို
                            မြှင့်တင်ရန်ဖြစ်သည်။ ထို့ပြင် ယခုပြိုင်ပွဲမျိုးသည်
                            ကျောင်းသားများ၏ ဇွဲ လုံ့လ အပြည့်ဖြင့် လိုရာပန်းတိုင်သို့
                            တစိုက်မတ်မတ် သွားလိုစိတ်ကိုလည်း မြှင့်တင်ပေးပါသည်။
                            ဤပြိုင်ပွဲသည် သင်္ချာ ဝါသနာ ရှင်ကျောင်းသားများကို
                            စိန်ခေါ် ပြီး သင်္ချာကို နည်းအမျိုးမျိုးဖြင့်
                            နှစ်သက်လာစေရန် ထောက်ပံ့ပေးပါ သည်။
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900">
                            ၂။ ပြိုင်ပွဲတွင် ပါဝင်နိုင်မည့် သူများ။
                        </p>
                        <p className="mt-2">
                            ပြိုင်ပွဲဝင်များကို ၎င်းတို့၏ မွေးသက္ကရာဇ်အရ
                            မူလတန်း၊ အလယ်တန်း နှင့် အထက်တန်း အဆင့်အထိ
                            သတ်မှတ်ထားသည်။ အောက်ဖော်ပြပါ အမျိုးအစားများ၏
                            အသက်အုပ်စုများထဲမှ တစ်ခုသို့ ကျရောက်နေသူတိုင်း၊
                            ပြိုင်ပွဲတွင် ပါဝင်နိုင်ပါသည်။
                        </p>
                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full min-w-[540px] text-left text-sm">
                                <thead className="text-slate-500">
                                    <tr>
                                        <th className="pb-2">
                                            Level & Age Group
                                        </th>
                                        <th className="pb-2">Date of birth</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    <tr className="border-t border-slate-200">
                                        <td className="py-3">
                                            မူလတန်း (အသက် ၉ – ၁၀)
                                        </td>
                                        <td className="py-3">
                                            ၃၁/၃/၂၀၁၆ မှ ၁/၄/၂၀၁၄ အတွင်း
                                        </td>
                                    </tr>
                                    <tr className="border-t border-slate-200">
                                        <td className="py-3">
                                            အလယ်တန်း (အသက် ၁၁ – ၁၃)
                                        </td>
                                        <td className="py-3">
                                            ၃၁/၃/၂၀၁၄ မှ ၁/၄/၂၀၁၁ အတွင်း
                                        </td>
                                    </tr>
                                    <tr className="border-t border-slate-200">
                                        <td className="py-3">
                                            အထက်တန်း (အသက် ၁၄ – ၁၆)
                                        </td>
                                        <td className="py-3">
                                            ၃၁/၃/၂၀၁၁ မှ ၁/၄/၂၀၀၈ အတွင်း
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900">
                            ၃။ ကျင်းပမည့် အချိန်၊ နေရာ။
                        </p>
                        <p className="mt-2">
                            ပြိုင်ပွဲကို စနေနေ့ ၊ နိုဝင်ဘာလ ၂ ရက် ၊ ၂၀၂၄ တွင်
                            ကျင်းပမည်ဖြစ်သည်။ အတန်းအားလုံးအတွက် အောက်ပါအချိန်ဇယားအတိုင်း
                            ကျင်းပမည်ဖြစ်သည်။
                        </p>
                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full min-w-[420px] text-left text-sm">
                                <thead className="text-slate-500">
                                    <tr>
                                        <th className="pb-2">
                                            ပြိုင်ပွဲကျင်းပမည့်နေ့ရက်နှင့်အချိန်
                                        </th>
                                        <th className="pb-2">အချိန်</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    <tr className="border-t border-slate-200">
                                        <td className="py-3">မူလတန်း</td>
                                        <td className="py-3">
                                            ၁၀ : ၀၀ နာရီ မှ ၁၁ : ၃၀ နာရီထိ
                                        </td>
                                    </tr>
                                    <tr className="border-t border-slate-200">
                                        <td className="py-3">အထက်တန်း</td>
                                        <td className="py-3">
                                            ၁၀ : ၀၀ နာရီ မှ ၁၁ : ၃၀ နာရီထိ
                                        </td>
                                    </tr>
                                    <tr className="border-t border-slate-200">
                                        <td className="py-3">အလယ်တန်း</td>
                                        <td className="py-3">
                                            ၁ : ၀၀ နာရီ မှ ၂ : ၃၀ နာရီထိ
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                            အဆင့်တစ်ခုစီမှ ပါဝင်သူများသည် သက်ဆိုင်ရာ ပြိုင်ပွဲမစတင်မီ
                            အနည်းဆုံး 45 မိနစ် စောလာရန် နှိုးဆော်အပ်ပါသည်။
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900">
                            ၄။ ပြိုင်ပွဲကျင်းပမည့်နေရာများမှာ
                        </p>
                        <ul className="mt-2 space-y-2">
                            <li>
                                SKT International School (Riverside Campus)
                                (ရန်ကုန်)
                            </li>
                            <li>
                                Mandalay International Science Academy (မန္တလေး)
                            </li>
                            <li>
                                Nay Pyi Taw International Science Academy
                                (နေပြည်တော်)
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900">
                            ၅။ ပါဝင်နိုင်သောမေးခွန်းများ နှင့် လိုအပ်သောကျွမ်းကျင်မှုများ။
                        </p>
                        <p className="mt-2">
                            အဆင့်တစ်ခုစီတွင် မေးခွန်း(၃၀) ခု ပါဝင်ပြီး
                            ပေးထားသော အဖြေများမှ မှန်ရာတစ်ခုကို ရွေးချယ်ရသော
                            ‘မှားမှန်ရောထွေး အမှန်ရွေး’ မေးခွန်းပုံစံ
                            များဖြစ်ပါသည်။ မူလတန်းနှင့် အလယ်တန်း ကျောင်းများမှာ
                            သင်ကြားလေ့ရှိသော သင်္ချာယေဘူယျ သဘောတရားများနှင့်
                            အပေါင်း၊ အနှုတ်၊ အမြှောက် အစရှိသည့် အခြေခံသင်္ချာ
                            ဆိုင်ရာ တွက်ချက်နိုင်စွမ်များ ရှိရန်လိုအပ်ပါသည်။
                            ထို့ပြင် မိမိတို့၏ စနစ်တကျ ရေတွက်ခြင်းစွမ်းရည်၊
                            အမြင်ပိုင်းစွမ်းရည်၊ ယုတ္တိတန်သောတွေးခါ်မှု နှင့်
                            ကျိုးကြောင်းဆင်ခြင်နိုင်မှု စွမ်းရည်များကို
                            အသုံးချနိုင်ရန် လိုအပ်ပါသည်။
                        </p>
                        <p className="mt-2">
                            မေခွန်းများအား အင်္ဂလိပ်ဘာသာ နှင့် မြန်မာဘာသာ
                            နှစ်မျိုးဖြင့် ပုံနှိပ်ထားပြီး စုစုပေါင်း
                            မေးခွန်းဖြေဆိုချိန်မှာ (၁)နာရီနှင့် မိနစ် (၃၀)
                            ဖြစ်ပါသည်။ မှတ်ပုံတင်ခြင်းကို အတည်ပြုပြီး‌သော
                            လျှောက်ထားသူများအား နမူနာမေးခွန်းများ ပို့ပေးပါမည်။
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900">
                            ၆။ ရလဒ်များကိုကြေညာမည့် အချိန် ။
                        </p>
                        <p className="mt-2">
                            ပြိုင်ပွဲရလဒ်များကို ပြိုင်ပွဲကျင်းပသည့်နေ့အပြီး
                            သုံးပတ်ခန့် အကြာတွင် ထုတ်ပြန်ကြေညာပါမည်။
                            ရလဒ်များကို ကျွန်ုပ်တို့၏ ဝဘ်ဆိုက်
                            (mathemania.bfi.edu.mm) တွင် ကြည့်ရှုနိုင်ပါသည်။
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900">
                            ၇။ ဆုရရှိသူများနှင့်ဆုတံဆိပ်များ
                        </p>
                        <p className="mt-2">
                            ပြိုင်ပွဲအဆင့်တိုင်းမှ ထူးချွန်သူများကို
                            အောက်ပါအတိုင်းဆုချီးမြှင့်မည်ဖြစ်ပါသည်။
                        </p>
                        <ul className="mt-2 space-y-2">
                            <li>
                                အမှတ်အများဆုံး ပထမ ၅% – ရွှေတံဆိပ်နှင့်ဆုလက်မှတ်
                            </li>
                            <li>
                                အမှတ်အများဆုံး ဒုတိယ ၁၀% – ငွေတံဆိပ်နှင့်ဆုလက်မှတ်
                            </li>
                            <li>
                                အမှတ်အများဆုံး တတိယ ၁၅% – ကြေးတံဆိပ်နှင့်ဆုလက်မှတ်
                            </li>
                        </ul>
                        <div className="mt-3 overflow-x-auto">
                            <table className="w-full min-w-[520px] text-left text-sm">
                                <thead className="text-slate-500">
                                    <tr>
                                        <th className="pb-2">Primary (မူလတန်း)</th>
                                        <th className="pb-2">
                                            Lower Secondary (အလယ်တန်း)
                                        </th>
                                        <th className="pb-2">
                                            Upper Secondary (အထက်တန်း)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    <tr className="border-t border-slate-200">
                                        <td className="py-3">
                                            ပထမဆု : (Smart Watch)
                                        </td>
                                        <td className="py-3">
                                            ပထမဆု : (Smart Watch)
                                        </td>
                                        <td className="py-3">
                                            ပထမဆု : (Smart Watch)
                                        </td>
                                    </tr>
                                    <tr className="border-t border-slate-200">
                                        <td className="py-3">
                                            ဒုတိယဆု : Drawing Tablet
                                        </td>
                                        <td className="py-3">
                                            ဒုတိယဆု : Drawing Tablet
                                        </td>
                                        <td className="py-3">
                                            ဒုတိယဆု : Drawing Tablet
                                        </td>
                                    </tr>
                                    <tr className="border-t border-slate-200">
                                        <td className="py-3">
                                            တတိယဆု : Drawing Tablet
                                        </td>
                                        <td className="py-3">
                                            တတိယဆု : Drawing Tablet
                                        </td>
                                        <td className="py-3">
                                            တတိယဆု : Drawing Tablet
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-2">
                            ရွှေတံဆိပ်ဆုရှင်များမှ အထူးဆုသုံးခုကို အောက်ပါအတိုင်း
                            ဆုချီးမြှင့်မည်ဖြစ်သည်။ အထက်ပါဇယားတွင်
                            ဖော်ပြထားသည့်အတိုင်း အဆင့်တစ်ခုစီအတွက် ဆုကြီး (၃)ဆု
                            ချီးမြှင့်မည် ဖြစ်သည်။ အဆင့်တစ်ခုစီအတွက်ထိပ်တန်းဝင်ဆု
                            30% ကိုလည်း ပေးအပ်သွားမည်ဖြစ်သည်။ အောင်မြင်သူများကို
                            စာမေးပွဲဌာနအားလုံးမှ အမှတ်အများဆုံးသူများကို
                            ရွေးချယ်မည်ဖြစ်သည်။
                        </p>
                        <p className="mt-2">
                            ဆုပေးပွဲအခမ်းအနားကို နိုဝင်ဘာလ (၃၀) ရက် နေ့တွင်
                            SKT international School (Riverside) ၏ Conference Hallတွင်
                            ကျင်းပမည်ဖြစ်သည်။ နေ့ရက်နှင့်နေရာအား ထပ်မံ ကြေငြာ
                            ပေးပါမည်။ ဆုရရှိသူအားလုံးကို ဆက်သွယ်အကြောင်းကြားပေးပါမည်။
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900">
                            ၈။ မှတ်ပုံတင် ခြင်း။
                        </p>
                        <p className="mt-2">
                            ပြိုင်ပွဲအတွက်မှတ်ပုံတင်ခြင်းကို (၂၆ရက်) စက်တင်ဘာ
                            ၂၀၂၄ တွင်စတင်ပြီး (၂၆ရက်) အောက်တိုဘာ ၂၀၂၄ အတွင်း
                            ပြုလုပ်နိုင်ပါသည်။ မှတ်ပုံတင်ခြင်းကို
                            ကျွန်ုပ်တို့၏ကျောင်း(ခွဲ)များတွင်‌လည်းကောင်း၊
                            အွန်လိုင်းမှသော်လည်းကောင်း ရုံးချိန်အတွင်း ( နံနက်
                            ၈း၀၀ မှ ညနေ ၄း၀၀ ) အတွင်း စာရင်းပေးသွင်းနိုင်ပါသည်။
                        </p>
                        <p className="mt-2">
                            မှတ်ပုံတင်နိုင်သည့်နေရာများမှာ
                        </p>
                        <ul className="mt-2 space-y-2">
                            <li>
                                SKT International School (Riverside Campus): အမှတ်
                                ၂၃၅၊ ရှူခင်းသာမြို့ပတ်လမ်း၊ သာကေတမြို့နယ်၊
                                ရန်ကုန်။
                            </li>
                            <li>
                                SKT International School (City Campus): အမှတ် ၂၅၊
                                ဖိုးစိန်လမ်း၊ဗဟန်းမြို့နယ်၊ရန်ကုန်။
                            </li>
                            <li>
                                MISA Primary Campus: အမှတ် ၁၁၈ (A, B, C), Block 51
                                4/3, ၅၈လမ်း , ၂၇  ၂၈ ကြား, ကန့်ကော်ရပ်ကွက်,
                                ချမ်းအေးသာစံမြို့နယ်, မန္တလေးမြို့
                            </li>
                            <li>
                                MISA High School Campus – ၅၃*၃၀လမ်းထောင့်၊ချမ်းအေးသာစံ၊
                                မန္တလေးမြို့
                            </li>
                            <li>
                                NISA Campus – အမှတ် ၁၄၊ ဥတ္တရသီရိ၊နေပြည်တော်၊
                            </li>
                        </ul>
                        <ul className="mt-3 space-y-2">
                            <li>
                                SKT Riverside Campus ((01)450396-7, (01)9410010-20 ,
                                09 424451186)
                            </li>
                            <li>
                                SKT City Campus ((01) 9551795 – 6 , (01) 543926 , 09
                                456 481 950)
                            </li>
                            <li>MISA (09 777 488802, 09 7774888 03)</li>
                            <li>NISA (09 428 4603 73, 09 895 0950 80)</li>
                        </ul>
                        <p className="mt-2">
                            ပြိုင်ပွဲဝင်သူများသည် NRC မိတ္တူ သို့မဟုတ်
                            ၎င်းတို့၏မွေးနေ့ကို သက်သေပြနိုင်သော
                            အခြားတရားဝင်စာရွက်စာတမ်းတစ်ခုခုကို ပြရန်
                            လိုအပ်သည်။ ပြိုင်ပွဲဝင်များသည် လျှောက်လွှာကြေး
                            30,000 ကျပ် ပေးဆောင်ရမည်ဖြစ်သည်။
                        </p>
                        <p className="mt-2">
                            ကျောင်းသားအုပ်စုတစ်ခုအတွက် ဆရာတစ်ယောက် သို့မဟုတ်
                            တစ်ဦးချင်းအတွက် ကျောင်းသား သို့မဟုတ်
                            ၎င်းတို့၏မိဘများက မှတ်ပုံတင်ခြင်းကို ပြုလုပ်ပေးနိုင်သည်။
                        </p>
                        <p className="mt-2">
                            Onlineမှတစ်ဆင့် မှတ်ပုံတင်သူများသည်
                            အောက်ဖော်ပြပါအဆင့်များအတိုင်း လုပ်ဆောင်ရန် လိုအပ်ပါသည်။
                        </p>
                        <p className="mt-2 text-slate-900">
                            http://www.mathemania.com.mm/register-here/
                        </p>
                        <div className="mt-3 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p>
                                မှတ်ချက် – ဖောင်ဖြည့်ရန် သင်နှစ်သက်သည့်
                                ဘာသာစကားကို သင်ရွေးချယ်နိုင်သော်လည်း
                                လျှောက်လွှာကို အင်္ဂလိပ်ဘာသာဖြင့်သာ
                                ဖြည့်စွက်ပေးပါရန်။
                            </p>
                        </div>
                        <ol className="mt-3 space-y-2">
                            <li>အဆင့် ၁။ သင့်အမည်အပြည့်အစုံကို ဖြည့်ပါ။</li>
                            <li>အဆင့် ၂။ သင့်ဖခင်အမည်ကို ဖြည့်ပါ။</li>
                            <li>အဆင့် ၃။ ကျား/မ ရွေးချယ်ပေးပါ။</li>
                            <li>အဆင့် ၄။ သင့်မွေးသက္ကရာဇ်ကို ဖြည့်ပါ။</li>
                            <li>အဆင့် ၅။ မြန်မာနိုင်ငံကို သင့်နိုင်ငံအဖြစ်ရွေးချယ်ပါ။</li>
                            <li>အဆင့် ၆။ သင်၏ကျောင်းအမည်ကိုရေးပါ။</li>
                            <li>အဆင့် ၇။ သင့်အိမ်လိပ်စာကို ဖြည့်ပေးပါ။</li>
                            <li>အဆင့် ၈။ သင့်ဖုန်းနံပါတ်ကိုဖြည့် ။</li>
                            <li>
                                အဆင့် ၉။ သင်၏ NRC(နိုင်ငံသား မှတ်ပုံတင်ကဒ်)
                                (သို့) ကျောင်းသား ID သို့မဟုတ် မွေးစာရင်းကို
                                upload လုပ်ပါ။
                            </li>
                            <li>
                                အဆင့် ၁၀။ သင်၏ အဆင့်နှင့် အသက်အုပ်စု (အတန်း)
                                ကို ရွေးပါ။(သင့်အသက်အလိုက် ‌‌‌ဖြေဆိုရမည့်အထက်တွင်
                                ဖော်ပြထားသောဇယားပါအတိုင်း မိမိအတန်းကို ရွေးပါ။)
                            </li>
                            <li>အဆင့် ၁၁။ သင်ဖြေဆိုလိုသည့် စာမေးပွဲစင်တာကို ရွေးချယ်ပါ။</li>
                            <li>
                                အဆင့် ၁၂။ အောက်တွင် ဖော်ပြထားသည့်
                                အကောင့်တစ်ခုခုသို့ ငွေပေးချေမှုပြုလုပ်ပါ။
                                ထို့နောက် ငွေပေးချေ ပြီးကြောင်း
                                ပြေစာဓါတ်ပုံ (သို့) ငွေပေးချေသည့်
                                အထောက်အထား screenshot  ကို upload လုပ်ပေးပါ။
                            </li>
                            <li>အဆင့် ၁၃။ Sign up ပါ‌သော ခလုတ်ကို နှိပ်ပါ။</li>
                        </ol>
                        <p className="mt-3">
                            မှတ်ချက်– မှတ်ပုံတင်ခြင်းပြီးမြောက်/မပြီးမြောက်
                            ကြောင်း အောက်တိုဘာ (၂၆ရက်) ရက်နေ့ မတိုင်မီ 09754644440
                            သို့ ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။
                        </p>
                        <p className="mt-3">
                            မှတ်ပုံတင်သူများသည် အဖွဲ့လိုက်မဟုတ်ဘဲ
                            တစ်ဦးချင်းစီ မှတ်ပုံတင်ကြေးပေးဆောင်ရန်
                            အကြံပြုအပ်ပါသည်။
                        </p>
                        <div className="mt-4 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="font-semibold text-slate-900">
                                BFI Education Services ဘဏ်အကောင့်အချက်အလက်များ
                            </p>
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
                </div>
            </section>
        </>
    );
}
