import React from 'react';
import renderHTML from 'react-render-html';
import {Helmet} from "react-helmet";
import {API_BASE_URL} from "../../../../config/variables"
import { set } from 'mongoose';


export default class WorldPay extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount = () =>{
        var item = localStorage.getItem("isReloaded");
        if(item != 'true'){
            localStorage.setItem("isReloaded",true);
            window.location.reload();
        }
    }
    render(){

        return(
            
            <div>
                <Helmet>
                <script src="https://cdn.worldpay.com/v1/worldpay.js"></script>
                <script type='text/javascript'>{`
                    window.onload = function() {
                    Worldpay.useTemplateForm({
                        'clientKey':'T_C_a660bb08-7918-451f-8bbc-d5b191f19108',
                        'form':'paymentForm',
                        'paymentSection':'paymentSection',
                        'display':'inline',
                        'reusable':true,
                        'callback': function(obj) {
                        if (obj && obj.token) {
                            var _el = document.createElement('input');
                            _el.value = obj.token;
                            console.log(obj);
                            _el.type = 'hidden';
                            _el.name = 'token';
                            console.log(_el.value);
                            fetch("`+API_BASE_URL+`/checkout/world-pay/create/payment-profile",{
                                method:'POST',
                                body:JSON.stringify({token:_el.value}),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization' : '`+this.props.JWT+`'
                                },
                            }).then(response => response.json())
                            .then(res => {
                                alert(res);
                            }); 
                        }
                    }
                    });
                    }
                `}</script>
                
                </Helmet>
                
                <div id='paymentSection'></div>

             </div>

        );
    }
    
}