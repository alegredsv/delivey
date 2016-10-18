<?php

namespace CodeDelivery\Http\Controllers\Api\Client;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\ProductRepository;


use CodeDelivery\Http\Requests;

use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class ClientProductController extends Controller
{
    private $repository;

    private $with = ['client','cupom','item'];


    public function __construct(ProductRepository $productRepository )
    {
        $this->repository = $productRepository;

    }

    public function index(){
        $products = $this->repository->skipPresenter(false)->all();
        return $products;
    }


}
