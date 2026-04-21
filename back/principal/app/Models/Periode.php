<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periode extends Model
{
    use HasFactory;

    protected $table = 'periodes';

    protected $fillable = [
        'trimestre_1_ini',
        'trimestre_1_fi',
        'trimestre_2_ini',
        'trimestre_2_fi',
        'trimestre_3_ini',
        'trimestre_3_fi',
    ];

    /**
     * Get the dates as Carbon instances.
     */
    protected $casts = [
        'trimestre_1_ini' => 'date',
        'trimestre_1_fi' => 'date',
        'trimestre_2_ini' => 'date',
        'trimestre_2_fi' => 'date',
        'trimestre_3_ini' => 'date',
        'trimestre_3_fi' => 'date',
    ];

    /**
     * Appends accessors to the model's array form.
     */
    protected $appends = ['anual'];

    /**
     * Accessor for the academic year (e.g., "2025/2026").
     */
    public function getAnualAttribute()
    {
        if ($this->trimestre_1_ini && $this->trimestre_3_fi) {
            return $this->trimestre_1_ini->format('Y') . '/' . $this->trimestre_3_fi->format('Y');
        }
        return "Curs " . $this->id;
    }

    public function cursos()
    {
        return $this->hasMany(Curs::class , 'id_periode');
    }
}