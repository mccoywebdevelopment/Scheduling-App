import React from 'react';

export default class AddressInput extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input required type="text" className="form-control" id="inputAddress" placeholder="Address" name="address" value={this.props.address} onChange={this.props.onChangeAddress}  style={this.props.errors["address"]?{borderColor:'red'}:null}/>
                    {this.props.errors["address"]?
                        <div className="invalid-feedback" style={{display:'block'}}>
                            {this.props.errors["address"]}
                        </div>
                        :
                        null
                    }
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input required type="text" className="form-control" id="inputCity" placeholder="City" name="city" value={this.props.city} onChange={this.props.onChangeCity}  style={this.props.errors["city"]?{borderColor:'red'}:null}/>
                        {this.props.errors["city"]?
                        <div className="invalid-feedback" style={{display:'block'}}>
                            {this.props.errors["city"]}
                        </div>
                        :
                        null
                    }
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">State</label>
                        <select id="inputState" className="form-control" style={{fontSize: 'x-large',height:'2.13em'}} name="state" data-dropup-auto="false" data-size='60' value={this.props.state} onChange={this.props.onChangeState}  style={this.props.errors["state"]?{borderColor:'red'}:null} required>
                            <option value="" defaultValue="">Choose...</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                        {this.props.errors["state"]?
                        <div className="invalid-feedback" style={{display:'block'}}>
                            {this.props.errors["state"]}
                        </div>
                        :
                        null
                    }
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input required type="text" className="form-control" id="inputZip" placeholder="Zip" name="zip" value={this.props.zip} onChange={this.props.onChangeZip}  style={this.props.errors["zip"]?{borderColor:'red'}:null}/>
                        {this.props.errors["zip"]?
                        <div className="invalid-feedback" style={{display:'block'}}>
                            {this.props.errors["zip"]}
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