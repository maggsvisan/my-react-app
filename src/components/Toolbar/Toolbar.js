import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './Toolbar.css';
import Scheduler from '../Scheduler/Scheduler';
import HBDPromo from '../HBDPromo/HBDPromo';
import PromoLoop from '../PromoLoop/PromoLoop';
import PowerSettings from '../PowerSettings/PowerSettings';
import ProofPlaying from '../ProofPlaying/ProofPlaying';
import QuickViewSchedule from '../QuickViewSchedule/QuickViewSchedule';
import firebase from 'firebase';

import { Icon, Navbar, Button } from 'react-materialize';
import UserStore from "../../store/UserStore";

class Toolbar extends Component {
  
  constructor(props){
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    UserStore.signOut();
  }

  render() {
    return (
      <Router>
        <div >
          <Navbar className="Toolbar">
            <li>
              <Link to="/scheduler">
                <Icon className="material-icons left">access_time</Icon> Scheduler
            </Link>
            </li>

            <li>
              <Link to="/QuickViewSchedule">
                <Icon className="material-icons left">view_list</Icon> Schedule Quick View
            </Link>
            </li>

            <li>
              <Link to="/promoHBD">
                <Icon className="material-icons left">access_alarm</Icon> Announcements
            </Link>
            </li>

            <li>
              <Link to="/proofPlaying">
                <Icon className="material-icons left">insert_chart</Icon> Proof of Playing
            </Link>
            </li>

            <li>
              <Link to="/promoLoop">
                <Icon className="material-icons left">cached</Icon>Loop Promo
            </Link>
            </li>

            <li>
              <Link to="/powerONOFF">
                <Icon className="material-icons left">power_settings_new</Icon>Power Settings
            </Link>
            </li>


            <li>
              <Button onClick={() => this.logout()}> Logout </Button>
            </li>

          </Navbar>

          <hr />

          <Switch>
            <Route exact path="/Scheduler" render={() => <Scheduler
                verifyDayOfWeek={this.props.verifyDayOfWeek}
                updateScheduler={this.props.updateScheduler}
              />}
            />
            
            <Route exact path="/QuickViewSchedule" render={() => <QuickViewSchedule
              showSchedules={this.props.showSchedules}
              />}
            />

            <Route path="/proofPlaying" component={ProofPlaying} />

            <Route exact path="/promoHBD" render={() => <HBDPromo
              updateAnnouncement={this.props.updateAnnouncement} />}
            />

            <Route exact path="/promoLoop" render={() => <PromoLoop
              updateLoopPromo={this.props.updateLoopPromo} />}
            />

            <Route exact path="/powerONOFF" render={() => <PowerSettings
              updatePowerSettings={this.props.updatePowerSettings} />}
            />
          </Switch>

            
        </div>

      </Router>
    )
  }
}

export default Toolbar;