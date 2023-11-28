import React, { useState } from 'react';
import { getAllUsers } from '../../database/database';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';

const Register = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');


  const tryLogin = async (username, password) => {
    var users = await getAllUsers()
    var existsUser = users.find(user => user.name === username);
    if (!existsUser) {
      throw new Error('Este usuário não existe');
    }

    if (existsUser && existsUser.password !== password) {
      throw new Error('Usuário ou senha incorretos');
    }
  }


  const login = async () => {
    if (nome.trim() === '' || senha.trim() === '') {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await tryLogin(nome, senha)

      Alert.alert('Logado com sucesso!');
      await new Promise((resolve) => setTimeout(resolve, 2000)); ///REQ AQ DANILO NOOB
      navigation.navigate('Page');
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image style={styles.logo} source={require('./loginImage.png')} />
      <View style={styles.inputwrap}>
        <View style={styles.inputContainer}>
          <Image source={require('./userIcon.png')} style={styles.icon} />
          <TextInput
            style={styles.input1}
            placeholder="Seu Nome"
            placeholderTextColor="#F7F4E4"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('./lockIcon.png')} style={styles.icon} />
          <TextInput
            secureTextEntry={true}
            style={styles.input1}
            placeholder="Senha"
            placeholderTextColor="#F7F4E4"
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
        </View>
      </View>
      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 400,
    height: 300,
  },
  inputwrap: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    borderRadius: 8,
    width: 350,
    padding: 20,
    margin: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  input1: {
    flex: 1,
    color: '#F7F4E4',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FF8C00',
    width: 200,
    padding: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#F7F4E4',
    fontSize: 16,
  },
});

export default Register;
