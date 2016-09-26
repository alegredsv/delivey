@extends('app')

@section('content')
    <div class="container">
        <h3>Novo pedido</h3>

        @include('errors._check')


            <div class="container">

                {!! Form::open(['class'=>'form']) !!}
        <div class="form-group">
            <label>Total: </label>
            <p id="total"></p>
            <a href="#" id="btnNewItem" class="btn btn-default">Novo item</a>


            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select class="form-control" name="items[0][product_id]">
                                @foreach($products as $product)
                                    <option data-price="{{$product->price}}" value="{{ $product->id }}">{{ $product->name }} --- {{$product->price}}</option>
                                @endforeach

                            </select>
                        </td>
                        <td>
                            {!! Form::text('items[0][qtd]',1,['class' => 'form-control']) !!}

                        </td>
                    </tr>

                </tbody>


            </table>



        </div>


                <div class="form-group">
                    {!! Form::submit('Criar pedido', ['class'=>'btn btn-primary']) !!}
                </div>
                {!! Form::close() !!}
            </div>


    </div>
    @endsection

@section('post_script')
    <script>
    $('#btnNewItem').click(function () {
      
        var row = $('table tbody > tr:last');
        var newRow = row.clone();
        var length = $('table tbody tr').length;

        newRow.find('td').each(function () {
            var td = $(this);
            input = td.find('input,select');
            name = input.attr('name');
            input.attr('name', name.replace((length -1) + "",length + ""));
        });
        newRow.find('input').find(1);
        newRow.insertAfter(row);
        calculateTotal();
    });

    $(document.body).on('click','select',function () {
        calculateTotal();
    });

    $(document.body).on('blur','input',function () {
        calculateTotal();
    });
        function calculateTotal(){
            var total = 0,
            trLen = $('table tbody tr').length,
            tr = null,price,qtd;

            for (var i=0; i< trLen; i++){

                tr = $('table tbody tr').eq(i);
                price = tr.find(':selected').data('price');
                qtd = tr.find( 'input' ).val();
                total+= price * qtd;
            }

            $('#total').html(total);
        }


    </script>
 @endsection