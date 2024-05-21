<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alumno;

class AlumnoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $alumno=new Alumno();
        $alumno->nombre = $request->nombre;
        $alumno->apellido = $request->apellido;
        $alumno->email = $request->email;
        $alumno->password = $request->password;
        $alumno->stats = $request->stats;
        $alumno->errors = $request->errors;
        $alumno->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $alumno = Alumno::find($id);
        return $alumno;
    }

    public function find(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $alumno = Alumno::where('email', $request->email)
                        ->where('password', $request->password)
                        ->first();
    
        if ($alumno) {
            return response()->json(['id' => $alumno->id]);
        } else {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
    }

    public function updateStats(Request $request, $id)
    {
        $alumno = Alumno::findOrFail($request->id);
        $alumno->stats = $request->stats;
        $alumno->errors = $request->errors;
        $alumno->save();
        return $alumno;
    }

    public function updateStatsNoBackSpace(Request $request, $id)
    {
        $alumno = Alumno::findOrFail($request->id);
        $alumno->statsNoBackSpace = $request->statsNoBackSpace;
        $alumno->errorsNoBackSpace = $request->errorsNoBackSpace;
        $alumno->save();
        return $alumno;
    }

    public function updateErrors(Request $request, $id)
    {
        $alumno = Alumno::findOrFail($request->id);
        $alumno->errors = $request->errors;
        $alumno->save();
        return $alumno;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
