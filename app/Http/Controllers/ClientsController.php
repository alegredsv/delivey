<?php

namespace CodeDelivery\Http\Controllers;

use CodeDelivery\Http\Requests\AdminClientRequest;
use CodeDelivery\Models\User;
use CodeDelivery\Repositories\CategoryRepository;
use CodeDelivery\Repositories\ClientRepository;
use CodeDelivery\Repositories\ProductRepository;
use CodeDelivery\Repositories\UserRepository;
use Illuminate\Http\Request;

use CodeDelivery\Http\Requests;
use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Http\Requests\AdminProductRequest;

class ClientsController extends Controller
{
    private $repository;
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var CategoryRepository
     */


    public function __construct(ClientRepository $repository, UserRepository $userRepository)
    {
        $this->repository = $repository;

        $this->userRepository = $userRepository;
    }

    public function index(){

        $clients = $this->repository->paginate();
       return view('admin.clients.index', compact('clients'));
    }

    public function create(){

        $users =  $this->userRepository->listsUsers(['name','id']);
        return view('admin.clients.create', compact('category','users'));
    }

    public function store(AdminClientRequest $request){
        $data = $request->all();
        $this->repository->create($data);
        return redirect()->route('admin.clients.index');
    }

    public function edit($id){
        $users =  $this->userRepository->listsUsers(['name','id']);
        $client = $this->repository->find($id);
        return view('admin.clients.edit', compact('client','users'));
    }


    /**
     * @param Requests\AdminProductRequest $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(AdminClientRequest $request, $id)
    {
        $data = $request->all();
        $this->repository->update($data,$id);
        return redirect()->route('admin.clients.index');
    }

    public function destroy($id){
        $this->repository->delete($id);
        return redirect()->route('admin.clients.index');
    }
}
