import React, { useEffect, useState } from 'react';
import { View, Text,ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { deleteProduct, getAllProducts } from '../../database/database';

const Page = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(false)
  const [products, setProducts] = useState([]);

  async function handleProducts() {
    setisLoading(true)
    const products = await getAllProducts();
    setProducts(products);
    setisLoading(true)
    setTimeout(() => {
      setisLoading(false)
    }, 500 )
    
  }

  async function removeProduct(id) {
    const newProducts = products.filter((product) => product.id !== id);
    await deleteProduct(id)
    setProducts(newProducts);
  }
  useEffect(() => {
   handleProducts()
    
  }, [navigation])

  return (
    <View>
      <Image style={styles.logo} source={require('./pageImage.png')} />
      <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate('ItemRegister')} style={styles.button}>
        <Text style={styles.buttonText}>Novo Item</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProducts} style={styles.button}>
        <Text style={styles.buttonText}>Recarregar</Text>
      </TouchableOpacity>

      </View>
      <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.cell}>Id</Text>
        <Text style={styles.cell}>Produto</Text>
        <Text style={styles.cell}>Tipo do produto</Text>
        <Text style={styles.cell}>Valor</Text>
      </View>
      <ScrollView onScroll={handleProducts} vertical={true}>
        { isLoading ? (<ActivityIndicator size="large" />) : ( products.map((product) => (
          <View key={product.id} style={styles.row}>
            <Text style={styles.cell}> {product.id} </Text>
            <Text style={styles.cell}> {product.product} </Text>
            <Text style={styles.cell}> {product.product_type} </Text>
            <Text style={styles.cell}> {product.value} </Text>

            <TouchableOpacity onPress={() => removeProduct(product.id)}>
              <Image source={require('./trashIcon.png')} style={styles.icon}/>
            </TouchableOpacity>
          </View>
        )))}
      </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
   
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 3,
    alignItems: 'center'
  },
  cell: {
    flex: 0.29,
    textAlign: 'center',
  },
  logo: {
    width: 500,
    height: 400,
    alignSelf: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FF8C00',
    width: 200,
    padding: 20,
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#F7F4E4',
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 27,
  },
 

});

export default Page;
