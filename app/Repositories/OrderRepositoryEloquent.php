<?php

namespace CodeDelivery\Repositories;


use CodeDelivery\Presenters\OrderPresenter;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Models\Order;


/**
 * Class OrderRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class OrderRepositoryEloquent extends BaseRepository implements OrderRepository
{
    protected $skipPresenter = true;
    public function getByIdAndDeliveryman($id,$idDeliverymen){

        $result = $this->with(['client','item','cupom'])->findWhere([
                 'id' => $id,
                'user_deliveryman_id' => $idDeliverymen]
        );

    
        if($result instanceof Collection){

            $result = $result->first();
            $result->item->each(function ($item){
                $item->product;
            });
        }else{
            if(isset($result['data']) && count($result['data']) == 1){
                $result = [
                    'data' => $result['data'][0]
                ];
            }else{
                throw new ModelNotFoundException("Order não existe");
             }
        }
        return ($result != null) ?$result: array();
    }
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Order::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    /**
     * @return Application
     */
    public function presenter()
    {
        return OrderPresenter::class;
    }
}
