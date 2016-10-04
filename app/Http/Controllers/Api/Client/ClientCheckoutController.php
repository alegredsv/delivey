<?php

namespace CodeDelivery\Http\Controllers\Api\Client;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\ProductRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Services\OrderService;
use Illuminate\Http\Request;

use CodeDelivery\Http\Requests;

use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class ClientCheckoutController extends Controller
{
    private $repository;
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var OrderService
     */
    private $orderService;

    public function __construct(OrderRepository $repository,
        UserRepository $userRepository,
           ProductRepository $productRepository, OrderService $orderService )
    {
        $this->repository = $repository;
        $this->userRepository = $userRepository;
        $this->orderService = $orderService;
    }

    public function index(){
        $clientId = Authorizer::getResourceOwnerId();
        $orders  = $this->repository->with(['item'])->scopeQuery(function ($query) use ($clientId) {
            return $query->where('client_id','=',$clientId);
        })->paginate();
        return $orders;
    }

    public function store(Request $request){
        $data = $request->all();
        $Id = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($Id)->client->id;
        $data['client_id'] = $clientId;
        $o = $this->orderService->create($data);
        $or = $this->repository->with('item')->find($o->id);
        return $or;
    }

    public function show($id){
        $o = $this->repository->with(['item','client','cupom'])->find($id);
        $o->item->each(function ($item){
            $item->product;
        });
        return $o;
    }
}
