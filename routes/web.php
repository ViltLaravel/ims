<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\SupplierModelController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/admin', [DashboardController::class, 'index'])->name('admin');
});

Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('/user', [DashboardController::class, 'index'])->name('user');
});

Route::middleware(['auth', 'verified', 'role:manager'])->group(function () {
    Route::get('/manager', [DashboardController::class, 'index'])->name('manager');
});

Route::middleware(['auth', 'verified', 'role:admin,manager'])->group(function () {
    Route::prefix('supplier')->group(function () {
        Route::get('/', [SupplierModelController::class, 'index'])->name('supplier.index');
        Route::post('/', [SupplierModelController::class, 'store'])->name('supplier.store');
        Route::delete('/{id}', [SupplierModelController::class, 'destroy'])->name('supplier.delete');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
