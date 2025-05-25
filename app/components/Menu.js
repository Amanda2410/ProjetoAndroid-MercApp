// Importa os componentes básicos de layout e interação do React Native
import { View, Text, TouchableOpacity } from 'react-native';
// Importa o hook de navegação do Expo Router
import { useRouter } from 'expo-router';
// Importa os estilos personalizados do projeto
import Styles from './Styles';

// Componente de menu lateral que aparece como um modal
export default function Menu({ fecharMenu }) {
  // Hook que permite navegação entre as páginas
  const router = useRouter();

  // Função que fecha o menu e navega para a rota desejada
  const navegar = (rota) => {
    fecharMenu();               // Fecha o menu (modal)
    router.push(`/tabs/${rota}`); // Navega para a rota dentro de /tabs
  };

  return (
    <View style={Styles.menuContainer}>
      {/* Cada opção de menu chama a função navegar com o nome da rota */}
      <TouchableOpacity onPress={() => navegar('Estoque')}>
        <Text style={Styles.menuItem}>Estoque</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navegar('Baixoestoque')}>
        <Text style={Styles.menuItem}>Baixo Estoque</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navegar('Promocoes')}>
        <Text style={Styles.menuItem}>Promoções</Text>
      </TouchableOpacity>
    </View>
  );
}
