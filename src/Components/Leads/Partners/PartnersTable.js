import React from 'react'
import "./PartnersStyle.css";
import AddNewPartner from './NewPartners.js'
import Row_Data from './PartnersData.js';


const COLUMNS = [
  {Header: 'Partner Name'},
  {Header: 'Mobile No'},
  {Header: 'Purpose'},
  {Header: 'Date'},
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
    <AddNewPartner/>
    <div className="PartnerTopHed">
        <select 
          className="PartnersType"  value={this.state.CustomerFilter} onChange={this.HandleChangeFilter.bind(this)}> 
            <option className="PartnertypeContents" value="" >All Partners</option>
            <option className="PartnertypeContents" value="Hired" >Hired Partners </option>
            <option className="PartnertypeContents" value="On Talks" >On Talks Partners</option>
            <option className="PartnertypeContents" value="Rejected" >Rejected Partners</option>
            <option className="PartnertypeContents" value="Social Media" >Partners Social Media </option>
            <option className="PartnertypeContents" value="Other Source" >Partners from Other Source</option>
            <option className="PartnertypeContents" value="Website" >Partners from Websites</option>
            <option className="PartnertypeContents" value="Referral" >Referrals Partners </option>
            <option className="PartnertypeContents" value="Partner as a Video Editor" >Partner as a Video Editor</option>
            <option className="PartnertypeContents" value="Partner as a Photo Editor" >Partner as a Photo Editor</option>
            </select>
  
      </div>
    <div className="PartnersTable">
    
      <table className="CompletePartnersTable">
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
              style={{display: this.state.CustomerFilter === '' ?"table-row" : row.Status === this.state.CustomerFilter? "table-row" : row.Source === this.state.CustomerFilter? "table-row" : row.Purpose === this.state.CustomerFilter? "table-row" : "none"}}>
           <td>  <input type="checkbox" /> </td>
              <td>{row.Client_Name}</td>
              <td>{row.Mobile_No}</td>
              <td>{row.Purpose}</td>
              <td>{row.Date}</td>
              <td> 
                <div style={{background: 
                    row.Status === "Hired" ?"#5CB85C": 
                    row.Status === "On Talks" ?"#8175C7": 
                    row.Status === "Rejected" ?"#D85C60":"none", 
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
        
      </table> 
              </div>
      
    </>
  )}
}
export default CustomerTable;




