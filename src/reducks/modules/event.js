import events from "../../mock/events";

const FETCH_EVENT = 'event/FETCH_EVENT';
const FETCH_EVENT_SUCCESS = 'event/FETCH_EVENT_SUCCESS';
const FETCH_EVENT_FAIL = 'event/FETCH_EVENT_FAIL';

const ADD_SPEAKER = 'event/SAVE_SPEAKER';
const ADD_SPEAKER_SUCCESS = 'event/SAVE_SPEAKER_SUCCESS';
const ADD_SPEAKER_FAIL = 'event/SAVE_SPEAKER_FAIL';

const FETCH_EVENTS = 'event/FETCH_EVENTS';
const FETCH_EVENTS_SUCCESS = 'event/FETCH_EVENTS_SUCCESS';
const FETCH_EVENTS_FAIL = 'event/FETCH_EVENTS_FAIL';

const initialState = {
   loading: false,
   event: null,
   events: []
};

export default function reducer(state = initialState, action = {}) {
   switch (action.type) {
      // event
      case FETCH_EVENT:
         return {
            ...state,
            loading: true
         };
      case FETCH_EVENT_SUCCESS:
         return {
            ...state,
            loading: false,
            event: action.result,
            error: null
         };
      case FETCH_EVENT_FAIL:
         return {
            ...state,
            loading: false,
            event: null,
            error: action.error
         };
      // events
      case FETCH_EVENTS:
         return {
            ...state,
            loading: true
         };
      case FETCH_EVENTS_SUCCESS:
         return {
            ...state,
            loading: false,
            events: action.result
         };
      case FETCH_EVENTS_FAIL:
         return {
            ...state,
            loading: false,
            events: [],
            error: action.error
         };
      // add speaker to event
      case ADD_SPEAKER:
         return {
            ...state,
            loading: true
         };
      case ADD_SPEAKER_SUCCESS:
         return {
            ...state,
            loading: false,
            error: null
         };
      case ADD_SPEAKER_FAIL:
         return {
            ...state,
            loading: false,
            error: action.error
         };
      default:
         return state;
   }
}

export function fetchEvent(userId) {
   return {
      types: [FETCH_EVENT, FETCH_EVENT_SUCCESS, FETCH_EVENT_FAIL],
      promise: (client) => client.post('http://localhost:8080/service/events/get/with-key/'+userId)
   }
}

export function addSpeaker(eventId,speaker) {
   return {
      types: [ADD_SPEAKER, ADD_SPEAKER_SUCCESS, ADD_SPEAKER_FAIL],
      promise: (client) => client.post('http://localhost:8080/service/events/'+eventId,{
         data: speaker
      })
   }
}

export function fetchEvents(userId) {
   return {
      types: [FETCH_EVENTS, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAIL],
      mock: events,
      //promise: (client) => client.post('http://localhost:8080/service/events/list/'+userId)
   }
}