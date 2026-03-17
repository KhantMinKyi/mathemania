<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'order',
        'bank_name',
        'account_name',
        'account_number',
        'qr_image_path',
    ];

    protected $casts = [
        'order' => 'integer',
    ];
}
