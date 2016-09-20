<?php

namespace CodeDelivery\Models;

use CodeDelivery\Models\Order;
use CodeDelivery\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class OrderItem extends Model implements Transformable
{
    use TransformableTrait;
    protected $table = "order_item";
    protected $fillable = [
        'product_id',
        'order_id',
        'price',
        'qtd'
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function order(){
        return $this->belongsTo(Order::class);
    }

}
