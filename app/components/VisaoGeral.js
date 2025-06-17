import { differenceInDays } from 'date-fns';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { db } from '../../firebase';
import Styles from './Styles'; // importa os estilos


export default function VisaoGeral() {
  const [produtos, setProdutos] = useState([]);   // Estado para armazenar a lista de produtos do Firebase
  const [itensValidadeProxima, setItensValidadeProxima] = useState(0); // Estado para contar quantos produtos estão com a validade próxima (7 dias)
  const [itensEstoqueBaixo, setItensEstoqueBaixo] = useState(0);  // Estado para contar quantos produtos estão com estoque baixo (<= 5 unidades)

  useEffect(() => {   // useEffect executa ao carregar o componente pela primeira vez
    async function carregarDados() { // Função assíncrona para buscar dados do Firestore
      const snapshot = await getDocs(collection(db, 'produtos')); // Pega os documentos da coleção 'produtos'
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));  // Mapeia os dados para um array de objetos, com id + dados
      setProdutos(lista); // Armazena a lista no estado

      // Processar dados:
      const hoje = new Date();

      const validadeProxima = lista.filter(produto => { // Filtra produtos com validade dentro de 7 dias
        if (!produto.validade) return false; // Se não tiver validade, ignora
        try {
          const partes = produto.validade.split('/');  // Divide a string de validade (formato dd/mm/yyyy)
          const dataValidade = new Date(partes[2], partes[1] - 1, partes[0]);  // Cria um objeto Date com base na validade
          const dias = differenceInDays(dataValidade, hoje); // Calcula diferença de dias entre validade e hoje
          return dias >= 0 && dias <= 7;  // Se estiver entre 0 e 7 dias, é considerado como "próximo da validade"
        } catch {
          return false; // Se der erro (formato incorreto), ignora esse produto
        }
      });
      // Filtra produtos com quantidade menor ou igual a 5
      const estoqueBaixo = lista.filter(produto => produto.quantidade !== undefined && produto.quantidade <= 5);
      // Atualiza os estados com as contagens filtradas
      setItensValidadeProxima(validadeProxima.length);
      setItensEstoqueBaixo(estoqueBaixo.length);
    }

    carregarDados(); // Chama a função quando o componente for montado
  }, []);
  // Renderiza a parte visual do componente
  return (
    <View style={Styles.container}> 

    <View style={Styles.cardT}>
      <Text style={Styles.cardlyric}>⏰ Itens próximos da validade</Text>
      <Text style={Styles.carditem}>{itensValidadeProxima} item(ns)</Text>
      </View>
      
    <View style={Styles.cardtwo}>
      <Text style={Styles.cardlyric}>⚠️ Alertas de Estoque</Text>
      <Text style={Styles.carditem}>{itensEstoqueBaixo} produto(s) com estoque baixo</Text>
    </View>
    </View>
  );
}