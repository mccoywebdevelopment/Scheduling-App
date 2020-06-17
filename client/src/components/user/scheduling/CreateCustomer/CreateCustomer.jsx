import React from 'react';

export default class CreateCustomer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputFirstName">First Name</label>
                        <input required type="text" className="form-control" onChange={this.props.onChangeFirstName} 
                            style={this.props.errors["firstName"]?{borderColor:'red'}:null} id="inputFirstName" 
                            placeholder="First Name" name="firstName" value={this.props.firstName}/>
                        {this.props.errors["firstName"]?
                            <div className="invalid-feedback" style={{display:'block'}}>
                                {this.props.errors["firstName"]}
                            </div>
                            :
                            null
                        }
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputLasttName">Last Name</label>
                        <input required type="text" className="form-control" id="inputLastName" placeholder="Last Name" 
                            name="lastName" onChange={this.props.onChangeLastName} 
                            style={this.props.errors["lastName"]?{borderColor:'red'}:null} value={this.props.lastName}/>
                        {this.props.errors["lastName"]?
                            <div className="invalid-feedback" style={{display:'block'}}>
                                {this.props.errors["lastName"]}
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                        <label htmlFor="inputCardName">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-12">
                        <input type="email" name="email" className="form-control" placeholder="johnDoe@gmail.com" required 
                            onChange={this.props.onChangeEmail} style={this.props.errors["email"]?{borderColor:'red'}:null}
                            value={this.props.email}/>
                         {this.props.errors["email"]?
                            <div className="invalid-feedback" style={{display:'block'}}>
                                {this.props.errors["email"]}
                            </div>
                            :
                            null
                        }    
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                        <label htmlFor="inputCardName">Phone Number</label>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-12">
                        <input type="tel" name="phoneNumber" className="form-control" placeholder="888 888 8888" minLength="10" maxLength="10"
                            title="Ten digits code" required onChange={this.props.onChangePhoneNumber} 
                            style={this.props.errors["phoneNumber"]?{borderColor:'red'}:null} value={this.props.phoneNumber}/> 
                        {this.props.errors["phoneNumber"]?
                            <div className="invalid-feedback" style={{display:'block'}}>
                                {this.props.errors["phoneNumber"]}
                            </div>
                            :
                            null
                        }    
                    </div>
                </div>
            </>
        );
    }
}