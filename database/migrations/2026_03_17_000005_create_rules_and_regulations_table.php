<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rules_and_regulations', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('title_en');
            $table->string('title_mm');
            $table->longText('body_en');
            $table->longText('body_mm');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rules_and_regulations');
    }
};
