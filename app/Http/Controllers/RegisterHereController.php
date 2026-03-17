<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\RegistrationSetting;
use App\Models\RegistrationStep;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class RegisterHereController
{
    public function index(): Response
    {
        $settings = RegistrationSetting::query()->first();
        $steps = RegistrationStep::query()
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        $bankAccounts = BankAccount::query()
            ->orderBy('order')
            ->orderBy('id')
            ->get()
            ->map(fn (BankAccount $bank) => [
                'id' => $bank->id,
                'order' => $bank->order,
                'bank_name' => $bank->bank_name,
                'account_name' => $bank->account_name,
                'account_number' => $bank->account_number,
                'qr_image_path' => $bank->qr_image_path,
                'qr_image_url' => $bank->qr_image_path
                    ? route('bank-qr.show', $bank)
                    : null,
            ]);

        return Inertia::render('register-here', [
            'settings' => $settings,
            'steps' => $steps,
            'bankAccounts' => $bankAccounts,
        ]);
    }

    public function qrImage(BankAccount $bankAccount)
    {
        if (! $bankAccount->qr_image_path) {
            abort(404);
        }

        // Get the absolute path and return it as a file response
        $path = Storage::disk('public')->path($bankAccount->qr_image_path);
            
        return response()->file($path);
    }
}
