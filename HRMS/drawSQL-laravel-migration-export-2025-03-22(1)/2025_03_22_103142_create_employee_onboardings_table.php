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

        Schema::create('employee_onboardings', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('empoyee_id');
            $table->foreign('empoyee_id')->references('id')->on('employees');
            $table->integer('onb_task_id');
            $table->enum('status', [""]);
            $table->timestamp('completed_date');
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
        Schema::dropIfExists('employee_onboardings');
    }
};
