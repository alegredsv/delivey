<?php

namespace CodeDelivery\Http\Controllers;
use CodeDelivery\Http\Requests\AdminCategoryRequest;
use CodeDelivery\Repositories\CategoryRepository;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\UserRepository;
use Illuminate\Http\Request;

use CodeDelivery\Http\Requests;
use CodeDelivery\Http\Controllers\Controller;

class OrdersController extends Controller
{

    /**
     * @var OrderRepository
     */
    private $orderrepository;

    public function __construct(OrderRepository $orderrepository )
    {

        $this->orderrepository = $orderrepository;
    }

    public function index(){

        $orders = $this->orderrepository->paginate();
       
        return view('admin.orders.index', compact('orders'));
    }

    public function create(){

        return view('admin.categories.create');
    }

    public function store(AdminCategoryRequest $request){
        $data = $request->all();
        $this->repository->create($data);
        return redirect()->route('admin.categories.index');
    }

    public function edit($id, UserRepository $userRepository){
        $list_status = ['0' => 'Pendente', '1' => 'A caminho', '2'=>'Entregue', '3'=>'Cancelado'];

        $deliveryman = $userRepository->getDeliveryMan();
        $orders= $this->orderrepository->find($id);

        return view('admin.orders.edit', compact('orders','list_status','deliveryman'));
    }


    public function update(Request $request, $id)
    {
        $data = $request->all();
        $this->orderrepository->update($data,$id);
        return redirect()->route('admin.orders.index');
    }

}
