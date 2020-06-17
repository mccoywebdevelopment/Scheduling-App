import React from 'react';

import SelectOption from './SelectOption/SelectOption';
export default class ServiceSelect extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const list = this.props.options.map((item,key)=>{
            return(
                <div key={"option"+key} className="col-lg-4 col-md-6 col-sm-12 h-25" style={{marginTop:'2em'}}>
                    <SelectOption item={item} index={key} selectOptionHandler={this.props.selectOptionHandler}/>
                </div>
            );
        });
        return(
            <>
                <div className="col-lg-12">
                    <h1 className="text-center">What can we help you with?</h1>
                </div>
                <div className="col-lg-12">
                    <p className="text-center">Please select one:</p>
                </div>
                {list}
            </>
        )
    }
}