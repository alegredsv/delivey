<div class="form-group">
    {!! Form::label('Category','Categoria:') !!}
    {!! Form::select('category_id',$category,null, ['class'=>'form-control']) !!}
</div>


<div class="form-group">
    {!! Form::label('name','Nome:') !!}
    {!! Form::text('name',null, ['class'=>'form-control']) !!}
</div>

<div class="form-group">
    {!! Form::label('Description','Descrição:') !!}
    {!! Form::textarea('description',null, ['class'=>'form-control']) !!}
</div>

<div class="form-group">
    {!! Form::label('Price','Preço:') !!}
    {!! Form::text('price',null, ['class'=>'form-control']) !!}
</div>