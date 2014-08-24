/**
 * Created by beanu on 14-3-20.
 */
angular.module('starter.filters', [])
    .filter('test', function () {
        return function (items, index) {
            var out = [];
            for (var i = 0; i < items.length; i++) {
                if (i >= index * 3 && i < (index + 1) * 3)
                    out.push(items[i]);
            }
            return out;
        }
    });