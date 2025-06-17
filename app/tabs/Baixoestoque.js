export const drawerLabel = 'Baixo Estoque';

import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'; //utilizado para buscar e excluir produtos
import React, { useEffect, useState } from 'react'; //Utiliad para gerenciar o ciclo de vida e estado dos produtos
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../../firebase';
import Styles from '../components/Styles';

export default function BaixoEstoque() {
  const [produtos, setProdutos] = useState([]);//guarda todos os produtos do firestore
  const [busca, setBusca] = useState('');//texto digitado no campo de busca

  // Limite para considerar "baixo estoque"
  const LIMITE_ESTOQUE = 5;//define um valor de limite para alerta de baixo estouqe

  async function carregarProdutos() {
    try {
      const snapshot = await getDocs(collection(db, 'produtos'));//le todos os produtos listados do Firestore
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));//transforma cada documento em um objeto com id e dados
      setProdutos(lista);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []); //Carrega os produtos do banco de dados assim que o componente for exibido

  // Filtra produtos com estoque baixo e pela busca
  function filtrarProdutos() {
    return produtos.filter(produto =>
      produto.quantidade <= LIMITE_ESTOQUE &&
      produto.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }
  //Só mostra os produtos com o limite estabelecido, ou seja produtos com quantidade igual ou inferior a quantidade estabelecida
  //Também aplica o filtro de busca por nome, não diferenciando letras maiúsculas de letras minúsculas.

  async function excluirProduto(id) {
    try {
      await deleteDoc(doc(db, 'produtos', id));
      carregarProdutos();
      
      //Remove o produto com id passado do Firestore, após a exclusão é atualizado a lista

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível excluir o produto.');
    }
  }
  //Informa o erro caso a tratativa a cima esteja incorreta, ou não encontre os parâmetros para execução 

  const renderItem = ({ item }) => (
    <View style={[Styles.card, { backgroundColor: '#FF4136' }]}>
      <Text style={Styles.cardText}>{item.nome}</Text>
      <Text style={Styles.cardText}>Código: {item.codigo}</Text>
      <Text style={Styles.cardText}>Validade: {item.validade}</Text>
      <Text style={Styles.cardText}>Quantidade: {item.quantidade}</Text>
      <Text style={Styles.cardText}>Valor: R$ {item.valorUnitario?.toFixed(2)}</Text>

      <TouchableOpacity
        style={[Styles.button, { marginTop: 10, backgroundColor: 'red' }]}
        onPress={() => excluirProduto(item.id)}
      >
        <Text style={Styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  //Exibe os dados do produto como (Nome, validade, valor,etc).]
  //Para excluir um produto é utilizado o botão excluirProduto

  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.input}
        placeholder="Buscar produto com baixo estoque"
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={filtrarProdutos()}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhum produto com baixo estoque encontrado.
          </Text>
        }
      />
    </View>
  );
}
//O campo de busca atualializa o estado de busca
//FlatList renderiza a lista filtrada.
//List?EmptyComponent é utilizado caso nenhum item esteja com baixo estoque