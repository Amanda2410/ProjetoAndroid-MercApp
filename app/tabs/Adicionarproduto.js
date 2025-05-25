// Importa React e o hook useState para gerenciar estados locais
import React, { useState } from 'react';
// Importa componentes básicos do React Native
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// Importa o roteador do Expo Router para navegação entre telas
import { useRouter } from 'expo-router';
// Importa os estilos personalizados
import Styles from '../components/Styles';
// Importa as funções do Firestore (banco de dados)
import { collection, addDoc } from 'firebase/firestore';
// Importa a referência ao banco de dados Firebase já configurado
import { db } from '../../firebase';

// Função principal do componente que exibe a tela de adicionar produto
export default function Adicionarproduto() {
  // Hook do roteador para navegação
  const router = useRouter();

  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [validade, setValidade] = useState('');

  // Função que será chamada ao clicar no botão de salvar
  const salvarProduto = async () => {
    // Verifica se todos os campos foram preenchidos
    if (!nome || !codigo || !quantidade || !valorUnitario || !validade) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      // Adiciona o produto na coleção "produtos" no Firestore
      await addDoc(collection(db, 'produtos'), {
        nome,
        codigo: Number(codigo),
        quantidade: Number(quantidade),
        valorUnitario: Number(valorUnitario),
        validade,
        criadoEm: new Date() // Adiciona a data de criação
      });

      // Exibe mensagem de sucesso
      Alert.alert('Sucesso', `Produto "${nome}" salvo!`);

      // Limpa os campos após o salvamento
      setNome('');
      setCodigo('');
      setQuantidade('');
      setValorUnitario('');
      setValidade('');
      router.back(); // Volta para a tela anterior
    } catch (error) {
      // Em caso de erro, exibe mensagem no console e alerta
      console.error('Erro ao salvar produto:', error);
      Alert.alert('Erro', 'Não foi possível salvar o produto.');
    }
  };

  // Retorno da tela com os inputs e o  botão
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Adicionar Produto</Text>

      {/* Campo para nome do produto */}
      <TextInput
        style={Styles.input}
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
      />

      {/* Campo para código do produto */}
      <TextInput
        style={Styles.input}
        placeholder="Código do produto"
        value={codigo}
        onChangeText={setCodigo}
        keyboardType="numeric"
      />

      {/* Campo para quantidade */}
      <TextInput
        style={Styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      {/* Campo para valor unitário */}
      <TextInput
        style={Styles.input}
        placeholder="Valor Unitário (ex: 10.50)"
        value={valorUnitario}
        onChangeText={setValorUnitario}
        keyboardType="decimal-pad"
      />

      {/* Campo para validade */}
      <TextInput
        style={Styles.input}
        placeholder="Validade (ex: 12/12/2025)"
        value={validade}
        onChangeText={setValidade}
      />

      {/* Botão de salvar */}
      <TouchableOpacity style={Styles.button} onPress={salvarProduto}>
        <Text style={Styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
