import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default class SubscriptionCard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var cardStyles = {
            Height:'75px',
            padding:'5px',
            width:'100%',
            borderWidth:'3px',
            borderColor:'transparent',
            marginLeft:'auto',
            marginRight:'auto',
            boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
            minHeight:'17em',
        }
        var iconStyles = {
            float:'right',
            color:'#CB0806',
            visibility:"hidden"
        }
        if(this.props.selected){
            cardStyles.borderColor = '#CB0806';
            // cardStyles.borderWidth = '3px';
            iconStyles.visibility = "visible";
        }
        return(
            <>
                <div className="card" style={cardStyles} >
                    <div className="card-body">
                        <div className="row" style={{height: "-webkit-fill-available"}}>
                            <div className="col-lg-12">
                                <h5 style={{paddingBottom:'20px'}}>{this.props.data.title}</h5>
                            </div>
                            {/* <div className="col-lg-2">
                                <FontAwesomeIcon style={iconStyles} size={"3x"} icon={faCheckCircle} />
                            </div> */}
                            <div className="col-lg-12">
                                <h5>Initial Quote: ${this.props.data.initialQuote}</h5>
                            </div>
                            <div className="col-lg-12">
                                <p>Recurringing Charge: ${this.props.data.recurringCharge}</p>
                            </div>
                            <div className="col-lg-12" style={{display:'flex'}}>
                                <button onClick={(e)=>{this.props.toggleSelect(null,this.props.data.typeID)}} style={{alignSelf: "flex-end",marginLeft:'30%'}} className="btn btn-primary text-center">Select Plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}