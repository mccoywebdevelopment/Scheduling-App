import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default class TimeFrame extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var cardStyles = {
            Height:'100%',
            padding:'5px',
            width:'100%',
            borderWidth:'3px',
            borderColor:'transparent',
            marginLeft:'auto',
            marginRight:'auto',
            boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
            cursor:'pointer'
        }
        var iconStyles = {
            float:'right',
            color:'#CB0806',
            visibility:"hidden"
        }

        if(this.props.data.selected){
            cardStyles.borderColor = '#CB0806';
            iconStyles.visibility = "visible";
        }
        return(
            <div className="col-lg-4" style={{marginBottom:'2em'}}>
                <div className="card" style={cardStyles} onClick={(e)=>{this.props.toggle(null,this.props.index)}}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <h5 className="card-title text-center" style={{color:'#CB0806'}}>{this.props.data.text}</h5>
                                <p className="text-center" style={{opacity:'85%'}}>{this.props.data.time}</p>
                            </div>
                            <div className="col-lg-2">
                                <FontAwesomeIcon style={iconStyles} size={"2x"} icon={faCheckCircle} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}