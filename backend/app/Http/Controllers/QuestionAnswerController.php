<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Answer;
use App\Http\Resources\Answer as AnswerResource;

class QuestionAnswerController extends Controller
{
    public function index($id)
    {
        $answers = Answer::where("question_id", $id)->get();
        return AnswerResource::collection($answers);
    }
}
