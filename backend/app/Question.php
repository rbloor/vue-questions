<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'name', 'source', 'type', 'is_checked', 'user_id', 'category_id'
    ];

    public function category()
    {
        return $this->belongsTo('App\Category', 'category_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function answers()
    {
        return $this->hasMany('App\Answer', 'question_id');
    }
}
