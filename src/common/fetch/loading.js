import './loading.less';
import $ from 'jquery';

/**
 * 等待loading
 * @type {Object}
 */
let waite = {
    $waiteBox: $('<div class="global-waite-box">\
        <div class="ball-spin-fade-loader">\
            <div></div>\
            <div></div>\
            <div></div>\
            <div></div>\
            <div></div>\
            <div></div>\
            <div></div>\
            <div></div>\
        </div>\
    </div>'),
    init: function () {
        this.$waiteBox.appendTo('body');
    },
    open: function () {
        this.$waiteBox.show();
    },
    close: function () {
        this.$waiteBox.hide();
    }
};
waite.init();
export default waite;
