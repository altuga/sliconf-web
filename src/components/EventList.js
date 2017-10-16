import React from 'react';

const EventsNotAvailable = () => {
   return (
      <tr>
         <td colSpan="2">No events to be listed!</td>
      </tr>
   )
};

class EventList extends React.Component {

   render() {
      return (
         <div>
            <div className="row">
               <div className="twelve columns">
                  <h3>{this.props.title || 'Events'}</h3>
               </div>
            </div>
            <div className="row">
               <div className="twelve columns">
                  <div className="docs-example">
                     <table className="u-full-width">
                        <thead>
                        <tr>
                           <th>Logo</th>
                           <th>Title</th>
                           <th>Date</th>
                           <th>Status</th>
                           <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.props.events && this.props.events.length) ? null : <EventsNotAvailable/> }
                        {this.props.events ? this.props.events.map((event)=>{
                           return <tr key={event.id}>
                              <td><div className='eventimage' style={{backgroundImage:'url('+event.logo+')'}}/></td>
                              <td>{event.name}</td>
                              <td>{event.date.toString()}</td>
                              <td>{(event.status==='active') ? <div className="noproblem"></div> : <div className="problem"></div> }</td>
                              <td><button  onClick={() => this.props.history.push('/events/'+event.id+'/edit')}>Edit</button></td>
                           </tr>
                        }) : null}
                        </tbody>
                     </table>
                  </div>
               </div>

            </div>
         </div>
      );
   }
}

export default EventList