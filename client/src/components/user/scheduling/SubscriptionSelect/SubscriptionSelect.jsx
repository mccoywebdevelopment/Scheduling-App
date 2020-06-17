import React from 'react';

import SubscriptionCard from "./SubscriptionCard/SubscriptionCard";
export default class SubscriptionSelect extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var isRec = false;
        var isAdditional = false;
        const recList = this.props.options.map((item,key)=>{
            if(item.isRecommended){
                isRec = true;
            }
            return(
                <React.Fragment>
                {item.isRecommended?
                <div key={"option"+key} className="col-lg-4 col-md-6 col-sm-12 h-25" style={{marginTop:'2em'}}>
                    <SubscriptionCard toggleSelect={this.props.toggleSelect} selected={item.isSelected} data={item} key={"subscriptionCard12"+key}/>
                </div>
                :null
                }
                </React.Fragment>
            );
        });
        const list = this.props.options.map((item,key)=>{
            if(!item.isRecommended && isRec){
                isAdditional = true;
            }
            return(
                <React.Fragment>
                {!item.isRecommended?
                <div key={"option"+key} className="col-lg-4 col-md-6 col-sm-12 h-25" style={{marginTop:'2em'}}>
                    <SubscriptionCard toggleSelect={this.props.toggleSelect} selected={item.isSelected} data={item} key={"subscriptionCard12"+key}/>
                </div>
                :null
                }
                </React.Fragment>
            );
        });
        return(
            <>
                <div className="row">
                    {!isRec?
                         <div className="col-lg-12">
                            <h1 className="text-center">Service Plan(s):</h1>
                        </div>
                    :   null
                    }
                    {isRec?
                        <div className="col-lg-12">
                            <h1 className="text-center">Recommended Service Plan(s):</h1>
                        </div>
                        :
                        null
                    }
                    {recList}
                    {isAdditional?
                        <div className="col-lg-12" style={{marginTop:"30px"}}>
                            <h1 className="text-center">Additional: Service Plan(s):</h1>
                        </div>
                        :
                        null
                    }
                    {list}
                </div>
            </>
        )
    }
}