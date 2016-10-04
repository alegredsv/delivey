<?php

namespace CodeDelivery\Http\Controllers\Api\Deliveryman;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\ProductRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Services\OrderService;
use Illuminate\Http\Request;
use CodeDelivery\Http\Requests;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class DeliverymanCheckoutController extends Controller
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
        $id = Authorizer::getResourceOwnerId();
        $orders  = $this->repository->with(['item'])->scopeQuery(function ($query) use ($id) {
            return $query->where('user_deliveryman_id','=',$id);
        })->paginate();
        return $orders;
    }

    public function show($id){
        $idDeliveryman = Authorizer::getResourceOwnerId();

        return $this->repository->getByIdAndDeliveryman($id,$idDeliveryman);
    }
}
