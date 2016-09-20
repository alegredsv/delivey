@extends('app')

@section('content')

<div class="container">
    <h2>Editando pedido : #{{$orders->id}} - R$ {{$orders->total}}</h2>
    <h3>Cliente : {{$orders->client->user->name}}</h3>
    <h4>Data: {{$orders->created_at}} </h4>

    <p>Entregar em:<br>
       <b> {{$orders->client->address}} - {{$orders->client->city}} - {{$orders->client->state}} </b>
    </p>
    @include('errors._check')
        {!!  Form::model($orders, ['route' =>[ 'admin.orders.update', $orders->id]]) !!}
        @include('admin.orders._form')


    <div class="form-group">
        {!! Form::submit('Atualizar pedido', ['class'=>'btn btn-primary']) !!}
    </div>
    {!!  Form::close() !!}
</div>




    @endsection