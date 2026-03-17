<?php

namespace App\Http\Controllers\Admin;

use App\Models\RuleRegulation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RuleRegulationController
{
    public function index(): Response
    {
        return Inertia::render('admin/rules-and-regulation', [
            'rules' => RuleRegulation::query()
                ->orderBy('order')
                ->orderBy('id')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'integer', 'min:0'],
            'title_en' => ['required', 'string', 'max:255'],
            'title_mm' => ['required', 'string', 'max:255'],
            'body_en' => ['required', 'string'],
            'body_mm' => ['required', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        RuleRegulation::create([
            'order' => $validated['order'],
            'title_en' => $validated['title_en'],
            'title_mm' => $validated['title_mm'],
            'body_en' => $validated['body_en'],
            'body_mm' => $validated['body_mm'],
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return back()->with('success', 'Rule section created successfully.');
    }

    public function update(Request $request, RuleRegulation $ruleRegulation)
    {
        $validated = $request->validate([
            'order' => ['required', 'integer', 'min:0'],
            'title_en' => ['required', 'string', 'max:255'],
            'title_mm' => ['required', 'string', 'max:255'],
            'body_en' => ['required', 'string'],
            'body_mm' => ['required', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $ruleRegulation->update([
            'order' => $validated['order'],
            'title_en' => $validated['title_en'],
            'title_mm' => $validated['title_mm'],
            'body_en' => $validated['body_en'],
            'body_mm' => $validated['body_mm'],
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return back()->with('success', 'Rule section updated successfully.');
    }

    public function destroy(RuleRegulation $ruleRegulation)
    {
        $ruleRegulation->delete();

        return back()->with('success', 'Rule section deleted successfully.');
    }
}
