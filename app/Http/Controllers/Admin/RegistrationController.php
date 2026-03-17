<?php

namespace App\Http\Controllers\Admin;

use App\Models\BankAccount;
use App\Models\RegistrationSetting;
use App\Models\RegistrationStep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController
{
    public function index(): Response
    {
        $settings = RegistrationSetting::query()->first();

        if (! $settings) {
            $settings = RegistrationSetting::create([
                'register_link' => null,
                'attention_en' => null,
                'attention_mm' => null,
                'note_en' => null,
                'note_mm' => null,
            ]);
        }

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
                'updated_at' => $bank->updated_at,
            ]);

        return Inertia::render('admin/registration', [
            'settings' => $settings,
            'steps' => $steps,
            'bankAccounts' => $bankAccounts,
        ]);
    }

    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'register_link' => ['nullable', 'string', 'max:255'],
            'attention_en' => ['nullable', 'string'],
            'attention_mm' => ['nullable', 'string'],
            'note_en' => ['nullable', 'string'],
            'note_mm' => ['nullable', 'string'],
        ]);

        $settings = RegistrationSetting::query()->first();

        if (! $settings) {
            $settings = RegistrationSetting::create($validated);

            return back()->with('success', 'Registration settings saved.');
        }

        $settings->update($validated);

        return back()->with('success', 'Registration settings updated.');
    }

    public function storeStep(Request $request)
    {
        $validated = $request->validate([
            'language' => ['required', 'string', 'in:en,mm'],
            'order' => ['nullable', 'integer', 'min:0'],
            'content' => ['required', 'string'],
            'hint' => ['nullable', 'string'],
        ]);

        RegistrationStep::create([
            'language' => $validated['language'],
            'order' => $validated['order'] ?? 0,
            'content' => $validated['content'],
            'hint' => $validated['hint'] ?? null,
        ]);

        return back()->with('success', 'Registration step created.');
    }

    public function updateStep(Request $request, RegistrationStep $registrationStep)
    {
        $validated = $request->validate([
            'language' => ['required', 'string', 'in:en,mm'],
            'order' => ['nullable', 'integer', 'min:0'],
            'content' => ['required', 'string'],
            'hint' => ['nullable', 'string'],
        ]);

        $registrationStep->update([
            'language' => $validated['language'],
            'order' => $validated['order'] ?? 0,
            'content' => $validated['content'],
            'hint' => $validated['hint'] ?? null,
        ]);

        return back()->with('success', 'Registration step updated.');
    }

    public function destroyStep(RegistrationStep $registrationStep)
    {
        $registrationStep->delete();

        return back()->with('success', 'Registration step deleted.');
    }

    public function storeBank(Request $request)
    {
        $validated = $request->validate([
            'order' => ['nullable', 'integer', 'min:0'],
            'bank_name' => ['required', 'string', 'max:255'],
            'account_name' => ['required', 'string', 'max:255'],
            'account_number' => ['nullable', 'string', 'max:255'],
            'qr_image' => ['nullable', 'image', 'max:4096'],
        ]);

        $qrPath = $request->file('qr_image')
            ? $request->file('qr_image')->store('bank-qr', 'public')
            : null;

        BankAccount::create([
            'order' => $validated['order'] ?? 0,
            'bank_name' => $validated['bank_name'],
            'account_name' => $validated['account_name'],
            'account_number' => $validated['account_number'] ?? null,
            'qr_image_path' => $qrPath,
        ]);

        return back()->with('success', 'Bank account created.');
    }

    public function updateBank(Request $request, BankAccount $bankAccount)
    {
        $validated = $request->validate([
            'order' => ['nullable', 'integer', 'min:0'],
            'bank_name' => ['required', 'string', 'max:255'],
            'account_name' => ['required', 'string', 'max:255'],
            'account_number' => ['nullable', 'string', 'max:255'],
            'qr_image' => ['nullable', 'image', 'max:4096'],
        ]);

        $qrPath = $bankAccount->qr_image_path;

        if ($request->hasFile('qr_image')) {
            if ($qrPath) {
                Storage::disk('public')->delete($qrPath);
            }

            $qrPath = $request->file('qr_image')->store('bank-qr', 'public');
        }

        $bankAccount->update([
            'order' => $validated['order'] ?? 0,
            'bank_name' => $validated['bank_name'],
            'account_name' => $validated['account_name'],
            'account_number' => $validated['account_number'] ?? null,
            'qr_image_path' => $qrPath,
        ]);

        return back()->with('success', 'Bank account updated.');
    }

    public function destroyBank(BankAccount $bankAccount)
    {
        if ($bankAccount->qr_image_path) {
            Storage::disk('public')->delete($bankAccount->qr_image_path);
        }

        $bankAccount->delete();

        return back()->with('success', 'Bank account deleted.');
    }
}
