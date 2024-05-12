<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EjercicioController;
use App\Http\Controllers\Api\AlumnoController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(EjercicioController::class)->group(function (){
    Route::get('/ejercicios/{id}', 'show');
    Route::get('/ejercicios', 'index');    
    Route::post('/crearEjercicio', 'store');
    Route::get('/ejercicio-aleatorio','indexRandom');
  });

  Route::controller(AlumnoController::class)->group(function (){  
    Route::post('/registrarAlumno', 'store');
    Route::post('/alumnos/find', 'find');
    Route::put('/alumnosStats/{id}', 'updateStats');
    Route::get('/alumnosShow/{id}', 'show');

  });
