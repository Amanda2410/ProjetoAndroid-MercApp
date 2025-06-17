// Importa o React e o hook useState para controle de estado
import React, { useState } from 'react';
// Importa componentes básicos do React Native
import { Text, View, TouchableOpacity, Modal } from 'react-native';
// Importa ícones da biblioteca Ionicons (do pacote expo)
import { Ionicons } from '@expo/vector-icons';
// Importa o componente que exibe o formulário de adicionar produtos
import AddProduto from '../components/AddProduto';
// Importa os estilos personalizados definidos em outro arquivo
import Styles from '../components/Styles';
// Importa o componente que exibe os dados resumidos do dia
import VisaoGeral from '../components/VisaoGeral';
// Importa o componente do menu lateral
import Menu from '../components/Menu';

// Função principal do componente, que representa a tela inicial (Dashboard)
export default function Dashboard() {
  // Cria um estado para controlar a visibilidade do menu lateral (modal)
  const [menuVisivel, setMenuVisivel] = useState(false);

  // Função para abrir o menu (define menuVisivel como true)
  const abrirMenu = () => setMenuVisivel(true);
  // Função para fechar o menu (define menuVisivel como false)
  const fecharMenu = () => setMenuVisivel(false);

  // Retorno que representa o layout da tela
  return (
    <View style={Styles.container}>
      {/* Botão com ícone de menu no canto superior direito */}
      <TouchableOpacity onPress={abrirMenu} style={{ position: 'absolute', top: 20, right: 20, zIndex: 1 }}>
        <Ionicons name="menu" size={38} color="white" />
      </TouchableOpacity>

      {/* Título da tela */}
      <Text style={Styles.title}>RESUMO DO DIA</Text>

      {/* Componente que mostra o resumo das informações (ex: vendas, alertas) */}
      <VisaoGeral />

      {/* Componente com botão para adicionar produtos */}
      <AddProduto />

      {/* Modal que mostra o menu lateral quando menuVisivel for true */}
      <Modal transparent visible={menuVisivel} animationType="slide">
        {/* Área clicável para fechar o menu quando o usuário tocar fora */}
        <TouchableOpacity style={{ flex: 1 }} onPress={fecharMenu}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
            {/* Componente do menu em si */}
            <Menu fecharMenu={fecharMenu} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
