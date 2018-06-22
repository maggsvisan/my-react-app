import React, { Component } from 'react';
import './Scheduler.css';
import SchedulerContent from '../ScheduleContent/ScheduleContent'
import { Collapsible, CollapsibleItem, Modal, Button, Icon } from 'react-materialize';
import ScheduleStore from '../../store/ScheduleStore';
import { observer } from 'mobx-react';

class Scheduler extends Component {

    render() {
        return (
            <div className="Scheduler" >
                <div className="row"> 
                    <div className="col s12">
                        <h2 className="headerScheduler"> Scheduler </h2> 
                        
                        <span className="modalScheduler">
                            <Modal 
                                header='Modal Header'
                                trigger={<Button waves='light'>Help!<Icon right> help </Icon></Button>}
                            >
                                <p>Lorem ipsum dolor sit gmet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.</p>
                            </Modal>
                        </span>
                    </div>
                </div>

                <Collapsible>
                    {ScheduleStore.days.map(({ name, key }) => (
                        <CollapsibleItem
                            key={key}
                            header={name}
                            icon='toc'
                        >
                            <SchedulerContent dayIndex={key} />
                        </CollapsibleItem>
                    ))}

                </Collapsible>
            </div>
        )
    }
}
export default observer(Scheduler);
