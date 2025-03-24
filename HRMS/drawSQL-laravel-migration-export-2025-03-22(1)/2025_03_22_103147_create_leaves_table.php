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

        Schema::create('leaves', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('empoyee_id');
            $table->foreign('empoyee_id')->references('id')->on('employees');
            $table->enum('leave_type', [""]);
            $table->integer('used_days');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', [""]);
            $table->string('reason');
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
        Schema::dropIfExists('leaves');
    }
};
