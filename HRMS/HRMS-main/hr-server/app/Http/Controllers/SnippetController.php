<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Illuminate\Http\Request;

class SnippetController extends Controller
{
    // Get all snippets
    public function index()
    {
        return Snippet::all();
    }

    // Store a new snippet
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'code' => 'required|string',
            'language' => 'required|string',
            'tags' => 'array',
            'favorite' => 'boolean'
        ]);
        return Snippet::create($validated);
    }
    // Get a single snippet
    public function show(Snippet $snippet)
    {
        return $snippet;
    }

    // Update a snippet
    public function update(Request $request, Snippet $snippet)
    {
        $snippet->update($request->all());
        return $snippet;
    }

    // Delete a snippet
    public function destroy(Snippet $snippet)
    {
        $snippet->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }

    // Get favorite snippets
    public function favorites()
    {
        return Snippet::where('favorite', true)->get();
    }

    // Search snippets by title, language, or tags
    public function search(Request $request)
    {
        return Snippet::where('title', 'like', "%{$request->query('q')}%")
            ->orWhere('language', 'like', "%{$request->query('q')}%")
            ->orWhereJsonContains('tags', $request->query('q'))
            ->get();
    }

}
