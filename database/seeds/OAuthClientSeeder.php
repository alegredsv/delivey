<?php

use CodeDelivery\Models\Category;
use CodeDelivery\Models\Product;
use Illuminate\Database\Seeder;

class OAuthClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('oauth_clients')->insert([
            [
                'id' => 'appid02',
                'secret' => 'secret',
                'name' => 'Minha aplicação mobile - ionic',
                'created_at' => '03/02/2016',
                'updated_at' => '03/02/2016',
            ]
        ]);

    }
}
