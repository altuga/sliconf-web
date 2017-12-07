import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TalkActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import moment from 'moment';
import classNames from 'classnames';
import * as EventActions from '../reducks/modules/event';
import DatePicker from 'react-datepicker';
import Loading from "../components/Loading";

class AddTalk extends React.Component {

   state = {
      id:'',
      speaker:'',
      topic:'',
      detail:'',
      level:'',
      room:'',
      startDate:moment.now(),
      duration:'0',
      speakers:[],
      rooms:[],
      topicsRaw:'',
      topics:[],
      loading:true,
      edit:false,
      agenda:[],
   }

   getTalkData = () => {
      return {
         id: this.state.id,
         speaker: this.state.speaker ? this.state.speaker : this.state.speakers[0].id,
         detail: this.state.detail,
         topic: this.state.topic,
         date: Math.floor(this.state.startDate/1000),
         duration: this.state.duration,
         room: this.state.room ? this.state.room : this.state.rooms[0].id,
         level: this.state.level ? this.state.level : 0,
         tags: this.state.topics,
      }
   };

   componentWillMount(){
      this.props.fetchEvent(this.props.match.params.eventId);
   }

   componentDidMount(){
      //console.log(this.props.event.agenda);
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.event && this.props.event !== nextProps.event) {
         this.setState({
            speakers: nextProps.event.speakers,
            rooms: nextProps.event.rooms,
            agenda: nextProps.event.agenda,
            loading: false,
         },()=>{
            if(this.props.match.params.talkId){
               let getter = this.state.agenda.filter(agendaItem => agendaItem.id === this.props.match.params.talkId)[0];
               console.log(getter);
               if(getter){
                  this.setState({
                     edit:true,
                     id:getter.id,
                     speaker:getter.speaker,
                     topic:getter.topic,
                     detail:getter.detail,
                     level:getter.level,
                     room:getter.room,
                     startDate:moment(getter.date*1000),
                     duration:getter.duration,
                     topicsRaw:getter.tags.join(", "),
                     topics:getter.tags,
                  })
               }
            }

         });
      }

      if(nextProps.speaker && this.props.speaker !== nextProps.speaker){
         if(!nextProps.speaker.loading){
            this.props.history.push("/events/"+this.props.match.params.eventId+"/talks");
         }
      }
   }

   addTalk = () => {
      if(this.state.topic){
         if(this.state.duration!=='0') {

            if(this.props.match.params.talkId){
               let cloneTalks = this.props.event ? this.props.event.agenda.slice(0) : [];
               cloneTalks.map((key,index) => {
                  //console.log(key.name);
                  if(key.id===this.state.id){
                     cloneTalks[index] = this.getTalkData();
                  }
                  return true;
               });
               this.props.addTalk(this.props.match.params.eventId, cloneTalks)

            }else{
               let cloneAgenda = this.props.event.agenda ? this.props.event.agenda.slice(0) : [];
               cloneAgenda.push({...this.getTalkData()});
               this.props.addTalk(this.props.match.params.eventId, cloneAgenda)
            }
         }else{
            alert("Please enter a valid duration for this talk.")
         }
      }else{
         alert("Please enter a topic for this talk.")
      }
   };

   cleanArray = (actual) => {
      let newArray = [];
      for (let i = 0; i < actual.length; i++) {
         if (actual[i] && actual[i].trim()) {
            newArray.push(actual[i]);
         }
      }
      let uniqueArray = [];
      uniqueArray = newArray.filter(function(item, pos, self) {
         return self.indexOf(item) === pos;
      })

      return uniqueArray;
   };

   changeValue = (name) => {
      return (e) => {
         if(name==="topicsRaw"){
            this.setState({
               topics:this.cleanArray(e.target.value.split(","))
            });
         }
         this.setState({[name]: e.target.value})
      }
   };

   changeDateValue = (name) => {
      return (date) => {
         this.setState({[name]: moment(date).unix()*1000})
      }
   };

   render(){
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <Loading row="3" loading={this.state.loading}>
                     {this.state.speakers && this.state.speakers.length>0 ? this.state.rooms && this.state.rooms.length>0 ? <div className="yea">
                        <PageHead title={this.props.match.params.talkId ? "Edit Talk" : "Add Talk"}/>
                           <div className="row">
                              <div className="eight columns">
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label>Speaker</label>
                                       <select className="u-full-width" value={this.state.speaker} onChange={this.changeValue('speaker')}>
                                          {this.state.speakers.map((speaker)=><option key={speaker.id} value={speaker.id}>{speaker.name}</option>)}
                                       </select>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label htmlFor="topic">Topic</label>
                                       <input className="u-full-width" type="text"
                                              value={this.state.topic} onChange={this.changeValue('topic')}/>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label htmlFor="pass">Detail</label>
                                       <textarea style={{minHeight: 110}} className="u-full-width" value={this.state.detail}
                                                 onChange={this.changeValue('detail')}/>
                                    </div>
                                 </div>

                              </div>
                              <div className="four columns">
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label htmlFor="exampleRecipientInput">Level</label>
                                       <select className="u-full-width" value={this.state.level} onChange={this.changeValue('level')}>
                                          <option value="0">Beginner</option>
                                          <option value="1">Intermediate</option>
                                          <option value="2">Advanced</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label htmlFor="exampleRecipientInput">Room</label>
                                       <select className="u-full-width" value={this.state.room} onChange={this.changeValue('room')}>
                                          {this.state.rooms.map((room)=><option key={room.id} value={room.id}>{room.label}</option>)}
                                       </select>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label htmlFor="date">TALK DATE and TIME</label>
                                       <DatePicker
                                          showTimeSelect
                                          timeIntervals={5}
                                          className="u-full-width"
                                          dateFormat="LLL"
                                          selected={moment(this.state.startDate)}
                                          onChange={this.changeDateValue('startDate')}
                                       />
                                    </div>
                                 </div>

                                 <div className="row">
                                    <div className="twelve columns">
                                       <label>Duration(<small>minutes</small>)</label>
                                       <input type="number" className="u-full-width" value={this.state.duration} onChange={this.changeValue('duration')}/>
                                    </div>
                                 </div>
                              </div>
                              <div className="row">
                                 <div className="twelve columns">
                                    <label htmlFor="username">Tags (seperate with comma)</label>
                                    <input className="u-full-width" type="text"
                                           value={this.state.topicsRaw} onChange={this.changeValue('topicsRaw')}/>
                                 </div>
                              </div>
                              <div className="row">
                                 <div className="twelve columns">
                                    {this.state.topics.map((value,index)=>{
                                       return <div className={"room"} key={index} style={{background:"gainsboro"}}>{value}</div>
                                    })}
                                 </div>
                              </div>
                           </div>
                           <div className="row mtop50 mbottom100">
                              <div className="six columns">
                                 <input className={classNames('button-primary')} type="submit" onClick={this.addTalk} defaultValue={this.props.match.params.talkId ? "Save" : "Add Talk"}/>
                              </div>
                           </div>
                        </div> : <div><h1>Sorry!</h1><p>You can't {this.props.match.params.talkId ? "edit Talk" : "add talk"} before you add a room.</p><button onClick={()=>{this.props.history.push("/events/"+this.props.match.params.eventId+"/edit/rooms")}}>GO TO EVENT SETTINGS</button></div>
                        : <div><h1>Sorry!</h1><p>You can't {this.props.match.params.talkId ? "edit Talk" : "add talk"} before you add a speaker.</p><button onClick={()=>{this.props.history.push("/events/"+this.props.match.params.eventId+"/addspeaker/redirected")}}>GO TO ADD SPEAKER</button></div>}
                  </Loading>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      event: state.event.event,
      speaker : state.speaker,
      auth: state.auth,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({...EventActions,...TalkActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTalk)