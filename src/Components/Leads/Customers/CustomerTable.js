import React from 'react'
import {BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";
import DeatilData from './CustomerDetail/DetailCenterBody.js';
import { BiRupee } from 'react-icons/bi';
import "./CustomersStyle.css";
import AddNewCustomer from './NewCustomer'
import Row_Data from './CustomerData.js';


const COLUMNS = [
  {Header: 'Client Name'},
  {Header: 'Mobile No'},
  {Header: 'Shoot'},
  {Header: 'Date'},
  {Header: 'Quoted Amount'},
  {Header: 'Status'},
  {Header: 'Source'},
]


class CustomerTable extends React.Component{
  constructor(props){
    super(props);
      this.state ={
  columns: COLUMNS,
  data:Row_Data,
  CustomerFilter: ""
      }
  
  }
  HandleChangeFilter(event){
    this.setState({CustomerFilter: event.target.value})
  }
  render() {

  return (
    <>
    <AddNewCustomer/>
    <div className="CustomerTopHed">
        <select 
          className="CustomersType"  value={this.state.CustomerFilter} onChange={this.HandleChangeFilter.bind(this)}> 
            <option className="CustypeContents" value="" >All Customers</option>
            <option className="CustypeContents" value="Confirmed" >Confirmed Customers </option>
            <option className="CustypeContents" value="Pending" >Pending Customers</option>
            <option className="CustypeContents" value="Cancelled" >Cancelled Customers</option>
            <option className="CustypeContents" value="WedmeGood" >Customers WedmeGood </option>
            <option className="CustypeContents" value="Weddingwire" >Customers from Weddingwire</option>
            <option className="CustypeContents" value="Website" >Customers from Websites</option>
            <option className="CustypeContents" value="Referral" >Referrals Customers </option>
            <option className="CustypeContents" value="Wedding Photography" >Wedding Photography&Cinematography</option>
            <option className="CustypeContents" value="Pre/Post Wedding Shoot" >Pre/Post Wedding Shoot</option>
            <option className="CustypeContents" value="Birthday Shoot" >Customer for Birthday Shoot</option>
            <option className="CustypeContents" value="Baby Shower Shoot" > Customer for Baby Shower Shoot</option>
            <option className="CustypeContents" value="Model Portfolio Shoot" >Customer for Model Portfolio Shoot </option>
            </select>
  
      </div>
    <div className="CustomerTable">
    <Router>
      <table className="CustomerCompleteTable">
        <thead >
          <tr >
            <th> <input type="checkbox" /></th> 
             {this.state.columns.map(column=>(
           
           <th >{column.Header}</th>
           
           ))}
          
          </tr> 
        </thead>
        <tbody>
        {this.state.data.map(row=>(
          <>
          <tr key={row.id} 
              style={{display: this.state.CustomerFilter === '' ?"table-row" : row.Status === this.state.CustomerFilter? "table-row" : row.Source === this.state.CustomerFilter? "table-row" : row.Shoot === this.state.CustomerFilter? "table-row" : "none"}}>
           <td>  <input type="checkbox" /> </td>
              <td>
                  <Link to={row.path} style={{textDecoration:"none", color:"#595959"}}>
                    {row.Client_Name}
                  </Link>
                  
                 </td>
              <td>{row.Mobile_No}</td>
              <td>{row.Shoot}</td>
              <td>{row.Date}</td>
              <td> 
                <div style={{color:"#5976E3",display:"flex", flexFlow:"row", }}>
                  <BiRupee style={{marginTop: "1px"}}/> 
                  <div>{row.Quoted_Amount}</div>
                </div>
              </td>
              <td> 
                <div style={{background: 
                    row.Status === "Confirmed" ?"#5CB85C": 
                    row.Status === "Pending" ?"#8175C7": 
                    row.Status === "Cancelled" ?"#D85C60":"none", 
                    color:"#fff",width: "91.89px",height: "24.81px",borderRadius: "2.75662px"}}>
                    <h1 style={{fontStyle: "normal",
                                fontWeight: "500",
                                fontSize: "12.8642px",
                                lineHeight: "15px",
                                padding: "5px 0 0 20px",
                                color: "#FFFFFF"}}>{row.Status}
                    </h1> 
                </div>
              </td>
              <td>{row.Source}</td>
           
          </tr> </>))}
          
        </tbody>
        
      </table> <Switch>
        {this.state.data.map(row=>(
          <Route path={row.path}>
          
              <DeatilData /> 
          
          </Route>
        ))}
                    </Switch>
                    </Router></div>
      
    </>
  )}
}
export default CustomerTable;




