// Define o rótulo do item no menu lateral
export const drawerLabel = 'Promoções';

import { differenceInDays } from 'date-fns'; // Importa função que calcula a diferença de dias entre duas datas
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { db } from '../../firebase';
import Styles from '../components/Styles';

// Componente principal que mostra os produtos em promoção
export default function Promocoes() {
  const [produtos, setProdutos] = useState([]);  // Estado para armazenar todos os produtos carregados do banco

  useEffect(() => {   // useEffect executa ao carregar o componente, apenas uma vez
    async function carregarProdutos() { // Função assíncrona para carregar produtos da coleção "produtos"
      const snapshot = await getDocs(collection(db, 'produtos'));  // Busca todos os documentos da coleção "produtos"
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));  // Converte os documentos em objetos e inclui o ID de cada produto
      setProdutos(lista);
    }

    carregarProdutos(); // Atualiza o estado com a lista de produtos
  }, []); // [] indica que só será executado na primeira vez

  // Verifica se o produto está próximo da validade (ex: 7 dias)
    function produtosComValidadeProxima() {
        const hoje = new Date(); // Pega a data de hoje
      
        return produtos.filter(produto => { // Filtra os produtos com validade dentro dos próximos 7 dias
          if (!produto.validade) return false; // Ignora se não tiver validade
      
          try {
            // Suporte a validade como string no formato "DD/MM/AAAA"
            const partes = produto.validade.split('/'); 
            const dataValidade = new Date(partes[2], partes[1] - 1, partes[0]); // Cria uma data válida no JavaScript (ano, mês-1, dia)
      
            const diasRestantes = differenceInDays(dataValidade, hoje);  // Calcula quantos dias faltam para vencer
            return diasRestantes >= 0 && diasRestantes <= 7;  // Retorna os produtos com validade entre hoje e 7 dias à frente
          } catch {
            return false; // Em caso de erro no formato da data
          }
        });
  }
  // Função para renderizar cada produto individual na lista    
  const renderItem = ({ item }) => (
    <View style={[Styles.card, { backgroundColor: '#FF851B' }]}>
      <Text style={Styles.cardText}>{item.nome}</Text>
      <Text style={Styles.cardText}>Código: {item.codigo}</Text>
      <Text style={Styles.cardText}>Validade: {item.validade}</Text>
      <Text style={Styles.cardText}>Quantidade: {item.quantidade}</Text>
      <Text style={Styles.cardText}>Valor: R$ {item.valorUnitario?.toFixed(2)}</Text>
    </View>
  );
  // Retorno da interface da tela de promoções
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Produtos em Promoção</Text>
     {/* Lista os produtos com validade próxima */}
      <FlatList
        data={produtosComValidadeProxima()} // Define os dados da lista
        keyExtractor={item => item.id} // Chave única para cada item
        renderItem={renderItem}  // Como renderizar cada item
        ListEmptyComponent={
          <Text style={Styles.cardText}>Nenhum produto próximo da validade.</Text> // Componente mostrado se não houver dados
        }
      />
    </View>
  );
}