<?php

namespace CodeDelivery\Transformers;

use Illuminate\Database\Eloquent\Collection;
use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Order;

/**
 * Class OrderTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class OrderTransformer extends TransformerAbstract
{
    //protected $defaultIncludes = ['cupom','itens'];

    protected $availableIncludes = ['cupom','itens','client','deliveryman'];
    /**
     * Transform the \Order entity
     * @param \Order $model
     *
     * @return array
     */
    public function transform(Order $model)
    {
        
        return [
            'id'         => (int) $model->id,
            'total'      =>  $model->total,
            'product_names'      =>  $this->getArrayProducyNames($model->item),
            'hash'      =>  $model->hash,

            'status'      =>  $model->status,


            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
    protected function getArrayProducyNames(Collection $items){
        $names= [];
        foreach ($items as $item){
            $names[] = $item->product->name;
        }
        return $names;
    }
    public function includeCupom(Order $model){

        if(!$model->cupom){
            return null;
        }
        return $this->item($model->cupom, new CupomTransformer());
    }

    public function includeItens(Order $model){

        if(!$model->item){
            return null;
        }
        return $this->collection($model->item, new OrderItemTransformer());
    }
    public function includeClient(Order $model){

        if(!$model->client){
            return null;
        }
        return $this->item($model->client, new ClientTransformer());
    }

    public function includeDeliveryman(Order $model){

        if(!$model->deliveryman){
            return null;
        }
     
        return $this->item($model->deliveryman, new DeliverymanTransformer());
    }
}
