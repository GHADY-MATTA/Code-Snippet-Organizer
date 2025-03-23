<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SnippetController;


Route::apiResource('snippets', SnippetController::class);
Route::get('snippets/favorites', [SnippetController::class, 'favorites']);
Route::get('snippets/search', [SnippetController::class, 'search']);
Route::get('snippets/search', [SnippetController::class, 'search']);

