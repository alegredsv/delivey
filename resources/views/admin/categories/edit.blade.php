@extends('app')

@section('content')

<div class="container">
    <h3>Editando categoria</h3>
    @if($errors->any())
        <ul class="alert">
            @foreach($errors->all() as $erro)
            <li>{{$erro}}</li>
            @endforeach
        </ul>
@endif
        {!!  Form::open(['route' => 'admin.categories.store']) !!}
    <div class="form-group">
        {!! Form::label('name','Nome:') !!}
        {!! Form::text('name',null, ['class'=>'form-control']) !!}
    </div>
    <div class="form-group">
        {!! Form::submit('Criar categoria', ['class'=>'btn btn-primary']) !!}
    </div>


    {!!  Form::close() !!}
</div>




    @endsection