<?php

use App\Models\Announcement;
use App\Models\CompetitionTimeline;
use App\Models\RuleRegulation;
use App\Models\User;
use App\Support\Seo\SitemapBuilder;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::get('/', function () {
    $timelines = CompetitionTimeline::query()
        ->orderBy('order')
        ->orderBy('id')
        ->get();

    $announcement = Announcement::query()
        ->where('is_active', true)
        ->orderByDesc('updated_at')
        ->first();

    if (! $announcement) {
        $announcement = Announcement::query()
            ->orderByDesc('updated_at')
            ->first();
    }

    return Inertia::render('welcome', [
        'timelines' => $timelines,
        'announcement' => $announcement,
    ]);
})->name('home');

Route::get('register-here', [
    \App\Http\Controllers\RegisterHereController::class,
    'index',
])->name('register.here');

Route::get('bank-qr/{bankAccount}', [
    \App\Http\Controllers\RegisterHereController::class,
    'qrImage',
])->name('bank-qr.show');

Route::get('rules-and-regulation', function () {
    $rules = RuleRegulation::query()
        ->where('is_active', true)
        ->orderBy('order')
        ->orderBy('id')
        ->get();

    return Inertia::render('rules-and-regulation', [
        'rules' => $rules,
    ]);
})->name('rules-and-regulation');

Route::get('privacy-policy', function () {
    return Inertia::render('privacy-policy');
})->name('privacy-policy');

Route::get('sample-questions-and-answers', function () {
    $files = app(\App\Http\Controllers\Admin\SampleQuestionsController::class)->filesMeta();

    return Inertia::render('sample-questions-and-answers', [
        'files' => $files,
    ]);
})->name('sample-questions-and-answers');

Route::get('sample-questions/{category}/{type}', [
    \App\Http\Controllers\Admin\SampleQuestionsController::class,
    'download',
])->where(['category' => '(primary|lower-secondary|upper-secondary)', 'type' => '(questions|answers)']);

Route::get('exam-results', function () {
    $files = app(\App\Http\Controllers\Admin\ExamResultsController::class)->filesMeta();

    return Inertia::render('exam-results', [
        'files' => $files,
    ]);
})->name('exam-results');

Route::get('exam-results/{category}/{type}', [
    \App\Http\Controllers\Admin\ExamResultsController::class,
    'download',
])->where(['category' => '(primary|lower-secondary|upper-secondary)', 'type' => '(results)']);

Route::get('sitemap.xml', function (SitemapBuilder $sitemapBuilder) {
    $path = $sitemapBuilder->writeToPublicPath();

    return response()->file($path, [
        'Content-Type' => 'application/xml; charset=UTF-8',
    ]);
})->name('sitemap');

Route::fallback(function () {
    return Inertia::render('errors/404')->toResponse(request())->setStatusCode(404);
});

Route::prefix('administration-panel')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('dashboard', function () {
            $timelineCount = CompetitionTimeline::query()->count();
            $userCount = User::query()->count();
            $nextTimeline = CompetitionTimeline::query()
                ->whereNotNull('primary_date')
                ->orderBy('primary_date')
                ->first();

            return Inertia::render('dashboard', [
                'stats' => [
                    'timelines' => $timelineCount,
                    'users' => $userCount,
                ],
                'nextTimeline' => $nextTimeline,
            ]);
        })->name('dashboard');

        Route::get('simple-q-a', [
            \App\Http\Controllers\Admin\SampleQuestionsController::class,
            'index',
        ])->name('admin.simple-q-a');

        Route::post('simple-q-a', [
            \App\Http\Controllers\Admin\SampleQuestionsController::class,
            'store',
        ])->name('admin.simple-q-a.store');

        Route::delete('simple-q-a', [
            \App\Http\Controllers\Admin\SampleQuestionsController::class,
            'destroy',
        ])->name('admin.simple-q-a.destroy');

        Route::get('exam-results', [
            \App\Http\Controllers\Admin\ExamResultsController::class,
            'index',
        ])->name('admin.exam-results');

        Route::post('exam-results', [
            \App\Http\Controllers\Admin\ExamResultsController::class,
            'store',
        ])->name('admin.exam-results.store');

        Route::delete('exam-results', [
            \App\Http\Controllers\Admin\ExamResultsController::class,
            'destroy',
        ])->name('admin.exam-results.destroy');

        Route::get('registration', [
            \App\Http\Controllers\Admin\RegistrationController::class,
            'index',
        ])->name('admin.registration');

        Route::post('registration/settings', [
            \App\Http\Controllers\Admin\RegistrationController::class,
            'updateSettings',
        ])->name('admin.registration.settings');

        Route::post('registration/steps', [
            \App\Http\Controllers\Admin\RegistrationController::class,
            'storeStep',
        ])->name('admin.registration.steps.store');

        Route::put('registration/steps/{registrationStep}', [
            \App\Http\Controllers\Admin\RegistrationController::class,
            'updateStep',
        ])->name('admin.registration.steps.update');

        Route::delete('registration/steps/{registrationStep}', [
            \App\Http\Controllers\Admin\RegistrationController::class,
            'destroyStep',
        ])->name('admin.registration.steps.destroy');

        Route::post('registration/banks', [
            \App\Http\Controllers\Admin\RegistrationController::class,
            'storeBank',
        ])->name('admin.registration.banks.store');

        Route::post('registration/banks/{bankAccount}', [
            \App\Http\Controllers\Admin\RegistrationController::class,
            'updateBank',
        ])->name('admin.registration.banks.update');

        Route::delete('registration/banks/{bankAccount}', [
            \App\Http\Controllers\Admin\RegistrationController::class,
            'destroyBank',
        ])->name('admin.registration.banks.destroy');

        Route::get('announcements', [
            \App\Http\Controllers\Admin\AnnouncementController::class,
            'index',
        ])->name('admin.announcements');

        Route::post('announcements', [
            \App\Http\Controllers\Admin\AnnouncementController::class,
            'store',
        ])->name('admin.announcements.store');

        Route::put('announcements/{announcement}', [
            \App\Http\Controllers\Admin\AnnouncementController::class,
            'update',
        ])->name('admin.announcements.update');

        Route::delete('announcements/{announcement}', [
            \App\Http\Controllers\Admin\AnnouncementController::class,
            'destroy',
        ])->name('admin.announcements.destroy');

        Route::get('rules-and-regulation', [
            \App\Http\Controllers\Admin\RuleRegulationController::class,
            'index',
        ])->name('admin.rules-and-regulation');

        Route::post('rules-and-regulation', [
            \App\Http\Controllers\Admin\RuleRegulationController::class,
            'store',
        ])->name('admin.rules-and-regulation.store');

        Route::put('rules-and-regulation/{ruleRegulation}', [
            \App\Http\Controllers\Admin\RuleRegulationController::class,
            'update',
        ])->name('admin.rules-and-regulation.update');

        Route::delete('rules-and-regulation/{ruleRegulation}', [
            \App\Http\Controllers\Admin\RuleRegulationController::class,
            'destroy',
        ])->name('admin.rules-and-regulation.destroy');

        Route::get('competition-timeline', [
            \App\Http\Controllers\Admin\CompetitionTimelineController::class,
            'index',
        ])->name('admin.competition-timeline');

        Route::post('competition-timeline', [
            \App\Http\Controllers\Admin\CompetitionTimelineController::class,
            'store',
        ])->name('admin.competition-timeline.store');

        Route::put('competition-timeline/{competitionTimeline}', [
            \App\Http\Controllers\Admin\CompetitionTimelineController::class,
            'update',
        ])->name('admin.competition-timeline.update');

        Route::delete('competition-timeline/{competitionTimeline}', [
            \App\Http\Controllers\Admin\CompetitionTimelineController::class,
            'destroy',
        ])->name('admin.competition-timeline.destroy');

        Route::middleware('admin')->group(function () {
            Route::get('users', [
                \App\Http\Controllers\Admin\UserController::class,
                'index',
            ])->name('admin.users.index');

            Route::get('users/create', [
                \App\Http\Controllers\Admin\UserController::class,
                'create',
            ])->name('admin.users.create');

            Route::post('users', [
                \App\Http\Controllers\Admin\UserController::class,
                'store',
            ])->name('admin.users.store');

            Route::get('users/{user}/edit', [
                \App\Http\Controllers\Admin\UserController::class,
                'edit',
            ])->name('admin.users.edit');

            Route::put('users/{user}', [
                \App\Http\Controllers\Admin\UserController::class,
                'update',
            ])->name('admin.users.update');

            Route::delete('users/{user}', [
                \App\Http\Controllers\Admin\UserController::class,
                'destroy',
            ])->name('admin.users.destroy');
        });
    });

require __DIR__.'/settings.php';
