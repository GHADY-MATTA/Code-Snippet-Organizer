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

        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('empoyee_id');
            $table->foreign('empoyee_id')->references('id')->on('employees');
            $table->bigInteger('program_id');
            $table->foreign('program_id')->references('id')->on('programs');
            $table->bigInteger('document_id')->nullable();
            $table->foreign('document_id')->references('id')->on('documents');
            $table->string('certificate_name');
            $table->date('issued_date');
            $table->date('expire_date');
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
        Schema::dropIfExists('certifications');
    }
};
