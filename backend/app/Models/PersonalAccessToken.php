<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PersonalAccessToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'token',
    ];

    public function admin(): BelongsTo {
        return $this->belongsTo(Admin::class);
    }
}
