import React from 'react';

import BoxContainer from '../../../components/user/scheduling/shared/BoxContainer/BoxContainer';
import ServiceSelect from '../../../components/user/scheduling/ServiceSelect/ServiceSelect';
class ServiceSelectView extends React.Component{
    state = {
        options:[
        {
            text:"I have an ant problem",
            imageSrc:require('./ant.png'),
            selected:false
        },
        {
            text:"I have a termite problem",
            imageSrc:require('./termite.svg'),
            selected:false
        },
        {
            text:"I have a spyder problem",
            imageSrc:require('./spyder.png'),
            selected:false
        },
        {
            text:"I have a rodient problem",
            imageSrc:require('./rat.svg'),
            selected:false
        },
        {
            text:"I have a bee problem",
            imageSrc:require('./bee.svg'),
            selected:false
        },
        {
            text:"Other",
            imageSrc:require('./other.svg'),
            selected:false
        }
    ],
    btnDisabled:true
    }
    selectOption = (index) =>{
        let newState = this.state;

        for(var i=0;i<newState.options.length;++i){
            if(i==index){
                newState.options[i].selected = true;
                newState.btnDisabled = false; 
            }else{
                newState.options[i].selected = false; 
            }
        }

        this.setState(newState);
    }
    render(){
        return(
                <BoxContainer>
                    <div className='row'>
                        <ServiceSelect options={this.state.options} selectOptionHandler={this.selectOption}/>
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

export default ServiceSelectView;