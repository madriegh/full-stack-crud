<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\File;
use Illuminate\Http\UploadedFile;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'admin_id',
        'picture',
    ];
}
