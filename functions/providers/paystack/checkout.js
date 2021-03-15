const PAYSTACK_PUBLIC_KEY = "pk_live_b87be6967bf3c8d0663b12d770fde6af7abb5437";
const PAYSTACK_SECRET_KEY = "sk_live_b39dab9e1c9e14c6e73c364d896d7e3b2f046762";

var paystack = require('paystack')(PAYSTACK_SECRET_KEY);
const templateLib = require('./template');

module.exports.render_checkout = function (request, response) {

    var order_id = request.body.order_id;
    var email = request.body.email;
    var amount = request.body.amount;

    response.send(templateLib.getTemplate(
        PAYSTACK_PUBLIC_KEY,
        order_id,
        email,
        amount
    ));
};

module.exports.process_checkout = function (request, response) {
    paystack.transaction.verify(request.query.reference, (error, body) => {
        if(error){
            response.redirect('/cancel');
            return;
        }
        if(body.status){
            let data = body.data;
            if(data.status === 'success'){
                response.redirect("/success?order_id=" + data.metadata.order_id + "&amount=" + parseFloat(data.amount/100) + "&transaction_id=" + data.reference);
            }else{
                response.redirect('/cancel');
            }
        }else{
            response.redirect('/cancel');
        }
    });
};