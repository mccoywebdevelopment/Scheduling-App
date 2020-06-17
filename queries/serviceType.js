function getTotal(user){
    var total = 0.00;
    for(var i=0;i<user.subscribedItems.length;++i){
        total = total + parseInt(user.subscribedItems[i].initialCharge);
    }
    return total;
}

module.exports = { getTotal }