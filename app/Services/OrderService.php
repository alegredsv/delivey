<?php
/**
 * Created by PhpStorm.
 * User: awichmann
 * Date: 26/09/2016
 * Time: 12:52
 */

namespace CodeDelivery\Services;


use CodeDelivery\Repositories\CupomRepository;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\ProductRepository;
use DB;

class OrderService
{
    /**
     * @var ProductRepository
     */
    private $productRepository;
    /**
     * @var CupomRepository
     */
    private $cupomRepository;
    /**
     * @var OrderRepository
     */
    private $orderRepository;

    public function __construct(OrderRepository $orderRepository, CupomRepository $cupomRepository, ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
        $this->cupomRepository = $cupomRepository;
        $this->orderRepository = $orderRepository;
    }


    public function create(array $data){


       DB::beginTransaction();
        try {
            $data['status'] = 0;

            if (isset($data['cupom_code'])) {
                $cupom = $this->cupomRepository->findByField('code', $data['cupom_code'])->first();
                $data['cupom_id'] = $cupom->id;
                $cupom->used = 1;
                $cupom->save();
                unset($data['cupom_code']);
            }

            $items = $data['items'];
            unset($data['items']);
            $order = $this->orderRepository->create($data);
            
            $total = 0;
            foreach ($items as $item) {
                $item['price'] = $this->productRepository->find($item['product_id'])->price;

                $order->item()->create($item);
                $total += $item['price'] * $item['qtd'];
            }

            $order->total = $total;
            if (isset($cupom)) {
                $order->total = $total - $cupom->value;
            }
            $order->save();
            DB::commit();
        }catch (\Exception $e){
           DB::rollback();
            throw $e;
        }
    }
}