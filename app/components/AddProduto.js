// Importa o hook de navegação do Expo Router
import { useRouter } from 'expo-router';
// Importa componentes de UI do React Native
import { Text, TouchableOpacity } from 'react-native';
// Importa o arquivo de estilos personalizados
import Styles from './Styles';

// Componente que exibe um botão para navegar até a tela de adicionar produto
export default function AddProduto() {
  // Hook para manipular a navegação entre telas
  const router = useRouter();

  return (
    // Botão estilizado que, ao ser pressionado, leva o usuário para a rota de adicionar produto
    <TouchableOpacity
      style={Styles.button}
      onPress={() => router.push('tabs/Adicionarproduto')} // Caminho para a rota
    >
      <Text style={Styles.buttonText}>Adicionar Produto</Text>
    </TouchableOpacity>
  );
}

