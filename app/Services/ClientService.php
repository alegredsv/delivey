<?php
/**
 * Created by PhpStorm.
 * User: awichmann
 * Date: 19/09/2016
 * Time: 13:08
 */

namespace CodeDelivery\Services;


use CodeDelivery\Repositories\ClientRepository;
use CodeDelivery\Repositories\UserRepository;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class ClientService
{

    /**
     * @var ClientRepository
     */
    private $clientRepository;
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(ClientRepository $clientRepository, UserRepository $userRepository)
    {

        $this->clientRepository = $clientRepository;
        $this->userRepository = $userRepository;
    }

    public function update(array $data, $id){

        $this->clientRepository->update($data, $id);
        $userId = $this->clientRepository->find($id,['user_id'])->user_id;
        $this->userRepository->update($data['user'], $userId);

    }

    public function create(array $data){
        $data['user']['password'] = bcrypt(123456);
        $userId =  $this->userRepository->create($data['user']);

        $data['user_id'] = $userId->id;
     
        $this->clientRepository->create($data);
    }

    public function getAuthenticatedUser(){
       return  $this->userRepository->skipPresenter(false)->find(Authorizer::getResourceOwnerID());
    }



}