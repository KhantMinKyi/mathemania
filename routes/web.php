<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('register-here', function () {
    return Inertia::render('register-here');
})->name('register.here');

Route::get('rules-and-regulation', function () {
    return Inertia::render('rules-and-regulation');
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

Route::fallback(function () {
    return Inertia::render('errors/404')->toResponse(request())->setStatusCode(404);
});

Route::prefix('administration-panel')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
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
