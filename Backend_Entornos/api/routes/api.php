<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EjercicioController;
use App\Http\Controllers\Api\AlumnoController;
use App\Http\Controllers\Api\ProfesorController;
use App\Http\Controllers\LTIController;
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

Route::post('/lti-launch', [LTIController::class, 'launch']);

Route::controller(EjercicioController::class)->group(function (){
    Route::get('/ejercicios/{id}', 'show');
    Route::get('/ejercicios', 'index');    
    Route::post('/crearEjercicio', 'store');
    Route::get('/ejercicio-aleatorio','indexRandom');
    Route::put('/ejercicioStatsDocente/{id}', 'updateStatsDocente');
    Route::put('/ejercicioPublicarDocente/{id}', 'updatePublicoDocente');    
  });

  Route::controller(AlumnoController::class)->group(function (){  
    Route::post('/registrarAlumno', 'store');
    Route::post('/alumnos/find', 'find');
    Route::put('/alumnosStats/{id}', 'updateStats');
    Route::put('/alumnosStatsNoBackSpace/{id}', 'updateStatsNoBackSpace');
    //Route::put('/alumnosErrors/{id}', 'updateErrors');
    Route::get('/alumnosShow/{id}', 'show');
  });

  Route::controller(ProfesorController::class)->group(function (){
    Route::post('/profesor/find', 'find');
  });
