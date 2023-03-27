<?php

namespace App\Http\Middleware;

use App\Models\PersonalAccessToken;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Authenticate
{
    public function handle(Request $request, Closure $next)
    {
        $requestToken = $request->header('Authorization');
        $personalAccessToken = PersonalAccessToken::where('token', '=', $requestToken)->first();

        if(!$personalAccessToken) {
            return response()->json('Invalid access token.', Response::HTTP_UNAUTHORIZED);
        }

        $request->merge(['user' => $personalAccessToken->admin]);

        return $next($request);
    }
}
