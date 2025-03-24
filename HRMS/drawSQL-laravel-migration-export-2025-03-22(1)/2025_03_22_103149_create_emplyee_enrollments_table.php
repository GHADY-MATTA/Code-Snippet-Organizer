<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('emplyee_enrollments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('empoyee_id');
            $table->foreign('empoyee_id')->references('id')->on('employees');
            $table->bigInteger('program_id');
            $table->foreign('program_id')->references('id')->on('programs');
            $table->date('enrollment_date');
            $table->date('completion_date');
            $table->enum('status', [""]);
            $table->decimal('progress');
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
            $table->timestamp('deleted_at');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emplyee_enrollments');
    }
};
