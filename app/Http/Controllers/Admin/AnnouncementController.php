<?php

namespace App\Http\Controllers\Admin;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController
{
    public function index(): Response
    {
        return Inertia::render('admin/announcements', [
            'announcements' => Announcement::query()
                ->orderByDesc('is_active')
                ->orderByDesc('updated_at')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'heading' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'content_en' => ['required', 'string'],
            'content_mm' => ['required', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $isActive = (bool) ($validated['is_active'] ?? false);

        if ($isActive) {
            Announcement::query()->update(['is_active' => false]);
        }

        Announcement::create([
            'heading' => $validated['heading'],
            'title' => $validated['title'],
            'content_en' => $validated['content_en'],
            'content_mm' => $validated['content_mm'],
            'is_active' => $isActive,
        ]);

        return back()->with('success', 'Announcement created successfully.');
    }

    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'heading' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'content_en' => ['required', 'string'],
            'content_mm' => ['required', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $isActive = (bool) ($validated['is_active'] ?? false);

        if ($isActive) {
            Announcement::query()
                ->whereKeyNot($announcement->getKey())
                ->update(['is_active' => false]);
        }

        $announcement->update([
            'heading' => $validated['heading'],
            'title' => $validated['title'],
            'content_en' => $validated['content_en'],
            'content_mm' => $validated['content_mm'],
            'is_active' => $isActive,
        ]);

        return back()->with('success', 'Announcement updated successfully.');
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return back()->with('success', 'Announcement deleted successfully.');
    }
}
