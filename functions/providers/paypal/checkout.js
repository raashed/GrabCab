const templateLib = require('./template');

const paypal_client_id= 'IDE7RR4J8BRH8D4';

module.exports.render_checkout = function(request, response){
    var amount = request.body.amount;
    var currency = request.body.currency;
    var server_url = request.protocol + "://" + request.get('host');
    response.send(templateLib.getTemplate(server_url,paypal_client_id,amount,currency));
};