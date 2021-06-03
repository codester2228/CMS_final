import React, { Component } from "react";
import "./NewCustomer.css";
import deleteButton from "../../Icons/x-circle.png";
import copyButton from "../../Icons/copy.png";
import Location from "../../Icons/location.png";
import Calendar from "../../Icons/calendar.png";

class NewCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddNewDisp: "true",
      Client_FirstName: "",
      Client_LastName: "",
      Phone_No: "",
      Email_Id: "",
      Client_Source: "",
      Select_Shoot: "",
      prewedding: 1, // count of rows of these types
      engagement: 0,
      haldi: 0,
      mehendi: 0,
      wedding: 0,
      reception: 0,
      others: 0,

      subTotal: "0", // total amount in all rows
      discount: "0", //discount text
      discountValue: "0", //final discount value
      discountType: "%", //type of discount
      totalGST: "0", //total GST in all rows

      QuotationDetails: [
        //table data here in form of array
        {
          EventName: "Pre-Wedding",
          PhotoGrapher1: "",
          PhotoGrapher2: "",
          PhotoGrapher3: "",
          PhotoGrapher4: "",
          PhotoGrapher5: "",
          PhotoGrapher6: "",
          PhotoGrapher7: "",
          p1count: "0",
          p2count: "0",
          p3count: "0",
          p4count: "0",
          p5count: "0",
          p6count: "0",
          p7count: "0",
          DateAndDay: "",
          TimeDuration: "",
          Location: "",
          Rate: "",
          tax: "0",
          GSTamount: "0",
          Amount: "0",
        },
      ],
    };
  }

  DisplyAddNewCustomer() {
    this.setState({ AddNewDisp: !this.state.AddNewDisp });
  }
  // make changes in the customer form and discount/subtotal----------------------------------------------------------------------------------
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    //updating discount values based on type of discount and the value when changes made in discount text---------------------------------------------------------
    if (nam === "Phone_No" || nam === "discount") {
      if (Number(val) || val === "") {
        this.setState({ [nam]: val });
        if (nam === "discount") {
          if (val === "") {
            this.setState({ discountValue: "0" });
          } else {
            if (this.state.discountType === "%") {
              let value =
                (parseFloat(val) *
                  parseFloat(
                    this.state.subTotal === "" ? "0" : this.state.subTotal
                  )) /
                100;
              this.setState({ discountValue: String(value.toFixed(2)) });
            } else {
              let value = parseFloat(val);
              this.setState({ discountValue: String(value.toFixed(2)) });
            }
          }
        }
      }
    }

    //updating discount values based on type of discount and the value when changes made in discount type---------------------------------------------------------
    else if (nam === "discountType") {
      console.log(nam, val);
      if (val === "%") {
        let value =
          (parseFloat(this.state.discount === "" ? "0" : this.state.discount) *
            parseFloat(
              this.state.subTotal === "" ? "0" : this.state.subTotal
            )) /
          100;
        this.setState({ [nam]: val });
        this.setState({ discountValue: String(value.toFixed(2)) });
      } else {
        let value = parseFloat(
          this.state.discount === "" ? "0" : this.state.discount
        );
        this.setState({ [nam]: val });
        this.setState({ discountValue: String(value.toFixed(2)) });
      }
    } else {
      this.setState({ [nam]: val });
    }
  };

  //make any changes in the table checkboxes -----------------------------------------------------------------------------------
  handlechangecheckbox = (e, i, QuotationDetails) => {
    var prevq = QuotationDetails;
    let nam = e.target.name;
    let val = e.target.value;
    let count = `p${nam[nam.length - 1]}count`; //making changes in the state named p{i}count
    if (prevq[i][nam] === "") {
      prevq[i][nam] = val;
    } else {
      prevq[i][count] = 0;
      prevq[i][nam] = "";
    }
    this.setState({ QuotationDetails: prevq });
  };

  //make any changes in the table forms except checkbox -----------------------------------------------------------------------------------
  handleChangeQuotation = (event, i, QuotationDetails) => {
    var prevq = QuotationDetails.slice();

    let nam = event.target.name;
    if (nam === "Rate") {
      if (Number(event.target.value) || event.target.value === "") {
        prevq[i][nam] = event.target.value;
      }
    } else {
      prevq[i][nam] = event.target.value;
    }

    if (nam === "Rate" || nam === "tax") {
      //making changes in rate and tax
      let prevtotalGST =
        parseFloat(
          this.state.totalGST === "" ? "0" : this.state.totalGST
        ).toFixed(2) -
        parseFloat(
          prevq[i].GSTamount === "" ? "0" : prevq[i].GSTamount
        ).toFixed(2);

      prevq[i].GSTamount = String(
        (
          (parseFloat(prevq[i].Rate === "" ? "0" : prevq[i].Rate) *
            parseFloat(prevq[i].tax === "" ? "0" : prevq[i].tax)) /
          100
        ).toFixed(2)
      ); //updating amt in that particular row----------------
      let p =
        parseFloat(this.state.subTotal === "" ? "0" : this.state.subTotal) -
        parseFloat(prevq[i].Amount === "" ? "0" : prevq[i].Amount);

      prevq[i].Amount = String(
        (
          parseFloat(prevq[i].Rate === "" ? "0" : prevq[i].Rate) +
          parseFloat(prevq[i].GSTamount)
        ).toFixed(2)
      );
      let newsubtot = (
        parseFloat(p) +
        parseFloat(prevq[i].Amount === "" ? "0" : prevq[i].Amount)
      ).toFixed(2);
      console.log(newsubtot, "dwefwefew");
      //updating amt in that particular row----------------
      this.setState({
        subTotal: String(newsubtot),
        totalGST: String(
          (parseFloat(prevtotalGST) + parseFloat(prevq[i].GSTamount)).toFixed(2)
        ), //updating totalGST and subtotal due to change in rate and tax and amount and gstamount-------------
      });
      if (this.state.discount === "") {
        this.setState({ discountValue: "0" });
      } else {
        if (this.state.discountType === "%") {
          let value =
            (parseFloat(this.state.discount) * parseFloat(newsubtot)) / 100;
          this.setState({ discountValue: value.toFixed(2) });
        } else {
          let value = parseFloat(this.state.discount);
          this.setState({ discountValue: value.toFixed(2) });
        }
      } //updated discount value
    }
    this.setState({ QuotationDetails: prevq }); //updated QuotationDetails
  };

  // when clicking submit button----------------------------------------------------
  handleSubmit = (event) => {
    const { Client_FirstName, Client_LastName } = this.state;
    const NewData = {
      Client_Name: `${Client_FirstName} ${Client_LastName}`,
      Phone_No: this.state.Phone_No,
      Email_Id: this.state.Email_Id,
      Client_Source: this.state.Client_Source,
      Select_Shoot: this.state.Select_Shoot,
    };
    const QuotationData = this.state.QuotationDetails;
    console.log(NewData, "submitted");
    console.log(QuotationData);
    event.preventDefault();
  };

  // render starts here---------------------------------------------------------------------------------------
  render() {
    let AddingNewCustomer = this.state.AddNewDisp
      ? "AddingNewCustomer"
      : "AddingNewCustomer01";
    const { QuotationDetails } = this.state;
    return (
      <div>
        <div
          className="AddNewCustomerBtn"
          onClick={this.DisplyAddNewCustomer.bind(this)}
        >
          {" "}
          <h1>+ New Customer</h1>
        </div>
        <div className={AddingNewCustomer}>
          <div className="CustomerHeader">
            <div className="CustomerHeaderName">New Customer</div>
            <div
              className="CustomerHeaderClose"
              onClick={this.DisplyAddNewCustomer.bind(this)}
            >
              {" "}
              <h1>+</h1>
            </div>
          </div>
          <span className="UnderLineHeader"></span>

          <div className="CustomerForm">
            <div
              className="FormBody"
              style={{ disply: "none", width: "1101px", height: "100%" }}
            >
              <form
                onSubmit={this.handleSubmit}
                className="FormBody"
                style={{
                  width: "1101px",
                  height: "100%",
                }}
              >
                <div className="InputClientname">
                  <label className="InfoInput">Client Name :</label>
                  <input
                    type="text"
                    name="Client_FirstName"
                    onChange={this.myChangeHandler}
                    className="TypeInput"
                    placeholder="First Name"
                  />

                  <label className="InfoInput CilentLastName">
                    Last Name :
                  </label>
                  <input
                    type="text"
                    name="Client_LastName"
                    onChange={this.myChangeHandler}
                    className="TypeInput LastName"
                    placeholder="Last Name"
                  />
                </div>

                <div className="InputPhoneNo">
                  <label className="InfoInput">Phone No :</label>
                  <input
                    type="text"
                    name="Phone_No"
                    onChange={this.myChangeHandler}
                    className="TypeInput"
                    value={this.state.Phone_No}
                  />
                </div>
                <div className="InputEmailId InputPhoneNo">
                  <label className="InfoInput">Email Id :</label>
                  <input
                    type="text"
                    name="Email_Id"
                    onChange={this.myChangeHandler}
                    className="TypeInput"
                  />
                </div>
                <div className="InputClientSource InputPhoneNo">
                  <label className="InfoInput">Client Source:</label>
                  <select
                    name="Client_Source"
                    onChange={this.myChangeHandler}
                    className="TypeInput"
                  >
                    <option name="Website">Website</option>
                    <option name="WedmeGood">WedmeGood</option>
                    <option name="Weddingwire">Weddingwire</option>
                    <option name="Referral">Referral</option>
                  </select>
                </div>
                <div className="InputSelectShoot InputPhoneNo">
                  <label className="InfoInput">Select Shoot :</label>
                  <select
                    name="Select_Shoot"
                    onChange={this.myChangeHandler}
                    className="TypeInputSelectShoot"
                  >
                    <option name="react">Pre/Post Wedding Shoot</option>
                    <option name="angular">Customer for Birthday Shoot</option>
                    <option name="vue">Customer for Baby Shower Shoot</option>
                    <option name="vue">
                      Customer for Model Portfolio Shoot
                    </option>
                  </select>
                </div>
              </form>
            </div>
          </div>

          <div className="rectangleQuotation">
            {" "}
            {/* //table code starts------------------------------------------------- */}
            <div className="quotationDetails">
              <p className="quotationDetailsText">Quotation Details</p>
            </div>
            {/* buttons for adding a row of particular event------------------------------------------------- */}
            <div
              className={`prewedding ${
                this.state.prewedding > 0 ? "selected" : ``
              }`}
              onClick={() => {
                !this.state.prewedding &&
                  this.setState((prevstate) => ({
                    QuotationDetails: [
                      //adding it to the QuotationDetails array
                      ...prevstate.QuotationDetails,
                      {
                        EventName: "Pre-Wedding",
                        PhotoGrapher1: "",
                        PhotoGrapher2: "",
                        PhotoGrapher3: "",
                        PhotoGrapher4: "",
                        PhotoGrapher5: "",
                        PhotoGrapher6: "",
                        PhotoGrapher7: "",
                        p1count: "0",
                        p2count: "0",
                        p3count: "0",
                        p4count: "0",
                        p5count: "0",
                        p6count: "0",
                        p7count: "0",
                        DateAndDay: "Sun 07-Jan-2021",
                        TimeDuration: "11am - 5pm (06 hours)",
                        Location: "",
                        Rate: "0",
                        tax: "0",
                        GSTamount: "0",
                        Amount: "0",
                      },
                    ],
                  }));

                this.setState({ prewedding: 1 }); //setting the count to 1 when clicked on a  button for first time-----------------------------------------
              }}
            >
              <p className="preweddingText">Pre-Wedding</p>
            </div>
            <div
              className={`engagement ${
                this.state.engagement > 0 ? "selected" : ``
              }`}
              onClick={() => {
                this.state.engagement === 0 &&
                  this.setState((prevstate) => ({
                    QuotationDetails: [
                      ...prevstate.QuotationDetails,
                      {
                        EventName: "Engagement",
                        PhotoGrapher1: "",
                        PhotoGrapher2: "",
                        PhotoGrapher3: "",
                        PhotoGrapher4: "",
                        PhotoGrapher5: "",
                        PhotoGrapher6: "",
                        PhotoGrapher7: "",
                        p1count: "0",
                        p2count: "0",
                        p3count: "0",
                        p4count: "0",
                        p5count: "0",
                        p6count: "0",
                        p7count: "0",
                        DateAndDay: "Sun 07-Jan-2021",
                        TimeDuration: "11am - 5pm (06 hours)",
                        Location: "",
                        Rate: "0",
                        tax: "0",
                        GSTamount: "0",
                        Amount: "0",
                      },
                    ],
                  }));

                this.setState({ engagement: 1 });
              }}
            >
              <p className="engagementText">Engagement</p>
            </div>
            <div
              className={`haldi ${this.state.haldi ? "selected" : ``}`}
              onClick={() => {
                !this.state.haldi &&
                  this.setState((prevstate) => ({
                    QuotationDetails: [
                      ...prevstate.QuotationDetails,
                      {
                        EventName: "Haldi",
                        PhotoGrapher1: "",
                        PhotoGrapher2: "",
                        PhotoGrapher3: "",
                        PhotoGrapher4: "",
                        PhotoGrapher5: "",
                        PhotoGrapher6: "",
                        PhotoGrapher7: "",
                        p1count: "0",
                        p2count: "0",
                        p3count: "0",
                        p4count: "0",
                        p5count: "0",
                        p6count: "0",
                        p7count: "0",
                        DateAndDay: "Sun 07-Jan-2021",
                        TimeDuration: "11am - 5pm (06 hours)",
                        Location: "",
                        Rate: "0",
                        tax: "0",
                        GSTamount: "0",
                        Amount: "0",
                      },
                    ],
                  }));

                this.setState({ haldi: 1 });
              }}
            >
              <p className="haldiText">Haldi</p>
            </div>
            <div
              className={`mehendi ${this.state.mehendi ? "selected" : ``}`}
              onClick={() => {
                !this.state.mehendi &&
                  this.setState((prevstate) => ({
                    QuotationDetails: [
                      ...prevstate.QuotationDetails,
                      {
                        EventName: "Mehendi",
                        PhotoGrapher1: "",
                        PhotoGrapher2: "",
                        PhotoGrapher3: "",
                        PhotoGrapher4: "",
                        PhotoGrapher5: "",
                        PhotoGrapher6: "",
                        PhotoGrapher7: "",
                        p1count: "0",
                        p2count: "0",
                        p3count: "0",
                        p4count: "0",
                        p5count: "0",
                        p6count: "0",
                        p7count: "0",
                        DateAndDay: "Sun 07-Jan-2021",
                        TimeDuration: "11am - 5pm (06 hours)",
                        Location: "varanasi",
                        Rate: "0",
                        tax: "0",
                        GSTamount: "0",
                        Amount: "0",
                      },
                    ],
                  }));

                this.setState({ mehendi: 1 });
              }}
            >
              <p className="mehendiText">Mehendi</p>
            </div>
            <div
              className={`wedding ${this.state.wedding ? "selected" : ``}`}
              onClick={() => {
                !this.state.wedding &&
                  this.setState((prevstate) => ({
                    QuotationDetails: [
                      ...prevstate.QuotationDetails,
                      {
                        EventName: "Wedding",
                        PhotoGrapher1: "",
                        PhotoGrapher2: "",
                        PhotoGrapher3: "",
                        PhotoGrapher4: "",
                        PhotoGrapher5: "",
                        PhotoGrapher6: "",
                        PhotoGrapher7: "",
                        p1count: "0",
                        p2count: "0",
                        p3count: "0",
                        p4count: "0",
                        p5count: "0",
                        p6count: "0",
                        p7count: "0",
                        DateAndDay: "Sun 07-Jan-2021",
                        TimeDuration: "11am - 5pm (06 hours)",
                        Location: "varanasi",
                        Rate: "0",
                        tax: "0",
                        GSTamount: "0",
                        Amount: "0",
                      },
                    ],
                  }));

                this.setState({ wedding: 1 });
              }}
            >
              <p className="weddingText">Wedding</p>
            </div>
            <div
              className={`reception ${this.state.reception ? "selected" : ``}`}
              onClick={() => {
                !this.state.reception &&
                  this.setState((prevstate) => ({
                    QuotationDetails: [
                      ...prevstate.QuotationDetails,
                      {
                        EventName: "Reception",
                        PhotoGrapher1: "",
                        PhotoGrapher2: "",
                        PhotoGrapher3: "",
                        PhotoGrapher4: "",
                        PhotoGrapher5: "",
                        PhotoGrapher6: "",
                        PhotoGrapher7: "",
                        p1count: "0",
                        p2count: "0",
                        p3count: "0",
                        p4count: "0",
                        p5count: "0",
                        p6count: "0",
                        p7count: "0",
                        DateAndDay: "Sun 07-Jan-2021",
                        TimeDuration: "11am - 5pm (06 hours)",
                        Location: "",
                        Rate: "0",
                        tax: "0",
                        GSTamount: "0",
                        Amount: "0",
                      },
                    ],
                  }));

                this.setState({ reception: 1 });
              }}
            >
              <p className="receptionText">Reception</p>
            </div>
            <div
              className={`others ${this.state.others ? "selected" : ``}`}
              onClick={() => {
                !this.state.others &&
                  this.setState((prevstate) => ({
                    QuotationDetails: [
                      ...prevstate.QuotationDetails,
                      {
                        EventName: "Others",
                        PhotoGrapher1: "",
                        PhotoGrapher2: "",
                        PhotoGrapher3: "",
                        PhotoGrapher4: "",
                        PhotoGrapher5: "",
                        PhotoGrapher6: "",
                        PhotoGrapher7: "",
                        p1count: "0",
                        p2count: "0",
                        p3count: "0",
                        p4count: "0",
                        p5count: "0",
                        p6count: "0",
                        p7count: "0",
                        DateAndDay: "Sun 07-Jan-2021",
                        TimeDuration: "11am - 5pm (06 hours)",
                        Location: "",
                        Rate: "0",
                        tax: "0",
                        GSTamount: "0",
                        Amount: "0",
                      },
                    ],
                  }));

                this.setState({ others: 1 });
              }}
            >
              <p className="othersText">Others</p>
            </div>
          </div>

          <div>
            {" "}
            {/* //table headers---------------------------------- */}
            <div className="QuotationDetailTableNewCustomer">
              <table
                className="TableBody1"
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  marginTop: "-5px",
                  backgroundPosition: "fixed",
                  overflowY: "scroll",
                  position: "relative",
                }}
              >
                <thead style={{ height: "41px" }}>
                  <tr style={{ padding: "0px", margin: "0px" }}>
                    <th
                      rowSpan={2}
                      style={{
                        width: "170px",
                        padding: "0px",
                        margin: "0px",
                        paddingLeft: "10px",
                        background: "#F9F9F9",
                      }}
                    >
                      EVENT DETAILS
                    </th>
                    <th
                      rowSpan={2}
                      style={{
                        width: "125px",
                        padding: "0px",
                        margin: "0px",
                        paddingLeft: "10px",
                        background: "#F9F9F9",
                      }}
                    >
                      EVENT DATE & TIME {"  "}
                      <img
                        src={Calendar}
                        alt="calendar"
                        style={{
                          position: "relative",
                          left: "8px",
                          top: "4px",
                        }}
                      />
                    </th>
                    <th
                      rowSpan={2}
                      style={{
                        width: "122px",
                        padding: "0px",
                        margin: "0px",
                        paddingLeft: "10px",
                        background: "#F9F9F9",
                      }}
                    >
                      LOCATION{" "}
                      <img
                        src={Location}
                        alt="loc"
                        style={{
                          position: "relative",
                          left: "85px",
                          top: "4px",
                        }}
                      />
                    </th>
                    <th
                      rowSpan={2}
                      style={{
                        width: "78px",
                        padding: "0px",
                        margin: "0px",
                        paddingLeft: "10px",
                        background: "#F9F9F9",
                      }}
                    >
                      RATE
                    </th>

                    <th
                      rowSpan="2"
                      style={{
                        width: "74px",
                        padding: "0px",
                        margin: "0px",
                        paddingLeft: "10px",
                        background: "#F9F9F9",
                      }}
                    >
                      TAX
                    </th>
                    <th
                      rowSpan={2}
                      style={{
                        width: "84px",
                        padding: "0px",
                        margin: "0px",
                        paddingLeft: "10px",
                        background: "#F9F9F9",
                      }}
                    >
                      {" "}
                      AMOUNT
                    </th>
                  </tr>
                  <tr style={{ height: "5px" }}></tr>
                </thead>

                <tbody>
                  {" "}
                  {/* mapping values of array in the table rows------------------------------------------------------------------ */}
                  {this.state.QuotationDetails.map((AmtDetails, i) => (
                    <tr
                      className="TableContent"
                      key={i}
                      style={{ padding: "0px", margin: "0px" }}
                    >
                      <td>
                        <div>{AmtDetails.EventName}</div>
                        <div
                          style={{
                            display: "flex",
                            flexFlow: "row",
                          }}
                          onClick={() => {
                            //opens up the services box of a particular row..........
                            var prevq = QuotationDetails;
                            prevq[i].servicesBox = !prevq[i].servicesBox;
                            this.setState({
                              prevq,
                            });
                          }}
                        >
                          {" "}
                          <h1>Select Services</h1>{" "}
                        </div>

                        {/* checkbox modal for services--------------------------------------------------------------------------------------------------------------------- */}

                        <div
                          className="checkBoxModal"
                          style={{
                            display: !QuotationDetails[i].servicesBox && "none",
                            position: "absolute",
                            width: "280px",
                            height: "285px",
                            background: "#F4F4F4",
                            border: "1px solid #2F2F2F",
                            boxSizing: "border-box",
                            borderRadius: "2.78365px",
                            zIndex: "101",
                          }}
                        >
                          <div className="checkBoxes">
                            {[
                              "Candid Photographer",
                              "Traditional Videographer",
                              "Traditional Photographer",
                              "Cinematographer",
                              "Drone",
                              "Web Live Streaming",
                              "LED Wall 8x12",
                            ].map((option, idx) => {
                              let nam = `PhotoGrapher${idx + 1}`;
                              return (
                                <div
                                  key={idx}
                                  style={{
                                    background: "none",
                                    margin: "5px",
                                    padding: "5px",
                                  }}
                                >
                                  <p
                                    style={{
                                      position: "absolute",
                                      width: "197px",
                                      height: "17px",
                                      margin: "10px",
                                      left: "0px",
                                      padding: "10px",
                                      fontFamily: "Roboto",
                                      fontStyle: "normal",
                                      fontWeight: "normal",
                                      fontSize: "13px",
                                      lineHeight: "15px",

                                      color: "#595959",
                                    }}
                                  >
                                    {option}
                                  </p>
                                  <input
                                    type="checkbox"
                                    name={nam}
                                    value={option}
                                    className=""
                                    checked={
                                      QuotationDetails[i][nam] !== "" && true
                                    }
                                    onChange={(e) => {
                                      this.handlechangecheckbox(
                                        e,
                                        i,
                                        QuotationDetails
                                      );
                                    }}
                                    style={{
                                      position: "relative",
                                      top: "20px",
                                      left: "230px",
                                      width: "15px",
                                      height: "15px",
                                      right: "14px",
                                      background: "#FFFFFF",
                                      border: "1.5px solid #595959",
                                      boxSizing: "border-box",
                                      borderRadius: "2px",
                                    }}
                                  />
                                </div>
                              );
                            })}
                            {/* checkbox modal for services--------------------------------------------------------------------------------------------------------------------- */}
                          </div>
                        </div>

                        <div
                          style={{
                            display:
                              AmtDetails.PhotoGrapher1 === "" ? "none" : "flex",
                            flexFlow: "row",
                          }}
                        >
                          {" "}
                          <h1>{AmtDetails.PhotoGrapher1}</h1>{" "}
                          {/* //input type for number of photographers of each type................... */}
                          <h2 style={{ float: "right" }}>
                            <input
                              className="photographerCount"
                              type="number"
                              name="p1count"
                              min="0"
                              max="100"
                              step="1"
                              value={this.state.QuotationDetails[i].p1count}
                              onChange={(event) => {
                                this.handleChangeQuotation(
                                  event,
                                  i,
                                  QuotationDetails
                                );
                              }}
                            />
                          </h2>
                        </div>
                        <div
                          style={{
                            display:
                              AmtDetails.PhotoGrapher2 === "" ? "none" : "flex",
                          }}
                        >
                          <h1>{AmtDetails.PhotoGrapher2}</h1>{" "}
                          <h2 style={{ float: "right" }}>
                            <input
                              className="photographerCount"
                              type="number"
                              name="p2count"
                              min="0"
                              max="100"
                              step="1"
                              value={QuotationDetails[i].p2count}
                              onChange={(event) => {
                                this.handleChangeQuotation(
                                  event,
                                  i,
                                  QuotationDetails
                                );
                              }}
                            />
                          </h2>
                        </div>
                        <div
                          style={{
                            display:
                              AmtDetails.PhotoGrapher3 === "" ? "none" : "flex",
                          }}
                        >
                          <h1>{AmtDetails.PhotoGrapher3}</h1>{" "}
                          <h2 style={{ float: "right" }}>
                            <input
                              className="photographerCount"
                              type="number"
                              name="p3count"
                              min="0"
                              max="100"
                              step="1"
                              value={QuotationDetails[i].p3count}
                              onChange={(event) => {
                                this.handleChangeQuotation(
                                  event,
                                  i,
                                  QuotationDetails
                                );
                              }}
                            />
                          </h2>
                        </div>
                        <div
                          style={{
                            display:
                              AmtDetails.PhotoGrapher4 === "" ? "none" : "flex",
                          }}
                        >
                          <h1>{AmtDetails.PhotoGrapher4}</h1>{" "}
                          <h2 style={{ float: "right" }}>
                            <input
                              className="photographerCount"
                              type="number"
                              name="p4count"
                              min="0"
                              max="100"
                              step="1"
                              value={QuotationDetails[i].p4count}
                              onChange={(event) => {
                                this.handleChangeQuotation(
                                  event,
                                  i,
                                  QuotationDetails
                                );
                              }}
                            />
                          </h2>
                        </div>
                        <div
                          style={{
                            display:
                              AmtDetails.PhotoGrapher5 === "" ? "none" : "flex",
                          }}
                        >
                          <h1>{AmtDetails.PhotoGrapher5}</h1>{" "}
                          <h2 style={{ float: "right" }}>
                            <input
                              className="photographerCount"
                              type="number"
                              name="p5count"
                              min="0"
                              max="100"
                              step="1"
                              value={QuotationDetails[i].p5count}
                              onChange={(event) => {
                                this.handleChangeQuotation(
                                  event,
                                  i,
                                  QuotationDetails
                                );
                              }}
                            />
                          </h2>
                        </div>
                        <div
                          style={{
                            display:
                              AmtDetails.PhotoGrapher6 === "" ? "none" : "flex",
                          }}
                        >
                          <h1>{AmtDetails.PhotoGrapher6}</h1>{" "}
                          <h2 style={{ float: "right" }}>
                            <input
                              className="photographerCount"
                              type="number"
                              name="p6count"
                              min="0"
                              max="100"
                              step="1"
                              value={QuotationDetails[i].p6count}
                              onChange={(event) => {
                                this.handleChangeQuotation(
                                  event,
                                  i,
                                  QuotationDetails
                                );
                              }}
                            />
                          </h2>
                        </div>
                        <div
                          style={{
                            display:
                              AmtDetails.PhotoGrapher7 === "" ? "none" : "flex",
                          }}
                        >
                          <h1>{AmtDetails.PhotoGrapher7}</h1>{" "}
                          <h2 style={{ float: "right" }}>
                            <input
                              className="photographerCount"
                              type="number"
                              name="p7count"
                              min="0"
                              max="100"
                              step="1"
                              value={QuotationDetails[i].p7count}
                              onChange={(event) => {
                                this.handleChangeQuotation(
                                  event,
                                  i,
                                  QuotationDetails
                                );
                              }}
                            />
                          </h2>
                        </div>
                      </td>

                      {/* date and day + calendar part------------------------------------ */}
                      <td>
                        {" "}
                        {AmtDetails.DateAndDay} <br /> {AmtDetails.TimeDuration}
                      </td>
                      <td style={{ width: "121px" }}>
                        {" "}
                        <textarea
                          className="locationText"
                          // type="text"
                          name="Location"
                          placeholder="Type or click to choose a Location"
                          value={QuotationDetails[i].Location}
                          style={{
                            position: "relative",
                            height: "inherit",
                            width: "inherit",
                            textAlign: "left",
                            left: "5px",

                            border: "none",
                            outline: "none",
                            fontStyle: "normal",
                            fontWeight: "normal",
                            fontSize: "13px",
                            lineHeight: "15px",
                            resize: "none",
                            fontFamily: "Roboto",

                            color: "#595959",
                          }}
                          onChange={(event) => {
                            this.handleChangeQuotation(
                              event,
                              i,
                              QuotationDetails
                            );
                          }}
                        />
                      </td>

                      {/* rate part in the form ----------------------------- */}
                      <td style={{ width: "89px" }}>
                        {" "}
                        <input
                          className="rateText"
                          type="text"
                          name="Rate"
                          placeholder="0.00"
                          value={QuotationDetails[i].Rate}
                          style={{
                            position: "relative",
                            height: "inherit",
                            width: "inherit",
                            textAlign: "end",
                            // left: "39px",
                            border: "none",
                            outline: "none",
                            fontFamily: "Roboto",
                            fontStyle: "normal",
                            fontWeight: "normal",
                            fontSize: "13px",
                            lineHeight: "15px",

                            color: "#595959",
                          }}
                          onChange={(event) => {
                            this.handleChangeQuotation(
                              event,
                              i,
                              QuotationDetails
                            );
                          }}
                        />
                      </td>

                      {/* tAX input in the form ------------------------------------------- */}
                      <td>
                        {" "}
                        <select
                          name="tax"
                          className=""
                          value={QuotationDetails[i].tax}
                          onChange={(event) => {
                            this.handleChangeQuotation(
                              event,
                              i,
                              QuotationDetails
                            );
                          }}
                        >
                          <option value="0">GST0 [0%]</option>{" "}
                          {/* //dropdown for the tax selection */}
                          <option value="5">GST5 [5%]</option>
                          <option value="12">GST12 [12%]</option>
                          <option value="18">GST18 [18%]</option>
                          <option value="24">GST24 [24%]</option>
                        </select>
                      </td>

                      {/* calculated amount display/ ---------------------------------------------- */}
                      <td>
                        {" "}
                        {AmtDetails.Amount}{" "}
                        {/* delete button with its functionalities like updating the array,subtotal, total tax and discount accordingly  */}
                        <img
                          style={{
                            position: "relative",
                            right: "-54px",
                            top: "10px",
                            cursor: "pointer",
                          }}
                          src={deleteButton}
                          alt="delete"
                          onClick={() => {
                            let nam = AmtDetails.EventName.toLowerCase();
                            nam = nam === "pre-wedding" ? "prewedding" : nam;
                            console.log(nam);
                            let amt =
                              QuotationDetails[i].Amount === ""
                                ? "0"
                                : QuotationDetails[i].Amount;
                            let newtotalGST = //calculate new totalgst
                              parseFloat(
                                this.state.totalGST === ""
                                  ? "0"
                                  : this.state.totalGST
                              ) -
                              parseFloat(
                                QuotationDetails[i].GSTamount === ""
                                  ? "0"
                                  : QuotationDetails[i].GSTamount
                              );
                            let newsubtotal = //new subtotal value
                            (
                              parseFloat(
                                this.state.subTotal === ""
                                  ? "0"
                                  : this.state.subTotal
                              ) - parseFloat(amt)
                            ).toFixed(2);
                            this.setState((prevstate) => ({
                              //updating substotal and totalgst states
                              [nam]: prevstate[nam] - 1,
                              subTotal: String(newsubtotal),
                              totalGST: String(newtotalGST.toFixed(2)),
                            }));
                            if (this.state.discountType === "%") {
                              //updating discount due to change in subtotal acc to type of discount if % or rs.
                              let value =
                                (parseFloat(
                                  this.state.discount === ""
                                    ? "0"
                                    : this.state.discount
                                ) *
                                  parseFloat(newsubtotal)) /
                                100;
                              this.setState({
                                discountValue: value.toFixed(2),
                              });
                            } else {
                              let value = parseFloat(
                                this.state.discount === ""
                                  ? "0"
                                  : this.state.discount
                              );
                              this.setState({
                                discountValue: value.toFixed(2),
                              });
                            }
                            let q = QuotationDetails.splice(i, 1); //deleting array item acc. to index i
                            this.setState({ q }); //setting the new quotationdetails array
                          }}
                        ></img>
                        {/* Copy button with its functionalities like updating the array,subtotal, total tax and discount accordingly  */}
                        <img
                          src={copyButton}
                          alt="copy"
                          style={{
                            position: "relative",
                            right: "-35px",
                            top: "-11px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            let nam = AmtDetails.EventName.toLowerCase();
                            nam = nam === "pre-wedding" ? "prewedding" : nam;
                            let newtotalGST =
                              parseFloat(
                                this.state.totalGST === ""
                                  ? "0"
                                  : this.state.totalGST
                              ) +
                              parseFloat(
                                QuotationDetails[i].GSTamount === ""
                                  ? "0"
                                  : QuotationDetails[i].GSTamount
                              );
                            this.setState((prevstate) => ({
                              [nam]: prevstate[nam] + 1,
                              subTotal: String(
                                (
                                  parseFloat(
                                    prevstate.subTotal === ""
                                      ? "0"
                                      : prevstate.subTotal
                                  ) +
                                  parseFloat(
                                    QuotationDetails[i].Amount === ""
                                      ? "0"
                                      : QuotationDetails[i].Amount
                                  )
                                ).toFixed(2)
                              ),
                              totalGST: String(newtotalGST.toFixed(2)),
                            }));
                            if (this.state.discountType === "%") {
                              let value =
                                (parseFloat(
                                  this.state.discount === ""
                                    ? "0"
                                    : this.state.discount
                                ) *
                                  parseFloat(
                                    this.state.subTotal === ""
                                      ? ""
                                      : this.state.subTotal
                                  )) /
                                100;
                              this.setState({
                                discountValue: String(value.toFixed(2)),
                              });
                            } else {
                              let value = parseFloat(
                                this.state.discount === ""
                                  ? "0"
                                  : this.state.discount
                              );
                              this.setState({
                                discountValue: String(value.toFixed(2)),
                              });
                            }
                            console.log(this.state[nam], "copy");

                            this.setState((prevstate) => ({
                              //using spread operatior and pushing a new object to end of array with same values
                              QuotationDetails: [
                                ...prevstate.QuotationDetails,
                                {
                                  EventName:
                                    prevstate.QuotationDetails[i].EventName,
                                  PhotoGrapher1:
                                    prevstate.QuotationDetails[i].PhotoGrapher1,
                                  PhotoGrapher2:
                                    prevstate.QuotationDetails[i].PhotoGrapher2,
                                  PhotoGrapher3:
                                    prevstate.QuotationDetails[i].PhotoGrapher3,
                                  PhotoGrapher4:
                                    prevstate.QuotationDetails[i].PhotoGrapher4,
                                  PhotoGrapher5:
                                    prevstate.QuotationDetails[i].PhotoGrapher5,
                                  PhotoGrapher6:
                                    prevstate.QuotationDetails[i].PhotoGrapher6,
                                  PhotoGrapher7:
                                    prevstate.QuotationDetails[i].PhotoGrapher7,
                                  p1count:
                                    prevstate.QuotationDetails[i].p1count,
                                  p2count:
                                    prevstate.QuotationDetails[i].p2count,
                                  p3count:
                                    prevstate.QuotationDetails[i].p3count,
                                  p4count:
                                    prevstate.QuotationDetails[i].p4count,
                                  p5count:
                                    prevstate.QuotationDetails[i].p5count,
                                  p6count:
                                    prevstate.QuotationDetails[i].p6count,
                                  p7count:
                                    prevstate.QuotationDetails[i].p7count,
                                  DateAndDay:
                                    prevstate.QuotationDetails[i].DateAndDay,
                                  TimeDuration:
                                    prevstate.QuotationDetails[i].TimeDuration,
                                  Location:
                                    prevstate.QuotationDetails[i].Location,
                                  Rate: prevstate.QuotationDetails[i].Rate,
                                  tax: prevstate.QuotationDetails[i].tax,
                                  GSTamount:
                                    prevstate.QuotationDetails[i].GSTamount,
                                  Amount: prevstate.QuotationDetails[i].Amount,
                                },
                              ],
                            }));
                          }}
                        ></img>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="Calcutions"
                style={{
                  position: "relative",
                  width: "346px",
                  height: "auto",
                  background: "#F4F4F4",
                  borderRadius: "2.78365px",
                  right: "-349px",
                  top: "16px",
                  padding: "0",
                }}
              >
                <h1
                  style={{
                    padding: "0",
                  }}
                >
                  <label>Subtotal</label>
                  <label>
                    {this.state.subTotal === "" ? "0" : this.state.subTotal}
                  </label>
                </h1>
                <h1
                  style={{
                    padding: "0",
                  }}
                >
                  <label>Discount</label>
                  <input
                    type="text"
                    name="discount"
                    style={{
                      background: "#FFFFFF",
                      border: "0.927885px solid #B2B2B2",
                      boxSizing: "border-box",
                      position: "relative",
                      width: "74px",
                      left: "14px",
                    }}
                    value={this.state.discount}
                    onChange={(e) => {
                      this.myChangeHandler(e);
                    }}
                  />
                  <select
                    className="SelectPercent"
                    name="discountType"
                    value={this.state.discountType}
                    onChange={(e) => {
                      this.myChangeHandler(e);
                    }}
                    style={{
                      position: "relative",
                      left: "3px",
                      // width: "0",
                      background: "#F0F0F0",
                      border: "0.927885px solid #B2B2B2",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="%">%</option>
                    <option value="₹">₹</option>
                  </select>
                  <label
                    style={{
                      position: "relative",
                      left: "22px",
                    }}
                  >
                    {this.state.discountValue}
                  </label>
                </h1>
                <h1
                  style={{
                    padding: "0",
                  }}
                >
                  <label>GST[₹]</label>
                  <label>{this.state.totalGST}</label>
                </h1>
                {/* <h1
                  style={{
                    padding: "0",
                  }}
                >
                  <label>CGST[9%]</label>
                  <label>{this.state.GSTamount/2}</label>
                </h1> */}

                <h2
                  style={{
                    padding: "0",
                  }}
                >
                  <label>Total('₹')</label>
                  <label>
                    {(this.state.subTotal - this.state.discountValue).toFixed(
                      2
                    )}
                  </label>
                </h2>
              </div>
              <button
                type="submit"
                className="SubmitButton"
                onClick={(e) => {
                  this.handleSubmit(e);
                }}
                style={{
                  position: "relative",
                  top: "67px",
                  background: "#4D5573",
                  borderRadius: "2.78365px",
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "13px",
                  lineHeight: "15px",

                  /* identical to box height */
                  width: "63.76px",
                  height: "25.32px",
                  color: "#FFFFFF",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewCustomer;
