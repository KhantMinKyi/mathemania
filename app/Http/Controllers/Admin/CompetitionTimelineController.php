<?php

namespace App\Http\Controllers\Admin;

use App\Models\CompetitionTimeline;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CompetitionTimelineController
{
    public function index(): Response
    {
        return Inertia::render('admin/competition-timeline', [
            'timelines' => CompetitionTimeline::query()
                ->orderBy('order')
                ->orderBy('id')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->merge([
            'primary_label' => $request->input('primary_label') ?: null,
            'primary_date' => $request->input('primary_date') ?: null,
            'secondary_label' => $request->input('secondary_label') ?: null,
            'secondary_date' => $request->input('secondary_date') ?: null,
        ]);

        $validated = $request->validate([
            'order' => ['nullable', 'integer', 'min:0'],
            'label' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'primary_label' => ['nullable', 'string', 'max:255'],
            'primary_date' => ['nullable', 'date'],
            'secondary_label' => ['nullable', 'string', 'max:255'],
            'secondary_date' => ['nullable', 'date'],
        ]);

        CompetitionTimeline::create([
            'order' => $validated['order'] ?? 0,
            'label' => $validated['label'],
            'title' => $validated['title'],
            'primary_label' => $validated['primary_label'] ?? null,
            'primary_date' => $validated['primary_date'] ?? null,
            'secondary_label' => $validated['secondary_label'] ?? null,
            'secondary_date' => $validated['secondary_date'] ?? null,
        ]);

        return back()->with('success', 'Timeline created successfully.');
    }

    public function update(Request $request, CompetitionTimeline $competitionTimeline)
    {
        $request->merge([
            'primary_label' => $request->input('primary_label') ?: null,
            'primary_date' => $request->input('primary_date') ?: null,
            'secondary_label' => $request->input('secondary_label') ?: null,
            'secondary_date' => $request->input('secondary_date') ?: null,
        ]);

        $validated = $request->validate([
            'order' => ['nullable', 'integer', 'min:0'],
            'label' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'primary_label' => ['nullable', 'string', 'max:255'],
            'primary_date' => ['nullable', 'date'],
            'secondary_label' => ['nullable', 'string', 'max:255'],
            'secondary_date' => ['nullable', 'date'],
        ]);

        $competitionTimeline->update([
            'order' => $validated['order'] ?? 0,
            'label' => $validated['label'],
            'title' => $validated['title'],
            'primary_label' => $validated['primary_label'] ?? null,
            'primary_date' => $validated['primary_date'] ?? null,
            'secondary_label' => $validated['secondary_label'] ?? null,
            'secondary_date' => $validated['secondary_date'] ?? null,
        ]);

        return back()->with('success', 'Timeline updated successfully.');
    }

    public function destroy(CompetitionTimeline $competitionTimeline)
    {
        $competitionTimeline->delete();

        return back()->with('success', 'Timeline deleted successfully.');
    }
}
