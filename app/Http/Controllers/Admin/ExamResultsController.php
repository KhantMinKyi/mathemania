<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ExamResultsController
{
    private const STORAGE_DIR = 'exam-results';
    private const CATEGORIES = ['primary', 'lower-secondary', 'upper-secondary'];
    private const TYPES = ['results'];

    public function index(): Response
    {
        return Inertia::render('admin/exam-results', [
            'files' => $this->filesMeta(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => ['required', 'string', 'in:'.implode(',', self::CATEGORIES)],
            'type' => ['required', 'string', 'in:'.implode(',', self::TYPES)],
            'file' => ['required', 'file', 'mimes:xlsx,xls'],
        ]);

        $filename = $validated['category'].'-'.$validated['type'].'.xlsx';
        $request->file('file')->storeAs(self::STORAGE_DIR, $filename);

        return back()->with('success', 'File uploaded successfully.');
    }

    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'category' => ['required', 'string', 'in:'.implode(',', self::CATEGORIES)],
            'type' => ['required', 'string', 'in:'.implode(',', self::TYPES)],
        ]);

        $filename = $validated['category'].'-'.$validated['type'].'.xlsx';
        $path = self::STORAGE_DIR.'/'.$filename;

        if (Storage::disk('local')->exists($path)) {
            Storage::disk('local')->delete($path);
        }

        return back()->with('success', 'File deleted successfully.');
    }

    public function download(string $category, string $type)
    {
        if (!in_array($category, self::CATEGORIES, true) || !in_array($type, self::TYPES, true)) {
            abort(404);
        }

        $filename = $category.'-'.$type.'.xlsx';
        $path = self::STORAGE_DIR.'/'.$filename;

        if (!Storage::disk('local')->exists($path)) {
            abort(404);
        }

        return response()->download(Storage::disk('local')->path($path), $filename);
    }

    public function filesMeta(): array
    {
        $files = [];

        foreach (self::CATEGORIES as $category) {
            foreach (self::TYPES as $type) {
                $filename = $category.'-'.$type.'.xlsx';
                $path = self::STORAGE_DIR.'/'.$filename;
                $exists = Storage::disk('local')->exists($path);

                $files[] = [
                    'key' => $category.'-'.$type,
                    'category' => $category,
                    'type' => $type,
                    'exists' => $exists,
                    'downloadUrl' => $exists
                        ? '/exam-results/'.$category.'/'.$type
                        : null,
                    'updatedAt' => $exists
                        ? date('Y-m-d H:i', Storage::disk('local')->lastModified($path))
                        : null,
                ];
            }
        }

        return $files;
    }
}
