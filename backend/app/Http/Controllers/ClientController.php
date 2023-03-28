<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->get('user');
        $clients = $user->clients;
        return $this->sendResponse(ClientResource::collection($clients), 'Clients retrieved successfully.');
    }

    public function store(Request $request)
    {
        $user = $request->get('user');
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => ['required'],
            'email' => ['required', 'email'],
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $client = Client::create([
            'admin_id' => $user->id,
            'name' => $input['name'],
            'email' => $input['email'],
        ]);

        return $this->sendResponse(new ClientResource($client), 'Client created successfully.');
    }

    public function show(Request $request, $id)
    {
        $user = $request->get('user');
        $client = Client::find($id);

        if (!$client) {
            return $this->sendError('Client not found.');
        }

        if($client->admin_id != $user->id) {
            return $this->sendError('Unauthorized');
        }

        return $this->sendResponse(new ClientResource($client), 'Client retrieved successfully.');
    }

    public function update(Request $request, $id)
    {
        $user = $request->get('user');
        $client = Client::find($id);

        if (!$client) {
            return $this->sendError('Client not found.');
        }

        if($client->admin_id != $user->id) {
            return $this->sendError('Unauthorized');
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => ['required'],
            'email' => ['required', 'email'],
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $client->name = $input['name'];
        $client->email = $input['email'];
        $client->save();

        return $this->sendResponse(new ClientResource($client), 'Client updated successfully.');
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->get('user');
        $client = Client::find($id);

        if (!$client) {
            return $this->sendError('Client not found.');
        }

        if($client->admin_id != $user->id) {
            return $this->sendError('Unauthorized');
        }

        $client->delete();

        return $this->sendResponse([], 'Client deleted successfully.');
    }
}
