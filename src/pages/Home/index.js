import React from 'react';
// import  Icon  from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
const Home = ({navigation}) => {
    return(
        <View styles={styles.container}>
         <Image style={styles.logo} source={require('./imageLogo.png')}/>
         <Text style={styles.heading}>Olá, Seja Bem Vindo! Ao Cantinho Da Tapioca</Text>
         <View style={styles.buttonwrap}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
             <Text  style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button1}>
             <Text  style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.iconwrap}>
            <Icon name="instagram" size={35} color="#FF8C00" />
            <Icon name="whatsapp" size={35} color="#FFA500" />
            <Icon name="phone" size={35} color="#FFA500" />
         </View>

        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    flexDirection: 'column'
  },
  logo: {
    width: 400,
    height: 400,
  },
  heading: {
    textAlign: 'center',
    color: '#FFA500',
    fontWeight: '600',
    fontSize: 25,
    marginBottom: 30,
  },
  buttonwrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    padding: 20,
    width: 180,
    margin: 15,
    borderRadius: 8,    
  },
  button1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#FF8C00',
    padding: 20,
    width: 180,
    margin: 15, 
    borderRadius: 8,
  },
  buttonText: {
    color: '#F7F4E4',
    fontSize: 16,
  },
  iconwrap: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  }
  });
export default Home