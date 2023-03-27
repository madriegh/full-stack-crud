<h2>Hi, {{$name}}</h2>
<p>Your clients:</p>
<ul>
    @foreach($clients as $client)
    <li>
        {{$client->name}}, {{$client->email}}
    </li>
    @endforeach
</ul>
