import React from 'react';

import './option.css'
export default class SelectOption extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var imgStyles = {
            marginLeft: 'auto',
            marginRight: 'auto',
            width:'20%',
            marginTop:'20px',
        }
        var cardStyles = {
            Height:'100%',
            padding:'5px',
            width:'100%',
            marginLeft:'auto',
            marginRight:'auto',
            boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)'
        }
        if(this.props.item.selected){
            cardStyles.backgroundColor = '#2dce89'
            cardStyles.color = 'white';
            //imgStyles.filter = 'invert(1)';
        }
        return(
            <div className="card card-option" onClick={()=>{this.props.selectOptionHandler(this.props.index)}} style={cardStyles}>
                <img className="card-img-top img-fluid" src={this.props.item.imageSrc} style={imgStyles} alt="Card image cap"/>
                <div className="card-body">
                    <p className="card-text text-center">{this.props.item.text}</p>
                </div>
            </div>
        )
    }
}