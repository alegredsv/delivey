<?php

namespace CodeDelivery\Transformers;

use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\OrderItem;

/**
 * Class OrderItemTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class OrderItemTransformer extends TransformerAbstract
{
    protected $defaultIncludes = ['product'];

    //protected $availableIncludes = ['cupom','itens','client','deliveryman'];
    /**
    /**
     * Transform the \OrderItem entity
     * @param \OrderItem $model
     *
     * @return array
     */
    public function transform(OrderItem $model)
    {
        return [
            'id'         => (int) $model->id,
            'price'         => (float) $model->id,
            'qtd'         => (int) $model->id,
            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeProduct(OrderItem $model){

        if(!$model->product){
            return null;
        }
       // dd($model->product);

        return $this->item($model->product, new ProductTransformer());
    }
}
