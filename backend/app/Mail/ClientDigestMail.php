<?php

namespace App\Mail;

use App\Models\Admin;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class ClientDigestMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(
        public Collection $clients,
        public string $name
    ) {}

    public function envelope()
    {
        return new Envelope(
            subject: 'Client Digest Mail'
        );
    }

    public function content()
    {
        return new Content(
            view: 'emails.client-digest',
        );
    }
}
