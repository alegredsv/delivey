<?php

namespace CodeDelivery\Http\Controllers\Api;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\CupomRepository;
use CodeDelivery\Http\Requests;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class CupomController extends Controller
{
    private $repository;

    private $with = ['client','cupom','item'];


    public function __construct(CupomRepository $repository )
    {
        $this->repository = $repository;

    }

    public function show($code){
        return $this->repository->skipPresenter(false)->findByCode($code);
    }


}
