import FrontendLayout from '@/layouts/frontend-layout';
import { Head } from '@inertiajs/react';

export default function PrivacyPolicy() {
    return (
        <FrontendLayout>
            <Head title="Privacy Policy" />
            <section className="mx-auto w-full max-w-6xl px-4 py-10">
                <h1 className="text-3xl font-semibold text-slate-900">
                    Privacy Policy
                </h1>
                <p className="mt-4 text-base text-slate-600">
                    This Privacy Policy explains how Mathemania and BFI Education
                    Services collect, use, and protect information related to the
                    Mathemania competition and its events.
                </p>

                <div className="mt-8 space-y-6 text-sm text-slate-600">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Information We Collect
                        </h2>
                        <p className="mt-2">
                            We may collect participant details such as name, age,
                            school, contact information, and registration data
                            required to manage competition participation.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            How We Use Information
                        </h2>
                        <p className="mt-2">
                            Information is used to administer events, communicate
                            schedules and results, verify eligibility, and improve
                            future competitions.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Sharing of Information
                        </h2>
                        <p className="mt-2">
                            We do not sell personal information. Data may be shared
                            only with authorized event partners for operational
                            purposes and in compliance with applicable laws.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Data Security
                        </h2>
                        <p className="mt-2">
                            We maintain reasonable safeguards to protect your data.
                            Access is limited to authorized personnel only.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Contact Us
                        </h2>
                        <p className="mt-2">
                            For questions about this Privacy Policy, please contact
                            BFI Education Services.
                        </p>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
