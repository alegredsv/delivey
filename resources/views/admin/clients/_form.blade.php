
<div class="form-group">
    {!! Form::label('Cliente','Cliente:') !!}
    {!! Form::select('user_id',$users,null, ['class'=>'form-control']) !!}
</div>


<div class="form-group">
    {!! Form::label('phone','Telefone:') !!}
    {!! Form::text('phone',null, ['class'=>'form-control']) !!}
</div>

<div class="form-group">
    {!! Form::label('address','Endereço:') !!}
    {!! Form::textarea('address',null, ['class'=>'form-control']) !!}
</div>

<div class="form-group">
    {!! Form::label('city','Cidade:') !!}
    {!! Form::text('city',null, ['class'=>'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('state','Estado:') !!}
    {!! Form::text('state',null, ['class'=>'form-control']) !!}
</div>
<div class="form-group">
    {!! Form::label('zipcode','CEP:') !!}
    {!! Form::text('zipcode',null, ['class'=>'form-control']) !!}
</div>

