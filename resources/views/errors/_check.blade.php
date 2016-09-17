@if($errors->any())
    <ul class="alert">
        @foreach($errors->all() as $erro)
            <li>{{$erro}}</li>
        @endforeach
    </ul>
@endif