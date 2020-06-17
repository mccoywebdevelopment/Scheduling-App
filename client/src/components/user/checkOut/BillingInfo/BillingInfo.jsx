import React from 'react';
import AddressInput from '../../scheduling/AddressInput/AddressInput';

export default class BillingInfo extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
                {this.props.isAddressInput}
            </>
        )
    }
}