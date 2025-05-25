// Define o rótulo do item no menu lateral 
export const drawerLabel = 'Estoque';

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, Modal} from 'react-native';
import { collection, getDocs, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { db } from '../../firebase'; // Importa a instância do Firestore
import Styles from '../components/Styles'; // Estilos personalizados

export default function Estoque() {
  // Estados para controle dos dados
  const [produtos, setProdutos] = useState([]); // Lista de produtos
  const [busca, setBusca] = useState(''); // Texto da barra de busca
  const [modalVisible, setModalVisible] = useState(false); // Visibilidade do modal
  const [produtoSelecionado, setProdutoSelecionado] = useState(null); // Produto sendo editado

  // Estados para os campos editáveis
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [validade, setValidade] = useState('');

  // Função que carrega os produtos do Firestore
  async function carregarProdutos() {
    const snapshot = await getDocs(collection(db, 'produtos'));
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProdutos(lista);
  }

  // Carrega os produtos assim que o componente é montado
  useEffect(() => {
    carregarProdutos();
  }, []);

  // Filtra produtos de acordo com o texto da busca
  function filtrarProdutos() {
    return produtos.filter(produto =>
      produto.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }

  // Abre o modal e preenche os campos com os dados do produto selecionado
  function abrirModal(produto) {
    setProdutoSelecionado(produto);
    setNome(produto.nome);
    setCodigo(String(produto.codigo)); // Converte a quantidade (número) para string, pois o TextInput espera uma string
    setQuantidade(String(produto.quantidade));
    setValorUnitario(String(produto.valorUnitario));
    setValidade(produto.validade);
    setModalVisible(true);
  }

  // Salva as alterações no Firebase
  async function salvarEdicao() {
    try {
      await updateDoc(doc(db, 'produtos', produtoSelecionado.id), {
        nome,
        codigo: Number(codigo),
        quantidade: Number(quantidade),
        valorUnitario: Number(valorUnitario),
        validade
      });
      setModalVisible(false);
      carregarProdutos(); // Atualiza a lista
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar o produto.');
    }
  }

  // Exclui o produto selecionado
  async function excluirProduto(id) {
    try {
      await deleteDoc(doc(db, 'produtos', id));
      carregarProdutos();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível excluir o produto.');
    }
  }

  // Renderiza cada item da lista (mostrar na tela)
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => abrirModal(item)} style={[Styles.card, { backgroundColor: '#0074D9' }]}>
      <Text style={Styles.cardText}>{item.nome}</Text>
      <Text style={Styles.cardText}>Código: {item.codigo}</Text>
      <Text style={Styles.cardText}>Validade: {item.validade}</Text>
      <Text style={Styles.cardText}>Quantidade: {item.quantidade}</Text>
      <Text style={Styles.cardText}>Valor: R$ {item.valorUnitario?.toFixed(2)}</Text>

      {/* Botão para excluir */}
      <TouchableOpacity
        style={[Styles.button, { marginTop: 10, backgroundColor: 'red' }]}
        onPress={() => excluirProduto(item.id)}
      >
        <Text style={Styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={Styles.container}>
      {/* Campo de busca */}
      <TextInput
        style={Styles.input}
        placeholder="Buscar produto"
        value={busca}
        onChangeText={setBusca}
      />

      {/* Lista de produtos */}
      <FlatList
        data={filtrarProdutos()}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      {/* Modal de edição */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={Styles.modalBackground}>
          <View style={Styles.modalContent}>
            <Text style={Styles.modalTitle}>Editar Produto</Text>

            {/* Campos editáveis */}
            <TextInput
              style={Styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={Styles.input}
              placeholder="Código"
              value={codigo}
              onChangeText={setCodigo}
            />
            <TextInput
              style={Styles.input}
              placeholder="Quantidade"
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />
            <TextInput
              style={Styles.input}
              placeholder="Valor Unitário"
              keyboardType="numeric"
              value={valorUnitario}
              onChangeText={setValorUnitario}
            />
            <TextInput
              style={Styles.input}
              placeholder="Validade"
              value={validade}
              onChangeText={setValidade}
            />

            {/* Botões de ação */}
            <TouchableOpacity style={Styles.button} onPress={salvarEdicao}>
              <Text style={Styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Styles.button, { backgroundColor: 'gray', marginTop: 10 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={Styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
