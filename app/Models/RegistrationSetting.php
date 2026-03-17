<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrationSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'register_link',
        'attention_en',
        'attention_mm',
        'note_en',
        'note_mm',
    ];
}
