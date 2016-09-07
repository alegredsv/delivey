<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class OrderItem extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'product_id',
        'order_id',
        'price',
        'qtd'
    ];

    public function product(){
        return $this->belongsTo(\CodeDelivery\Models\Product::class);
    }

    public function order(){
        return $this->belongsTo(\CodeDelivery\Models\Order::class);
    }

}
