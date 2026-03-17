<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RuleRegulation extends Model
{
    protected $table = 'rules_and_regulations';

    protected $fillable = [
        'order',
        'title_en',
        'title_mm',
        'body_en',
        'body_mm',
        'is_active',
    ];

    protected $casts = [
        'order' => 'integer',
        'is_active' => 'boolean',
    ];
}
