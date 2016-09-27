@extends('app')

@section('content')
    <div class="container">
        <h3>Meus pedidos</h3>
        <a href="{{route('customer.order.create')}}" class="btn btn-default">Novo pedido</a><br><br>

        <table class="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>AÇÃO</th>
            </tr>
            </thead>
            <tbody>
            @foreach($orders as $order)
                <tr>
                    <td>#{{$order->id}}</td>
                    <td> R$ {{$order->total}}</td>
                    <td>{{$order->status}}</td>

                    <td>
                       {{-- <a href="{{route('customer.order.edit',['id'=>$order->id])}}" class="btn btn-default btn-sm">
                            Editar
                        </a>--}}
                    </td>
                </tr>
            @endforeach
            </tbody>


        </table>
    </div>

{!! $orders->render() !!}}
@endsection