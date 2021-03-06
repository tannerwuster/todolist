import React, {useState} from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const SignInScreen = ({navigation, route}) => {
    const getDetails = (type)=>{
        if(route.params){
           switch(type){
               case "userName":
                   return route.params.userName
               case "password":
                  return route.params.password
           }
        }
        return ""
     }
    const [userName,setName] = useState(getDetails("userName"))
    const [password,setPassword] = useState(getDetails("password"))
    // const [data, setData] = React.useState({
    //     username: '',
    //     password: '',
    //     confirm_password: '',
    //     check_textInputChange: false,
    //     secureTextEntry: true,
    //     confirm_secureTextEntry: true,
    // });
    
    const submitData = ()=>{
        fetch("http://10.0.2.2:3000/send-data",{
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              
                userName,
                password,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.userName} is saved successfuly`)
            navigation.navigate("Home")
        })
        .catch(err=>{
          Alert.alert("someting went wrong")
      })
  }
    // const updateDetails = ()=>{
    //     fetch("http://10.0.2.2:3000/update",{
    //         method:"post",
    //         headers:{
    //         'Content-Type': 'application/json'
    //         },
    //         body:JSON.stringify({
    //             id:route.params._id,
    //             userName,
    //             password,
    //         })
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         Alert.alert(`${data.userName} is updated successfuly`)
    //         navigation.navigate("Home")
    //     })
    //     .catch(err=>{
    //     Alert.alert("someting went wrong")
    // })
    // }
    // const textInputChange = (val) => {
    //     if( val.length !== 0 ) {
    //         setData({
    //             ...data,
    //             username: val,
    //             check_textInputChange: true
    //         });
    //     } else {
    //         setData({
    //             ...data,
    //             username: val,
    //             check_textInputChange: false
    //         });
    //     }
    // }

    // const handlePasswordChange = (val) => {
    //     setData({
    //         ...data,
    //         password: val
    //     });
    // }

    // const handleConfirmPasswordChange = (val) => {
    //     setData({
    //         ...data,
    //         confirm_password: val
    //     });
    // }

    // const updateSecureTextEntry = () => {
    //     setData({
    //         ...data,
    //         secureTextEntry: !data.secureTextEntry
    //     });
    // }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#4AB19D' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={userName}
                    onFocus={()=>setenableShift(false)}
                    onChangeText={text => setName(text)}
                    // onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={password}
                    onFocus={()=>setenableShift(false)}
                    onChangeText={text => setPassword(text)}
                    // onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={password}
                    onFocus={()=>setenableShift(false)}
                    onChangeText={text => setPassword(text)}
                    // onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    // onPress={() => {}}
                    onPress={() => submitData()}
                >
                <LinearGradient
                    colors={['#4AB19D', '#191970']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#4AB19D',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#4AB19D'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });

