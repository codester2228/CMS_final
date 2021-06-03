import React, { Component } from 'react';
import './NewCustomer.css'


class NewCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AddNewDisp: 'true',
            Client_FirstName: '',
            Client_LastName: '',
			Phone_No: '',
            Email_Id: '',
			Client_Source: '',
            Select_Shoot: '',
            
        }
    }
    DisplyAddNewCustomer(){
        this.setState({AddNewDisp: !this.state.AddNewDisp})
     }
     myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        if (nam === "Phone_No") {
          if (!Number(val)) {
            alert("Your age must be a number");
          }
        }
        this.setState({[nam]: val});
       
      }
      
      handleSubmit = event => {    //* ********  On Submit Stroing and printing data in Console********************** 
        
            const NewData ={
          Client_Name: `${this.state.Client_FirstName} ${this.state.Client_LastName}`,
                Phone_No: this.state.Phone_No,
          Email_Id: this.state.Email_Id,
                Client_Source: this.state.Client_Source,
          Select_Shoot: this.state.Select_Shoot,
      }
        console.log(NewData)
            event.preventDefault()
        
        
        }
    render() {
        let AddingNewCustomer = this.state.AddNewDisp ? "AddingNewCustomer" : "AddingNewCustomer01";
        return (
            <div>
                <div className="AddNewCustomerBtn" onClick={this.DisplyAddNewCustomer.bind(this)}> <h1>+ New Customer</h1></div>
                <div className={AddingNewCustomer}>
                    <div className="CustomerHeader">
                        <div className="CustomerHeaderName">New Customer</div>   
                        <div className="CustomerHeaderClose"onClick={this.DisplyAddNewCustomer.bind(this)}> <h1>+</h1></div> 
                    </div>    
                    <span className="UnderLineHeader"></span>

                    <div className="CustomerForm">
                        <div className="FormBody" style={{disply:"none"}}>
                            <form onSubmit={this.handleSubmit}  classname="FormBody">
                                <div className="InputClientname">
                                <label  className="InfoInput">Client  Name :</label>
                                <input
                                type='text'
                                name='Client_FirstName'
                                onChange={this.myChangeHandler}
                                className='TypeInput'
                                placeholder='First Name'
                                />
                                <label  className="InfoInput CilentLastName">Last Name :</label>
                                <input
                                type='text'
                                name='Client_LastName'
                                onChange={this.myChangeHandler}
                                className='TypeInput LastName'
                                placeholder='Last Name'
                                />
                                </div>
                            
                                <div className="InputPhoneNo">
                                <label  className="InfoInput">Phone No :</label>
                                <input
                                type='text'
                                name='Phone_No'
                                onChange={this.myChangeHandler}
                                className='TypeInput'
                                />
                                </div>
                                <div className="InputEmailId InputPhoneNo">
                                <label  className="InfoInput">Email Id :</label>
                                <input
                                type='text'
                                name='Email_Id'
                                onChange={this.myChangeHandler}
                                className='TypeInput'
                                />
                                </div>
                                <div className="InputClientSource InputPhoneNo">
                                <label  className="InfoInput">Client Source:</label>
                                <select name='Client_Source' onChange={this.myChangeHandler} className='TypeInput'>
                                    <option name="Website">Website</option>
                                    <option name="WedmeGood">WedmeGood</option>
                                    <option name="Weddingwire">Weddingwire</option>
                                    <option name="Referral">Referral</option>
                                    </select>
                                </div>
                                <div className="InputSelectShoot InputPhoneNo">
                                <label  className="InfoInput">Select Shoot :</label>
                                <select name='Select_Shoot' onChange={this.myChangeHandler} className='TypeInputSelectShoot'>
                                    <option name="react">Pre/Post Wedding Shoot</option>
                                    <option name="angular">Customer for Birthday Shoot</option>
                                    <option name="vue">Customer for Baby Shower Shoot</option>
                                    <option name="vue">Customer for Model Portfolio Shoot</option>
                                    </select>
                                </div>
                                <button type="submit" className="SubmitButton">Submit</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewCustomer;


