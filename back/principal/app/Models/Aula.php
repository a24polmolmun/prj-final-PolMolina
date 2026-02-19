<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aula extends Model
{
    protected $fillable = [
        'nom',
    ];

    public function horaris()
    {
        return $this->hasMany(Horari::class, 'id_aula');
    }
}
