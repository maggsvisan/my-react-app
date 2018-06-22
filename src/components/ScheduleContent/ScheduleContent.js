import React, { Component, Fragment } from 'react';
import './ScheduleContent.css';
import { Row } from 'react-materialize';
import Dropdown from '../Dropdown/Dropdown';
import DropdownScreen from '../DropdownScreen/DropdownScreen'
import { observer } from 'mobx-react';
import ScheduleStore from '../../store/ScheduleStore';


//concat mp4 format
let startTime;
let endTime;
let startMin;
let startHr;
let endMin;
let endHr;
let IntStartHr;
let IntStartMin;
let IntEndtHr;
let IntEndMin;
let screen2Push;

let response= [];

const scheduleNumber = [
    { name: 'Schedule 1', key: 1 },
    { name: 'Schedule 2', key: 2 },
    { name: 'Schedule 3', key: 3 },
    { name: 'Schedule 4', key: 4 },
]

const videoName = [
    { name: 'video 1', key: 1 },
    { name: 'video 2', key: 2 },
    { name: 'video 3', key: 3 },
];

const screenName = [
    { name: 'Screen 1', key: 1 },
    { name: 'Screen 2', key: 2 },
    { name: 'Screen 3', key: 3 },
    { name: 'All Screens', key: 4 },
];

const timeNumber = [];

for (let i = 0; i <= 23; i++) {

    for (let j = 0; j <= 59; j = j + 15) {

        if (i < 10 && j < 10) {
            timeNumber.push({ key: `0${i}:0${j}`, name: `0${i}:0${j}` });
        }

        if (i < 10 && j >= 10) {
            timeNumber.push({ key: `0${i}:${j}`, name: `0${i}:${j}` });
        }

        if (i >= 10 && j >= 10) {
            timeNumber.push({ key: `${i}:${j}`, name: `${i}:${j}` })
        }

    }

}

class SchedulerContent extends Component {

    state = {
        scheduleValue: '',
        dayOfWeek: '',
        indexState: '',
        value: 'coconut',
        screenName: 'Screen 1',
        listOfSchedule: [],
        schedules: [
            {
                video: 'video 1',
                start: 0,
                end: 0,
            },
        ]
    }

    addSchedule = () => {
        ScheduleStore.addScheduleForDay(this.props.dayIndex);
    }

    handleScheduleChange = (index, name, value) => {
        const schedules = ScheduleStore.days[this.props.dayIndex].schedules.slice();
        const scheduleToModify = schedules[index];

        scheduleToModify[name] = value;
        ScheduleStore.updateSchedule(this.props.dayIndex, index, scheduleToModify);
    }

    handleScreenChange = (name, value) => {
        this.setState({ screenName: value });
    }

    removeSchedule = () => {
        ScheduleStore.removeScheduleForDay(this.props.dayIndex);
    }

    handleSubmit = () => {
        // this.props.handleSubmit(this.state.schedules, this.props.dayIndex);
    }


    sendToDb = () => {
        ScheduleStore.sendToDb();
        return;

        console.log("Clicked!")
        //console.log("length:", this.state.schedules.length);
        this.setState(prevState => {
        
            for (let i=0; i < this.state.schedules.length; i++ ){
                if (this.state.schedules[0].start === "" ||
                    this.state.schedules[0].end === "" ||
                    this.state.screenName === "" ||
                    this.state.schedules[0].video === "") {
                    alert("Not valid entry!, fill all the inputs")
                }

                if (this.state.schedules[0].start !== "" && this.state.schedules[0].end !== "" &&
                    this.state.screenName !== "" && this.state.schedules[0].video !== "") {

                    //pull states
                    startTime = this.state.schedules[0].start;
                    endTime = this.state.schedules[0].end;
                    console.log('StartTime',startTime);

                    //negative indexes
                    startHr = startTime.slice(0, -3);
                    startMin = startTime.slice(-2);

                    IntStartHr = parseInt(startHr);
                    IntStartMin = parseInt(startMin);

                    endHr = endTime.slice(0, -3);
                    endMin = endTime.slice(-2);

                    IntEndtHr = parseInt(endHr);
                    IntEndMin = parseInt(endMin);

                    if (IntStartHr > IntEndtHr) {
                        alert('Invalid Schedule');
                    }

                    if (IntStartHr === IntEndtHr && IntStartMin > IntEndMin) {
                        alert('Invalid Schedule');
                    }

                    if (IntStartHr === IntEndtHr && IntStartMin === IntEndMin) {
                        alert('Invalid Schedule');
                    }

                    else {
                        screen2Push= this.state.screenName;

                        if (screen2Push === 'All Screens' ){
                            
                            screen2Push="all";
                            
                            //console.log("send response", response);
                            this.props.updateScheduler(response);

                        }   

                        else{
                            console.log("entra else")
                            screen2Push= screen2Push.replace(" ",""); 
                            
                            response.push({
                                scheduleIndex: 'schedule'+ (i+1),
                                dayIndex:this.props.dayIndex,
                                screen: screen2Push,
                                video: this.state.schedules[i].video +'.mp4',
                                start:this.state.schedules[i].start,
                                end: this.state.schedules[i].end,
                            });
                                
                            //console.log("send response", response);
                            
                            this.props.updateScheduler(response);
                        }


                    }

                }
            }
        });
        window.location.reload();
    }

    render() {
        return (
            <div className="ScheduleContent" >
                <div className="row">
                    <div className="col s12">
                        <h6 className="headerSContent"> Only four schedules per day can be added </h6>
                    </div>

                    <br />
                    <br />

                    <div className="col s12 ">

                        <p className="subtitlesHead "> Select the screen for scheduling content </p>

                        <DropdownScreen
                            handleChange={this.handleScreenChange}
                            name="video"
                            items={screenName}
                        />
                    </div>

                    {
                        ScheduleStore.days[this.props.dayIndex].schedules.map((value, index) => (
                            <Fragment key={index}>
                                <div className="row">
                                    <div className="col s12">
                                        <h5 className="titleHead">Schedule {index + 1}</h5>
                                    </div>
                                </div>

                                <div className="row" >

                                    <div className="col s4">
                                        <Row >
                                            <p className="subtitlesHead"> Video name </p>
                                            <Dropdown
                                                handleChange={this.handleScheduleChange}
                                                name="video"
                                                index={index}
                                                items={videoName} 
                                            />
                                        </Row >
                                    </div>

                                    <div className="col s4">
                                        <Row >
                                            <p className="subtitlesHead" > Start time </p>
                                            <Dropdown 
                                                handleChange={this.handleScheduleChange} 
                                                name="start" 
                                                index={index} 
                                                items={timeNumber} 
                                            />
                                        </Row >
                                    </div>

                                    <div className="col s4">
                                        <Row >
                                            <p className="subtitlesHead"> End time </p>
                                            <Dropdown 
                                                handleChange={this.handleScheduleChange} 
                                                name="end" 
                                                index={index} 
                                                items={timeNumber} 
                                            />
                                        </Row >
                                    </div>
                                </div>
                                
                            </Fragment>
                        ))
                    }
                   
                </div>

                <div className="row">

                    <div className="col s6">
                        <button onClick={() => this.addSchedule()} className="buttonSubmit"> Add </button>
                    </div>

                    <div className="col s6">
                        <button onClick={() => this.removeSchedule()} className="buttonSubmit">Remove </button>
                    </div>

                </div>

                <div className="row">
                    <div className="col12">
                        <input className='buttonSubmit'
                            onClick={() => {
                                this.sendToDb();
                            }}
                            type="submit" value="Apply" />
                    </div>
                </div>

            </div >
        )
    }
}

export default observer(SchedulerContent);
