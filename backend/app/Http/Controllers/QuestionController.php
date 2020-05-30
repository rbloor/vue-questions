<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Http\Resources\Question as QuestionResource;

class QuestionController extends Controller
{
    public function index()
    {
        $questions = Question::with("answers")->get();
        return QuestionResource::collection($questions);
    }

    public function store(Request $request)
    {
        //
    }
    
    public function show($id)
    {
        //
    }
    
    public function destroy($id)
    {
        //
    }
}
