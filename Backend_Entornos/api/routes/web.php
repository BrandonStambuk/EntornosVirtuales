<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});
Route::get('/agregar', function () {
    return view('index');
});
Route::get('/mostrar', function () {
    return view('index');
});
Route::get('/inicio-sesion', function () {
    return view('index');
});
Route::get('/stats', function () {
    return view('index');
});
Route::get('/registrar-alumno', function () {
    return view('index');
});
Route::get('/mostrar-NoBackspace/:id', function () {
    return view('index');
});
Route::get('/mostrarEjercicio', function () {
    return view('index');
});
Route::get('/mostrarEjercicio/:id', function () {
    return view('index');
});
Route::get('/mostrar/:id', function () {
    return view('index');
});

