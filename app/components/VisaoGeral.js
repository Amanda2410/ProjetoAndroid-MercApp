// Componente que mostra a visão geral do dia: vendas e alertas
import React from 'react';
import { Text, View } from 'react-native';
import Styles from './Styles'; // importa os estilos

export default function VisaoGeral() {
  return (
    <View style={Styles.card}>
      <Text style={Styles.cardTitle}>Itens próximos da validade</Text>
      <Text style={Styles.cardText}>3 itens</Text>

      <Text style={Styles.cardTitle}>Alertas de Estoque</Text>
      <Text style={Styles.cardText}>3 produtos com estoque baixo</Text>
    </View>
  );
}
