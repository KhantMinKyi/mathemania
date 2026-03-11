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
    return Inertia::render('sample-questions-and-answers');
})->name('sample-questions-and-answers');

Route::prefix('administration-panel')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');
    });

require __DIR__.'/settings.php';
