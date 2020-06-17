import React from 'react';

export default class BoxContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var containerStyle ={
            height: 'auto',
            width: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            // boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)'
        }
        return(
        <div style={containerStyle}>
            {this.props.serverErrorMsg?
                <div className="alert alert-danger" role="alert">
                    <strong>Server Error:   </strong>{this.props.serverErrorMsg}
                </div>
            :null}
            <div className='container h-100'>
                <div className='mt-2' style={{minHeight:'37em',backgroundColor:'transparent'}}>
                    {this.props.children[0]}
                </div>
                <div style={{marginTop:'30px',paddingBottom:'30px'}}>
                    {this.props.children[1]}
                </div>
            </div>
        </div>
        )
    }
}