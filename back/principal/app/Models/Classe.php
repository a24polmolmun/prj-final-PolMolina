<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_curs',
        'nom',
        'id_tutor',
    ];

    public function curs()
    {
        return $this->belongsTo(Curs::class, 'id_curs');
    }

    public function tutor()
    {
        return $this->belongsTo(User::class, 'id_tutor');
    }

    public function horaris()
    {
        return $this->hasMany(Horari::class, 'id_classe');
    }
}
