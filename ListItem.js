import React, { Component } from 'react';
import { View, Text, StyleSheet,Image, TextInput, TouchableHighlight, AlertIOS, TouchableOpacity, FlatList} from 'react-native';
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
        width:'85%'
      },
      buttonText: {
        fontSize: 18,
        color: 'blue',
        alignSelf: 'center',
        marginTop :10
      },
      button: {


      },
      centerText :{
        textAlign: 'center',
        fontSize: 20,
        marginTop :10
      },
      toolbar:{
        paddingTop:10,
        paddingBottom:10,
        flexDirection:'row',
        height:50
         //Step 1
    },
    tabsToolbar:{
      paddingTop:10,
      paddingBottom:10,
      flexDirection:'row',


       //Step 1
    },
    topView:{
      paddingTop:10,
      paddingBottom:10,
      height:50
       //Step 1
    },
    toolbarButton:{
        width: 30,            //Step 2
        textAlign:'center',
        marginTop:  5,
        marginLeft:  0
    },
    backButton:{
      width: 30,            //Step 2
      textAlign:'center',
      marginTop:  5,
      marginLeft:0
    },
    toolbarTitle:{
        textAlign:'center',
        fontWeight:'bold',
        flex:1,
        marginTop: 0,
        fontSize:20               //Step 3
     },
     sender:{
       alignItems: 'flex-end',
       marginLeft : 10,
       marginRight:10
     },
     receiver :{
         alignItems: 'flex-start',
         marginLeft : 10,
         marginRight: 10
     },
     senderText:{
       padding :10,
      marginBottom:10,
       borderRadius:10,
       borderWidth:1,
        width:'50%',
         borderColor:"red"
     },
     receiverText:{
       padding :10,
      marginBottom:10,
       borderRadius:10,
       borderWidth:1,
        width:'50%',
         borderColor:"green"
     }
  })

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          error: false,
          items: [],
          message : " "
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
         this.setState({
           name: " "
         });
      //   this.props.navigation.navigate('ListItemScreen')
      }

    render() {
    //  console.log(this.state.items);
        return (

            <View style={styles.container}>
              <View style={styles.toolbar} >
                  <TouchableOpacity onPress={() => this.openDrawer()}>
                  <Image  style={styles.hamburgerIcon} />
                  </TouchableOpacity>
                   <Text style={styles.toolbarTitle}>Messages</Text>
                   <TouchableOpacity onPress={() => this.searchPage()}>
                  <Image  style={styles.searchIcon} />
                  </TouchableOpacity>
               </View>
                {
                    this.state.items.length > 0
                    ?  <FlatList
          data={this.state.items}

          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={[ item.id == 5 ? styles.sender : styles.receiver]}>
            <Text style={[ item.id == 5 ? styles.senderText : styles.receiverText]}>{item.name}</Text>
          </View>
          }
          keyExtractor={item => item.email}
        />
      : <Text style={styles.centerText}>No Messages</Text>
                }
                <View style={styles.main}>
                <Text style={styles.title}></Text>
                <View style={{flexDirection:'row',  borderWidth: 1, width:'90%', marginLeft:10,  borderRadius:10}}>
                <TextInput
                    style={styles.itemInput}
                    onChange={this.handleChange}
                    value={this.state.name}
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
