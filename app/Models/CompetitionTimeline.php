<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetitionTimeline extends Model
{
    use HasFactory;

    protected $fillable = [
        'order',
        'label',
        'title',
        'primary_label',
        'primary_date',
        'secondary_label',
        'secondary_date',
    ];

    protected $casts = [
        'primary_date' => 'date',
        'secondary_date' => 'date',
    ];
}
