<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'date',
        'time',
        'service',
        'location',
        'address',
        'status',
        'title',
    ];

    protected $casts = [
        'date' => 'date',
        'time' => 'datetime',
    ];

    public function getTitleAttribute()
    {
        return $this->service;
    }

    public function getClientAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }
}
