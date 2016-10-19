/**
 * Created by awichmann on 19/10/2016.
 */
angular.module('starter.services')
    .service('$cart', ['$localStorage', function ($localStorage) {
        var key = 'cart';
        this.clear = function () {
            $localStorage.setObject(key, {
                items: [],
                total: 0
            })
        };
        this.get = function () {
            return $localStorage.getObject(key);
        };
        this.getItem = function (i) {
            return this.get().items[i];
        };
        this.addItem = function (item) {
            var cart = this.get();
            var itemAux;
            var exists = false;
            for (var index in cart.items) {
                itemAux = cart.items[index];
                if (itemAux.id == item.id) {
                    itemAux.qtd = item.qtd + itemAux.qtd;
                    itemAux.subtotal = calculateSubtotal(itemAux);
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                item.subtotal = calculateSubtotal(item);
                cart.items.push(item);
            }
            cart.total = getTotal(cart.items);
            $localStorage.setObject(key, cart);
        };

        this.removeItem = function (i) {
            var cart = this.get();
            cart.items.splice(i,1);
            cart.total = getTotal(cart.items);
            $localStorage.setObject(key, cart);
        };
        function calculateSubtotal(item) {
            return item.price * item.qtd;
        }
        function getTotal(items) {
            var sum = 0;
            angulad.forEach(items,function (item) {
                sum+=item.subtotal;
            });
            return sum;
        }
    }]);