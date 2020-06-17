import React from 'react';
import DropIn from "braintree-web-drop-in-react";

export default class BrainTree extends React.Component{
    instance;
    constructor(props){
        super(props);
        if(this.props.isSubmit){
          this.submit();
        }
    }
    submit = async() =>{
      const { nonce } = await this.instance.requestPaymentMethod();
      this.props.submit(nonce);
    }
    render(){
        if (!this.props.clientToken) {
            return (
              <div>
                <h1>Loading...</h1>
              </div>
            );
          } else {
            return (
              <div>
                <DropIn
                  options={{ authorization: this.props.clientToken}}
                  onInstance={instance => (this.instance = instance)}
                />
                <button className="btn btn-primary btn-block" onClick={this.submit}>Pay</button>
              </div>
            );
          }
    }
}