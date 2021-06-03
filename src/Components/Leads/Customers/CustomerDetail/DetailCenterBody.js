import React from 'react';
import "./DetailScreenStyle.css";
import { MdEdit} from "react-icons/md";
import { RiDeleteBinLine} from "react-icons/ri";
import {BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";
import {FiDownload } from 'react-icons/fi';
import NumberFormat from 'react-number-format';

import CustomerData from "../CustomerData"
class CustomersList extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        //********************** Complete Data for all Customer in Deatils ************************
        //*************** */ additoin of New Data will atomatically adds new page in details screen ***********************
        CustomerFilter:"",
        persent: "5",
        ListData: CustomerData
      
      }
      this.handleChange = this.handleChange.bind(this);
      this.HandleChangeFilter = this.HandleChangeFilter.bind(this);
      
    }

    handleChange(event) {
      this.setState({persent: event.target.value});
    }
    HandleChangeFilter(event){
      this.setState({CustomerFilter: event.target.value})
    }
   
    render() {
      //const SubtotalFun(Amt01, Amt2, Amt3) = parseInt(Amt01) + parseInt(Amt2) + parseInt(Amt3);
       
      return (

          <div>
            
            <div className="Detailsscreen">
              <div style={{display:"flex", flexFlow:"row"}}>
              <div className="LeftCustomerMenuHeader"> 
              <select className="CustomersType2nd" value={this.state.CustomerFilter} onChange={this.HandleChangeFilter}> 
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
              <div className="addNewCus"> <h1>+ New</h1></div>
              </div>
              <div className="LeftCustomerMenutotal">
              <div style={{display: 'flex', flexFlow: 'row'}}>
        <Router>
               <div className="LeftCustomerMenu">     {/************* Left side Details Se;ection part which as in loop with  above ListData   ********/ }
              {this.state.ListData.map(item => (
              
              <div className="CustomerDetails"  key={item.id} style={{display: this.state.CustomerFilter === '' ?"flex" : item.Status === this.state.CustomerFilter? "flex" : item.Source === this.state.CustomerFilter? "flex" : item.Shoot === this.state.CustomerFilter? "flex" : "none"}}>
              <input type="checkbox" className="CheckBoxDetails" />
              <Link className="CustomerDetailsLink" to={item.Id} >    {/************* Assigning Routing Links to all Each Detail ********  */}
                      <div className="NameAndDate">
                        <h1>{item.Client_Name}</h1>
                      <h2>{item.Date} <span></span> {item.Quoted_Amount}</h2>
                      
                      </div>
                      <div className="StatusAnsSource">
                      <h1 >{item.Source}</h1>
                      <h2 style={{color: item.Status === "Confirmed"?'#05888D': item.Status ==="Pending" ? '#8175C7':"#D85C60" }}>{item.Status}</h2>
                       
                      </div>
                      </Link>
                </div>  
              
            ))}
              </div>
      
              <Switch>
              {this.state.ListData.map(item => (
              <Route path={item.path} key={item.id}>  {/************  Assigning path and inner part to assigned above Link and will run in loop with ListData ********************* */}
                  <div className="ContentBody"> 
                  <h1 className="CustomerName">
                      {item.Id}
                  </h1>
                  <div className="EDitAndDelete">
                      <MdEdit className="EditIcon "/>
                      <RiDeleteBinLine className="DeleteIcon " /> 
                  </div>
                  <span className="DetHorizantalLine"></span>
                   <div className="FewDeatilsCustomer">
                    <div style={{display: 'flex', flexFlow: 'row'}}><h1>Phone No      : </h1> <h2> {item.Mobile_No}</h2></div> 
                    <div style={{display: 'flex', flexFlow: 'row'}}><h1>Email Id      :  </h1> <h2>   {item.Email}</h2></div> 
                    <div style={{display: 'flex', flexFlow: 'row'}}><h1>Lead Source   :  </h1> <h2>{item.Source}</h2></div>
                    <div style={{display: 'flex', flexFlow: 'row'}}><h1>Shoot         : </h1> <h2>{item.Shoot}</h2></div>
                   </div>

                    <div className="QuotationDetailHeading">
                        <h1>Quotation Details</h1>
                    </div>
                    <div className="QuotationDetailTable">   
                    {/***************************Quotation Detail Table, 
                     * its Data is a sublist of ListData and 
                     * Table bady rows will run in lopp according to subList in ListData
                     *  *******************/}
                    <table className="TableBody">  
                      <thead style={{height:"41px"}}>
                      <tr style={{padding:"0px",margin:"0px"}}>
                          <th rowspan={2} style={{width: "170px",padding:"0px",margin:"0px",paddingLeft: "10px"}}>EVENT DETAILS</th>
                          <th rowspan={2} style={{width: "125px",padding:"0px",margin:"0px",paddingLeft: "10px"}}> EVENT DATE & TIME</th>
                          <th rowspan={2} style={{width: "122px",padding:"0px",margin:"0px",paddingLeft: "10px"}}>LOCATION</th>
                          <th rowspan={2}style={{width: "78px"  ,padding:"0px",margin:"0px",paddingLeft: "10px"}}>RATE</th>
                          <th colspan="2" style={{width: "140px" ,padding:"0px",margin:"0px",paddingLeft: "10px"}}>GST</th>
                          <th rowspan={2}style={{width: "84px"  ,padding:"0px",margin:"0px",paddingLeft: "10px"}}> AMOUNT</th>
                        </tr>
                        <tr style={{height:"5px"}}>
                        <th style={{width: "70px",padding:"0px",margin:"0px",paddingLeft: "10px"}}>%</th>
                        <th style={{width: "70px",padding:"0px",margin:"0px",paddingLeft: "10px"}}>Amt</th>
                        </tr>
                        </thead>
                    
                      <tbody>
                      {item.QuotationDetails.map(AmtDetails => (
                        <tr classname="TableContent"key={AmtDetails.id} style={{padding:"0px",margin:"0px"}}> 
                        <td style={{paddingBottom:"10px"}}> 
                          <div >{AmtDetails.EventName}</div>
                          <div  style={{display: AmtDetails.PhotoGrapher1 === ""? "none":"flex" , flexFlow:"row"}}> <h1>{AmtDetails.PhotoGrapher1}</h1> <h2 style={{float: "right"}}>{AmtDetails.Count}</h2></div>
                          <div  style={{display: AmtDetails.PhotoGrapher2 === ""? "none":"flex" }}><h1>{AmtDetails.PhotoGrapher2}</h1> <h2 style={{float: "right"}}>{AmtDetails.Count}</h2></div>
                          <div  style={{display: AmtDetails.PhotoGrapher3 === ""? "none":"flex" }}><h1>{AmtDetails.PhotoGrapher3}</h1> <h2 style={{float: "right"}}>{AmtDetails.Count}</h2></div>
                          <div style={{display: AmtDetails.PhotoGrapher4 === ""? "none":"flex" }}><h1>{AmtDetails.PhotoGrapher4}</h1> <h2 style={{float: "right"}}>{AmtDetails.Count}</h2></div>
                        </td>
                        <td > {AmtDetails.DateAndDay} <br/> {AmtDetails.TimeDuration}</td>
                        <td > {AmtDetails.Location}</td>
                        <td > {AmtDetails.Rate}.00</td>
                        <td > {AmtDetails.GSTpercent}%</td>
                        <td > {(parseInt(AmtDetails.Rate)/100 ) *  parseInt(AmtDetails.GSTpercent)}.00</td>
                        <td > {AmtDetails.Amount}.00</td>

                        </tr>
                    ))} 
                    
      
                      </tbody>
                      
                      </table>
                      
                        
                        <div className="SubtotalBox" > 

                            <div className="TotalAmount"> <h1 >Subtotal:  </h1>
                            <NumberFormat value={item.QuotationDetails.reduce((total, currentValue) => total = total + currentValue.Rate,0)} className="foo" displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" renderText={(value, props) => <h2 {...props}>{value}.00</h2>} />
                            
                            
                            
                            
                            </div>
                            {/* ************************ Invoice Download with  GST ******************* */}
                              <div className="DownloadInvoiceGSt">
                                  <h1>Invoice Amount with GST</h1> <h2><FiDownload/></h2>
                              </div> 
                              <div className="CalcutionsSGT">
                                  <h1> 
                                   <label>Subtotal</label> 
                                   <label>
                                     <NumberFormat 
                                          value={item.QuotationDetails.reduce((total, currentValue) => total = total + currentValue.Rate,0)}
                                          className="foo" 
                                          displayType={'text'} 
                                          thousandSeparator={true} 
                                          thousandsGroupStyle="lakh" 
                                          renderText={(value, props) => <div {...props}>{value}.00</div>} />
                                   </label>
                                  </h1>
                                  <h1> 
                                    <label>Discount</label> 
                                    <select value={this.state.persent} onChange={this.handleChange} className="SelectPercent" >
                                        <option value="5">5%</option>
                                        <option value="10">10%</option>
                                    </select>
                                   <label className="DisCountLable">
                                      <NumberFormat 
                                            value={(parseInt(item.QuotationDetails.reduce((total, currentValue) => total = total + currentValue.Rate,0)))/100 * this.state.persent} 
                                            className="foo" displayType={'text'} 
                                            thousandSeparator={true} 
                                            thousandsGroupStyle="lakh" renderText={(value, props) => <div {...props}>-{value}.00</div>} />
                                   </label>
                                 </h1>
                                 <h1> 
                                   <label>GST[18%]</label> 
                                   <label>
                                      <NumberFormat 
                                          value={(item.QuotationDetails.reduce((total, currentValue) => total = total + currentValue.Rate,0))/100 * 18} 
                                          className="foo" 
                                          displayType={'text'} 
                                          thousandSeparator={true} 
                                          thousandsGroupStyle="lakh" 
                                          renderText={(value, props) => <div {...props}>{value}.00</div>} />
                                   </label>
                                  </h1>
                                  <h2> 
                                   <label>Total('₹')</label> 
                                   <label>
                                     <NumberFormat 
                                          value={(item.QuotationDetails.reduce((total, currentValue) => total = total + currentValue.Rate,0)) - (item.QuotationDetails.reduce((total, currentValue) => total = total + currentValue.Rate,0))/100 * this.state.persent + (item.QuotationDetails.reduce((total, currentValue) => total = total + currentValue.Rate,0))/100 * 18} 
                                          className="foo" 
                                          displayType={'text'} 
                                          thousandSeparator={true} 
                                          thousandsGroupStyle="lakh" 
                                          renderText={(value, props) => <div {...props}>{value}.00</div>} />
                                   </label>
                                  </h2>
                              </div>            
                              {/* ************************ Invoice Download without  GST ******************* */}
                              <div className="DownloadInvoice">
                                  <h1>Invoice Amount without GST</h1> <h2><FiDownload/></h2>
                              </div> 
                              <div className="Calcutions">
                                  <h1> 
                                   <label>Subtotal</label> 
                                   <label>
                                     <NumberFormat 
                                          value={(item.QuotationDetails.reduce((total, currentValue) => total = total + currentValue.Rate,0))} 
                                          className="foo" 
                                          displayType={'text'} 
                                          thousandSeparator={true} 
                                          thousandsGroupStyle="lakh" 
                                          renderText={(value, props) => <div {...props}>{value}.00</div>} />
                                   </label>
                                  </h1>
                                  <h1> 
                                    <label>Discount</label> 
                                    <select value={this.state.persent} onChange={this.handleChange} className="SelectPercent" >
                                        <option value="5">5%</option>
                                        <option value="10">10%</option>
                                    </select>
                                   <label className="DisCountLable">
                                      <NumberFormat 
                                            value={(parseInt(item.QuotationDetails.reduce((total, currentValue) => total = total + currentValue.Rate,0)))/100 * this.state.persent} 
                                            className="foo" displayType={'text'} 
                                            thousandSeparator={true} 
                                            thousandsGroupStyle="lakh" renderText={(value, props) => <div {...props}>-{value}.00</div>} />
                                   </label>
                                 </h1>
                                 
                                  <h2> 
                                   <label>Total('₹')</label> 
                                   <label>
                                     <NumberFormat 
                                          value={(item.QuotationDetails.reduce((total, currentValue) => total = total + currentValue.Rate,0)) - (item.QuotationDetails.reduce((total, currentValue) => total = total + currentValue.Rate,0))/100 * this.state.persent } 
                                          className="foo" 
                                          displayType={'text'} 
                                          thousandSeparator={true} 
                                          thousandsGroupStyle="lakh" 
                                          renderText={(value, props) => <div {...props}>{value}.00</div>} />
                                   </label>
                                  </h2>
                              </div>         
                     </div>
                    </div>
                   </div> 
               </Route> 
              ))}
                </Switch>
              </Router>
            
            
        </div>
              <div >
            
            
            </div>
              </div>
              </div>
            </div>
        </div>

























       
      )
    }
  }
  
 export default CustomersList; 
  
  
