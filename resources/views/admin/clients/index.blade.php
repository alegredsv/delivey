@extends('app')

@section('content')
<div class="container">
    <h3>Clientes</h3>
    <a href="{{route('admin.clients.create')}}" class="btn btn-default">Novo cliente</a><br><br>
    <table class="table table-bordered">
        <thead>
        <tr>
            <th>ID</th>
            <th>CLIENTES</th>
            <th>TELEFONE</th>
            <th>ENDEREÇO</th>
            <th>AÇÃO</th>
        </tr>
        </thead>
        <tbody>
        @foreach($clients as $client)
        <tr>
            <td>{{$client->id}}</td>
            <td>{{$client->user->name}}</td>
            <td>{{$client->phone}}</td>
            <td>{{$client->address}}</td>
            <td>
                <a href="{{route('admin.clients.edit',['id'=>$client->id])}}" class="btn btn-default btn-sm">
                    Editar
                </a>
                <a href="{{route('admin.clients.destroy',['id'=>$client->id])}}" class="btn btn-danger btn-sm">
                    Remover
                </a>
            </td>
        </tr>
        @endforeach
        </tbody>


    </table>
    {!! $clients->render() !!}
</div>




    @endsection