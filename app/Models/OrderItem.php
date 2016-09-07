<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
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
