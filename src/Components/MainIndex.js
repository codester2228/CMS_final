import React from 'react';
import './StyleIndex.css';
import { AiOutlineBell,AiOutlinePhone } from 'react-icons/ai';
import { VscDashboard ,VscGraph,VscSettingsGear} from 'react-icons/vsc';
import { MdPeople, MdArrowDropDown,MdPhotoAlbum,MdDesktopMac,MdMailOutline } from 'react-icons/md';
import {BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";
import LogoIcon from './Icons/logo.png'
import LeadsCustomerTable from './Leads/Customers/CustomerTable';
import LeadsPartnerTable from  "./Leads/Partners/PartnersTable.js"


function MainIndex() {
  return (
    <div className="MainIndex">
      <TopHeader/>
      <RightHeader />
    </div>
  );
}

export default MainIndex;

// ********************************************* Main part for TOP Header *************************************//
class TopHeader extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
          UserName: " KumarsPhoto ",
          
        };
      }
      SelectTypePhoto1 = () => {
        this.setState({PhotoType: " KumarsPhoto's"});
      }
    render() {
        return (
            <div className="TopHeader">
              <div className="LeftHeader">
                  <h1 className="LeftHeadName1">Wooty</h1>
                  <span className="TopHeaderLeftLine"></span>
                  <h1 className="LeftHeadName2">Premium</h1>
              </div>
              <div className="RightHeader"> 
                  <div className="rightHeadOne">
                      <div><AiOutlinePhone className="CallIcon" /></div>
                      <div><h1 className="rightHeadOnetxt">Contact Us</h1></div>
                      
                  </div>
                  <div className="rightHeadTwo">
                  <div><AiOutlineBell className="BellIcon" /></div>
                      <div><h1 className="rightHeadTwotxt">Notification</h1></div>
                  </div>
                  <div className="rightHeadThree">
                  <div><img className="LogoIcon" src={LogoIcon} alt=""/></div>
                      <div><h1 className="rightHeadThreetxt">{this.state.UserName}</h1></div>
                  </div>
              </div>
            </div>
          );
    }
    
  }

//   *********************************main part for Right Header *************************************//

class RightHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          DropDisp: true,
        };
      }
      DisplyLeadsDropDown(){
        this.setState({DropDisp: !this.state.DropDisp})
     }
    render() {
        let LeadsDropDown = this.state.DropDisp ? "LeadsDropDown01" : "LeadsDropDown";
        let LeadsBtn = this.state.DropDisp ? "LeadsBtn" : "LeadsBtn01";
        let FiveModules = this.state.DropDisp ? "FiveModules01" : "FiveModules";
        return(
            
            <Router> <div className="RightHeaderMain">

            <div className="WelcomeQuit">      {/* Welcome User part */}
                <h2>Welcome</h2>
                <h1>Admin</h1>
            </div>
            <div className="TwoModulers">         {/* ******First Two Modules of left header ************* */}
                    <ul className='UlListwoBtns'>
                    <Link to='/Dashboard' style={{textDecoration: 'none'}}>
                         <li className="DashboardBtn">
                             <VscDashboard  className="DashBoardIcon" /> <h1 className="DashzboardTxt">Dashboard</h1>  
                        </li>
                    </Link>
                        <li className={LeadsBtn}>
                           <MdPeople className="LeadsIcon"/> <h1 className="LeadsTxt"> Leads</h1> < MdArrowDropDown className="LeadsDrop" onClick={this.DisplyLeadsDropDown.bind(this)}/>
                        </li>
                    </ul>
                </div>
                <div className={LeadsDropDown}>    {/********* Sub Modules of the Leads Module ************** */ }
                    <ul className='ShowList'>
                    <Link to='/Leads/Customer/' style={{textDecoration: 'none'}}> 
                        <li className="CustomerdBtn">
                             <h1 className="CustomerTxt" onClick={this.DisplyLeadsDropDown.bind(this)} >Customers</h1> 
                        </li>
                    </Link>
                    <Link to='/Leads/Partner/' style={{textDecoration: 'none'}}>
                        <li className="PartnerBtn">
                           <h1 className="PartnerTxt" onClick={this.DisplyLeadsDropDown.bind(this)}> Partners</h1> 
                        </li>
                    </Link>
                    </ul>
                </div>

                <div className={FiveModules}>       {/********* Rest Five Modules of Left Module  ************** */ }
                    <ul className='UlLisFiveBtns'>
                    <Link to='/Album-Folders' style={{textDecoration: 'none'}}>    
                        <li className="AlbumFlodersBtn">
                            <MdPhotoAlbum  className="AlbumFlodersIcon Icons"/> <h1 className="AlbumFlodersTxt">Album Folders</h1> 
                        </li>
                    </Link>
                    <Link to='/Website-Settings' style={{textDecoration: 'none'}}>
                        <li className="WebsiteBtn">
                           <MdDesktopMac className="WebsiteIcon Icons"/> <h1 className="WebsiteTxt">Website Settings</h1> 
                        </li>
                    </Link>
                    <Link to='/Statistics' style={{textDecoration: 'none'}}>
                        <li className="StatisticsBtn">
                            <VscGraph  className="StatisticsIcon Icons" /> <h1 className="StatisticsTxt">Statistics</h1> 
                        </li>
                    </Link>
                    <Link to='/Messages' style={{textDecoration: 'none'}}>
                        <li className="MessagesBtn">
                           <MdMailOutline className="MessagesIcon Icons"/> <h1 className="MessagesTxt">Messages</h1> 
                        </li>
                    </Link>
                    <Link to='/Settings' style={{textDecoration: 'none'}}>
                        <li className="SettingsBtn">
                           <VscSettingsGear className="SettingsIcon Icons"/> <h1 className="SettingsTxt">Settings</h1> 
                        </li>
                    </Link>
                    
                    </ul>
                </div>
                </div>
                <Switch>
                    <Route exact path="/Dashboard">
                      <Dashboard/>
                    </Route>
                    <Route  path="/Leads/Customer/">
                      <LeadsCustomers/>
                    </Route>
                    <Route path="/Leads/Partner/">
                      <LeadsPartners/>
                    </Route>
                    <Route path="/Album-Folders">
                      <AlbumFolders/>
                    </Route>
                    <Route  path="/Website-Settings">
                      <WebsiteSettings/>
                    </Route>
                    <Route  path="/Statistics">
                      <Statistics/>
                    </Route>
                    <Route path="/Messages">
                      <Messages/>
                    </Route>
                    <Route path="/Settings">
                      <Settings/>
                    </Route>
                  </Switch>
            </Router>
                
            
        );
    }
}


// ************************************main part for Dashboard Module ******************************************//
class Dashboard extends React.Component  {
    render() {
        return (
            <div className="DashboardMain MainOutline">
                 Dashboard
            </div>
        );
    }
}
// ************************************main part forLeads -> Customers Module ******************************************//
class LeadsCustomers extends React.Component  { 
    render() {
       
        return (
            <div className="MainOutline">
                <LeadsCustomerTable className="LeadsCustomers"/>
            </div>
           
        );
    }
}

// ************************************main part for Leads-> Partners Module ******************************************//
class LeadsPartners extends React.Component  {
    render() {
        return (
            <div className="LeadsPartnersMain MainOutline">
                <LeadsPartnerTable />
            </div>
        );
    }
}

// ************************************main part for Album Folders Module ******************************************//
class AlbumFolders extends React.Component  {
    render() {
        return (
            <div className="AlbumFoldersMain MainOutline">
                Album Folders
            </div>
        );
    }
}


// ************************************main part for Website Settings Module ******************************************//
class WebsiteSettings extends React.Component  {
    render() {
        return (
            <div className="WebsiteSettingsMain MainOutline">
                Website Settings
            </div>
        );
    }
}

// ************************************main part for Statistics Module ******************************************//
class Statistics extends React.Component  {
    render() {
        return (
            <div className="StatisticsMain MainOutline">
                Statistics
            </div>
        );
    }
}

// ************************************main part for Messages Module ******************************************//
class Messages extends React.Component  {
    render() {
        return (
            <div className="MessagesMain MainOutline">
                Messages
            </div>
        );
    }
}

// ************************************main part for Settings Module ******************************************//
class Settings extends React.Component  {
    render() {
        return (
            <div className="SettingsMain MainOutline">
                Settings
            </div>
        );
    }
}


