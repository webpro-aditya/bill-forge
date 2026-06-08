<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organization_user_roles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('organization_role_id')->constrained()->cascadeOnDelete();
            $table->unique(['organization_id', 'user_id', 'organization_role_id'], 'our_org_user_role_unique');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organization_user_roles');
    }
};
