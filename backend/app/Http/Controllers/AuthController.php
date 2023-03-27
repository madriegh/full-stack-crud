<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\PersonalAccessToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'email' => ['required', 'email', Rule::unique('admins')],
            'password' => ['required'],
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        Admin::create($input);

        return $this->sendResponse([], 'User register successfully.');
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $admin = Admin::where('email', '=', $input['email'])->first();

        if(!$admin || !Hash::check($input['password'], $admin->password)) {
            return $this->sendError('Login error.', ['Invalid credentials.']);
        }

        $token = Str::random(64);
        PersonalAccessToken::create([
            'admin_id' => $admin->id,
            'token' => $token,
        ]);

        $success['name'] = $admin->name;
        $success['token'] = $token;

        return $this->sendResponse($success, 'User logged in successfully.');
    }
}
