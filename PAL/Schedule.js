import React, { Component } from 'react';
import { StyleSheet,Text,View,} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, Button } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation';
import CalendarStrip from 'react-native-calendar-strip';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import * as firebase from 'firebase';

export default class ScheduleScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: {}
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) {
   setTimeout(() => {
     for (let i = -15; i < 85; i++) {
       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
       const strTime = this.timeToString(time);
       if (!this.state.items[strTime]) {
         this.state.items[strTime] = [];
         const numItems = Math.floor(Math.random() * 5);
         for (let j = 0; j < numItems; j++) {
           this.state.items[strTime].push({
             name: 'Item for ' + strTime,
             height: Math.max(50, Math.floor(Math.random() * 150))
           });
         }
       }
     }
     const newItems = {};
     Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
     this.setState({
       items: newItems
     });
   }, 1000);
 }

 renderItem(item) {
   return (
     <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
   );
 }

 renderEmptyDate() {
   return (
     <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
   );
 }

 rowHasChanged(r1, r2) {
   return r1.name !== r2.name;
 }

 timeToString(time) {
   const date = new Date(time);
   return date.toISOString().split('T')[0];
 }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
