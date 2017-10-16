import React from 'react';

const ListItem = ({speaker}) => {
   return (
      <tr>
         <td><div className="image rounded mini" style={{backgroundImage: 'url(http://www.maxfm.com.tr/files/artists/rick-astley/images/ricast1006.jpg)'}}/></td>
         <td>{speaker.name}</td>
         <td>{speaker.workingat}</td>
         <td><a href="" className="button">Linkedin</a> <a href="" className="button">Twitter</a> <a href="" className="button">About</a></td>
      </tr>
   )
}

const SpeakersNotAvailable = () => {
   return (
      <tr>
         <td colSpan="2">No speakers to be listed!</td>
      </tr>
   )
}


class SpeakerList extends React.Component {

   render() {
      return (
         <div className="row">
            <div className="twelve columns">
               <div className="docs-example">
                  <table className="u-full-width">
                     <thead>
                     <tr>
                        <th style={{width: 40}}>Photo</th>
                        <th>Full Name</th>
                        <th>Working At</th>
                        <th>Actions</th>
                     </tr>
                     </thead>
                     <tbody>
                     {(this.props.speakers && this.props.speakers.length) ? null : <SpeakersNotAvailable/> }
                     {this.props.speakers ? this.props.speakers.map((speaker)=>{
                        return <ListItem key={speaker.id} speaker={speaker}/>
                     }) : null}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

      );
   }
}

export default SpeakerList