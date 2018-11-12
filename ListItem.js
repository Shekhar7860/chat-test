import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput, TouchableHighlight, AlertIOS} from 'react-native';
import { addItem } from './ItemService';
import ItemComponent from './ItemComponent';
import { db } from './db';

let itemsRef = db.ref('/items');

const styles = StyleSheet.create({
    container: {
     flex: 1
     
    },
    main: {
        position:'absolute',
        width : '100%',
        bottom :20
      },
      title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center'
      },
      itemInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        color: 'white',
        width:'85%'
      },
      buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center',
        marginTop :10
      },
      button: {
       
        
      }
  })

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          error: false,
          items: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    componentDidMount() {
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({items});
         });
    }
    handleChange(e) {
        this.setState({
          name: e.nativeEvent.text
        });
      }
      handleSubmit() {
        addItem(this.state.name);
        AlertIOS.alert(
          'Message Send successfully'
         );
      //   this.props.navigation.navigate('ListItemScreen')
      }
    
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.items.length > 0
                    ? <ItemComponent items={this.state.items} />
                    : <Text>No items</Text>
                }
                <View style={styles.main}>
                <Text style={styles.title}></Text>
                <View style={{flexDirection:'row',  borderWidth: 1, width:'90%', marginLeft:10,  borderRadius:10}}>
                <TextInput
                    style={styles.itemInput}
                    onChange={this.handleChange}
                    />
                <TouchableHighlight
                        style = {styles.button}
                        underlayColor= "white"
                        onPress = {this.handleSubmit}
                    >
                    <Text
                        style={styles.buttonText}>
                        Send
                    </Text>
                    </TouchableHighlight>
                    </View>
                </View>
            </View>
           
            
        )
    }
}