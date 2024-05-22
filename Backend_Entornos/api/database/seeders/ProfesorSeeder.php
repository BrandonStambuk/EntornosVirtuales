<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfesorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
        public function run()
        {
            DB::table('profesos')->insert([
                'nombre' => 'admin',
                'apellido' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => '123',
                'is_profesor' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    
}
