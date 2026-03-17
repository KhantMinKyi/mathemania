<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrationStep extends Model
{
    use HasFactory;

    protected $fillable = [
        'language',
        'order',
        'content',
        'hint',
    ];

    protected $casts = [
        'order' => 'integer',
    ];
}
