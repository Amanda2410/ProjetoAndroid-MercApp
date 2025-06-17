// Estilos compartilhados entre os componentes
import { StyleSheet } from 'react-native';

// Cores usadas no app
export const colors = {
  background: '#000000',      // fundo preto
  card: '#1E1E2F',            // cards com tom de azul escuro
  blue: '#5DA0FF',            // azul principal
  textLight: '#FFFFFF',       // textos claros (branco)
};

// Estilos exportados para os componentes
export default StyleSheet.create({
  container: {
    flex: 1,                          // ocupa toda a altura disponível
    backgroundColor: colors.background,
    paddingTop: 60,                   // espaço no topo
    paddingHorizontal: 20,            // espaçamento nas laterais
  },
  title: {
    fontSize: 24,
    color: colors.textLight,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,                 // cantos arredondados
    padding: 30,
    marginBottom: 20,
  },
  cardT: {
    backgroundColor: '#1f2937',
    borderRadius: 15,
    borderWidth: 2,         
    borderStyle: 'solid',   
    borderColor: '#facc15',
    padding: 15,
    marginBottom: 15,
  },
  cardtwo: {
    backgroundColor: '#1E1E2F',
    borderRadius: 15,
    borderWidth: 2,         
    borderStyle: 'solid',   
    borderColor: '#8B0000',
    padding: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  cardlyric: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5
  },
  carditem: {
    color: '#facc15',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardTitle: {
    color: colors.blue,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 15,
  },
  cardText: {
    color: colors.textLight,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#facc15',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',              // centraliza o botão
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 10,
  marginBottom: 15,
  fontSize: 16,
  },
  menuContainer: {
  position: 'absolute',
  top: 90,
  right: 0,
  width: 200,
  backgroundColor: '#003366',
  padding: 20,
  zIndex: 3,
  elevation: 5,
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  },
  menuItem: {
  color: 'white',
  fontSize: 18,
  marginBottom: 15,
  },
modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Transparência escura
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Área branca dentro do modal
  modalContent: {
    backgroundColor: '#1E1E2F',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },

  // Título do modal (ex: "Editar Produto")
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
  },
});


