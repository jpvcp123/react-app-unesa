import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView  } from 'react-native';
import { getAllUsers, insertUser } from '../../database/database'


const Register = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirm, setSenhaConfirm] = useState('');

  const registryUser = async () => {
    if (nome.trim() === '' || senha.trim() === '' || senhaConfirm.trim() === '') {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }
    if(senha.length < 5 ){
      Alert.alert('Por favor, senha maior do que 3 caracteres.');
      return;
    }
    try {
      await tryCreateUser(nome, senha, senhaConfirm)
      
      Alert.alert('Cadastrado com sucesso!');
      navigation.navigate('Home')
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const tryCreateUser = async (username, password, repassword) => {
    if (password !== repassword){
      throw new Error('As senhas não são iguais');
    }

    var users = await getAllUsers()
    var existsUser = users.find(user => user.name === username);

    if (existsUser) {
      throw new Error('Já existe um usuário com esse nome');
    }
    await insertUser(username, senha)
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image style={styles.logo} source={require('./registerImage.png')} />
      <View style={styles.inputwrap}>
        <TextInput
          onChangeText={text => setNome(text)}
          value={nome}
          style={styles.input}
          placeholder="Seu Nome"
          placeholderTextColor='#F7F4E4'
        />
        <TextInput
          onChangeText={text => setSenha(text)}
          value={senha}
          secureTextEntry={true}
          passwordRules='true'
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor='#F7F4E4'
          minlength="5"
          
        />
        <TextInput
          onChangeText={text => setSenhaConfirm(text)}
          value={senhaConfirm}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor='#F7F4E4'
          minlength="5"
        />
      </View>
      <TouchableOpacity onPress={registryUser} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
    height: 280,
  },
  inputwrap: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    width: 350,
    padding: 20,
    margin: 10,
    color: '#F7F4E4',
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FF8C00',
    width: 200,
    padding: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#F7F4E4',
    fontSize: 16,
  }
});

export default Register;
