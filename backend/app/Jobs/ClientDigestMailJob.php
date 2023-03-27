<?php

namespace App\Jobs;

use App\Mail\ClientDigestMail;
use App\Models\Admin;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class ClientDigestMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        $admins = Admin::all();

        foreach($admins as $admin) {
            Mail::to($admin)->send(new ClientDigestMail($admin->clients, $admin->name));
        }
    }
}
