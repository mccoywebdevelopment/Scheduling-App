import React from "react";
import BoxContainer from '../../../components/user/scheduling/shared/BoxContainer/BoxContainer';
import { API_BASE_URL } from '../../../config/variables';
import { Redirect } from 'react-router-dom';

export default class PestProblem extends React.Component{
    state = {
        btnDisabled:true,
        serverErrorMsg:null,
        redirect:null,

        selected:[
            {
                value:"ants",
                isSelected:false
            },
            {
                value:"mice",
                isSelected:false
            },
            {
                value:"cockroaches",
                isSelected:false
            },
            {
                value:"crickets",
                isSelected:false
            },
            {
                value:"mosquitos",
                isSelected:false
            },
            {
                value:"earwigs",
                isSelected:false
            },
            {
                value:"termites",
                isSelected:false
            },
            {
                value:"weeds",
                isSelected:false
            },
            {
                value:"spiders",
                isSelected:false
            },
            {
                value:"scorpions",
                isSelected:false
            }
        ]
    }
    selectOnchange = (e) => {
        let newState = this.state;
        var isOneTrue = false;
        for(var i=0;i<newState.selected.length;++i){
            if(newState.selected[i].value == e.target.value){
                newState.selected[i].isSelected = !newState.selected[i].isSelected;
            }
            if(newState.selected[i].isSelected==true){
                isOneTrue = true;
            }
        }
        if(isOneTrue){
            newState.btnDisabled = false;
        }else{
            newState.btnDisabled = true;
        }
        this.setState(newState);
    }
    submit = () =>{
        this.fetchUpdateJWT();
    }
    constructor(props){
        super(props);
    }
    fetchUpdateJWT = () =>{
        var body = {};
        var selected = [];
        for(var i=0;i<this.state.selected.length;++i){
            if(this.state.selected[i].isSelected){
                selected.push(this.state.selected[i].value);
            }
        }
        body.selected = selected;
        fetch(API_BASE_URL+"/pest-problem/update/jwt",{
            method:'POST',
            body:JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : this.props.JWT
            },
        }).then(response => response.json())
        .then(res => {
            let newState = this.state;
            if(res.err){
                newState.serverErrorMsg = res.err;
            }else if(res.JWT){
                this.props.onChangeJWT(res.JWT);
                newState.redirect = true;
            }else{
                newState.serverErrorMsg = "Something went wrong."
            }
            this.setState(newState);
        });
    }
    renderRedirect = () =>{
        if(this.state.redirect) {
            return <Redirect to='/select-subscription' />
        }
    }
    render(){
        return(
            <>
            {this.renderRedirect()}
        <BoxContainer serverErrorMsg={null}>
            <div className='row'>
                <div className="col-lg-12" style={{marginBottom:'2em'}}>
                    <h1 className="text-center">Tell us about your pest problem</h1>
                </div>
                <div className="col-lg-12">
                    <p className="text-center">You can select multiple:</p>
                </div>
                <div className='col-lg-12'>
                    <div className="row">
                        <div className="col-lg-3 offset-lg-3" style={{marginBottom:"40px"}}>
                            <div class="form-check">
                                <input class="form-check-input"  type="checkbox" onClick={(e)=>{this.selectOnchange(e)}} value="ants"/>
                                <label class="form-check-label" for="defaultCheck1">
                                    Ants
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1" style={{marginBottom:"40px"}}>
                            <div class="form-check">
                                <input class="form-check-input"  type="checkbox" onClick={(e)=>{this.selectOnchange(e)}} value="mice"/>
                                <label class="form-check-label" for="defaultCheck1">
                                    Mice/Rats
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-3" style={{marginBottom:"40px"}}>
                            <div class="form-check">
                                <input class="form-check-input"  type="checkbox" onClick={(e)=>{this.selectOnchange(e)}} value="cockroaches"/>
                                <label class="form-check-label" for="defaultCheck1">
                                    Cockroaches
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1" style={{marginBottom:"40px"}}>
                            <div class="form-check">
                                <input class="form-check-input"  type="checkbox" onClick={(e)=>{this.selectOnchange(e)}} value="crickets"/>
                                <label class="form-check-label" for="defaultCheck1">
                                    Crickets
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-3" style={{marginBottom:"40px"}}>
                            <div class="form-check">
                                <input class="form-check-input"  type="checkbox" onClick={(e)=>{this.selectOnchange(e)}} value="mosquitos"/>
                                <label class="form-check-label" for="defaultCheck1">
                                    Mosquitoes
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1" style={{marginBottom:"40px"}}>
                            <div class="form-check">
                                <input class="form-check-input"  type="checkbox" onClick={(e)=>{this.selectOnchange(e)}} value="earwigs"/>
                                <label class="form-check-label" for="defaultCheck1">
                                    Earwigs
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-3" style={{marginBottom:"40px"}} >
                            <div class="form-check">
                                <input class="form-check-input"  type="checkbox" onClick={(e)=>{this.selectOnchange(e)}} value="termites"/>
                                <label class="form-check-label" for="defaultCheck1">
                                    Termites
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1">
                            <div class="form-check">
                                <input class="form-check-input"  type="checkbox" onClick={(e)=>{this.selectOnchange(e)}} value="weeds"/>
                                <label class="form-check-label" for="defaultCheck1">
                                    Weeds
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-3">
                            <div class="form-check">
                                <input class="form-check-input"  type="checkbox" onClick={(e)=>{this.selectOnchange(e)}} value="spiders"/>
                                <label class="form-check-label" for="defaultCheck1">
                                    Spiders
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1">
                            <div class="form-check">
                                <input class="form-check-input"  type="checkbox" onClick={(e)=>{this.selectOnchange(e)}} value="scorpions"/>
                                <label class="form-check-label" for="defaultCheck1">
                                    Scorpions
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-lg-4 offset-lg-8 col-md-12">
                    {this.state.btnDisabled?
                                <button className="btn btn-primary btn-block" disabled>Continue</button>
                            :
                                <button className="btn btn-primary btn-block" onClick={this.submit}>Continue</button>
                    }
                </div>
            </div>
        </BoxContainer>
        </>
        );
    }
}
