import React from 'react';

import BoxContainer from '../../../components/user/scheduling/shared/BoxContainer/BoxContainer';
import CalendarContainer from '../../../components/user/scheduling/Calendar/Calendar';

export default class CreatePt2 extends React.Component{
    state = {
        existing:null,
        btnDisabled:true
    }
    toggleExisting = (e,value) =>{
        let newState = this.state;
        newState.existing = value;
        this.setState(newState);
    }
    render(){
        return(
                    <BoxContainer>
                        <div className='row h-100'>
                            <div className="col-lg-12">
                                <h1 className="text-center">Add your address for service:</h1>
                            </div>
                            <div className='col-lg-12 text-center'>
                                <CalendarContainer/>
                            </div>
                        </div>
                        <div className='row'>
                        <div className="col-lg-4 offset-lg-8 col-md-12"> 
                            {this.state.btnDisabled?
                                        <button className="btn btn-primary btn-block" disabled>Continue</button>
                                    :
                                        <button className="btn btn-primary btn-block">Continue</button>
                            }
                        </div>
                    </div>
                    </BoxContainer>
        )
    }
}