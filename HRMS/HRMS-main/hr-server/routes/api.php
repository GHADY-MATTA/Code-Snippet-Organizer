<?php

use App\Http\Controllers\MainClockedWorkers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\deleteUpdateDisplayDocumentController;
use App\Http\Controllers\SnippetController;

use App\Http\Controllers\DocumentController;

Route::apiResource('snippets', SnippetController::class);
Route::get('snippets/favorites', [SnippetController::class, 'favorites']);
Route::get('snippets/search', [SnippetController::class, 'search']);
Route::get('snippets/search', [SnippetController::class, 'search']);


// Route for uploading a document
Route::post('documents/upload', [DocumentController::class, 'uploadDocument']);
Route::put('/document/{documentId}/update', [DocumentController::class, 'updateDocument']);
Route::delete('/document/{documentId}/delete', [DocumentController::class, 'deleteDocument']);
Route::match(['get', 'put', 'delete'], 'documents/{id}', [deleteUpdateDisplayDocumentController::class, 'deleteUpdateDisplayDocument']);


Route::patch('snippets/{snippet}/favorite', [SnippetController::class, 'toggleFavorite']);



// For API (routes/api.php)
Route::post('/clock-in', [MainClockedWorkers::class, 'clockIn']);
Route::post('/clock-out', [MainClockedWorkers::class, 'clockOut']);
