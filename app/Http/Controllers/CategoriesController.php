<?php

namespace CodeDelivery\Http\Controllers;
use CodeDelivery\Http\Requests\AdminCategoryRequest;
use CodeDelivery\Repositories\CategoryRepository;
use Illuminate\Http\Request;

use CodeDelivery\Http\Requests;
use CodeDelivery\Http\Controllers\Controller;

class CategoriesController extends Controller
{
    private $repository;
    public function __construct(CategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(CategoryRepository $repository){

        $categories = $this->repository->paginate();
        return view('admin.categories.index', compact('categories'));
    }

    public function create(){

        return view('admin.categories.create');
    }

    public function store(AdminCategoryRequest $request){
        $data = $request->all();
        $this->repository->create($data);
        return redirect()->route('admin.categories.index');
    }

    public function edit($id){

        $category = $this->repository->find($id);
        return redirect()->route('admin.categories.edit', compact('category'));
    }
}
