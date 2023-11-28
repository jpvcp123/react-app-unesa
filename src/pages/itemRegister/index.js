import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, FlatList } from 'react-native';
import { insertProduct } from '../../database/database';

const ItemRegister = ({ navigation }) => {
  const [tipoProduto, setTipoProduto] = useState('');
  const [produto, setProduto] = useState('');
  const [valor, setValor] = useState('');
  const [items, setItems] = useState([]);

  const cadastrar = async () => {
    if (tipoProduto.trim() === '' || produto.trim() === '' || valor.trim() === '') {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    if (typeof(valor) !== 'number') {
      var value;
      try {
        value = Number(valor);
      } catch (e){
        Alert.alert('Por favor, preencha o campo valor com um número.');
        return;
      }
    }

    const newItem = {
      id: String(Math.random()),
      tipoProduto,
      produto,
      valor,
    };

    await insertProduct(tipoProduto, produto, value)
    setItems([...items, newItem]);
    setTipoProduto('');
    setProduto('');
    setValor('');
    navigation.navigate('Page')
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image style={styles.logo} source={require('./itemRegisterImage.png')} />
      <View style={styles.inputwrap}>
        <TextInput
          onChangeText={(text) => setTipoProduto(text)}
          value={tipoProduto}
          style={styles.input}
          placeholder="Tipo Do Produto"
          placeholderTextColor="#F7F4E4"
        />
        <TextInput
          onChangeText={(text) => setProduto(text)}
          value={produto}
          placeholderTextColor="#F7F4E4"
          style={styles.input}
          placeholder="Produto"
        />
        <TextInput
          onChangeText={(text) => setValor(text)}
          value={valor}
          style={styles.input}
          placeholder="Valor"
          placeholderTextColor="#F7F4E4"
        />
      </View>
      <TouchableOpacity onPress={cadastrar} style={styles.button}>
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
    height: 250,
  },
  inputwrap: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 40,
  },
  input: {
    textAlign: 'center',
    backgroundColor: '#FFA500',
    borderRadius: 8,
    width: 350,
    color: '#F7F4E4',
    padding: 20,
    margin: 10,
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
  heading: {
    color: '#FF8C00',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  itemInfo: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    padding: 10,
  },
  deleteButtonText: {
    color: '#F7F4E4',
  },
});

export default ItemRegister;
