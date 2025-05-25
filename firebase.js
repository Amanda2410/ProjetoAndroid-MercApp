// Importa a função initializeApp da SDK do Firebase para inicializar o app
import { initializeApp } from 'firebase/app';
// Importa a função getFirestore para acessar o banco de dados Firestore
import { getFirestore } from 'firebase/firestore';
// Importa a configuração do Firebase (as credenciais do seu projeto Firebase)
import { firebaseConfig } from './firebaseConfig';
// Inicializa o aplicativo Firebase com as configurações fornecidas
const app = initializeApp(firebaseConfig);
// Conecta o aplicativo ao banco de dados Firestore usando o app inicializado
const db = getFirestore(app);
// Exporta o objeto `db`, que representa a conexão com o Firestore
// Esse `db` será usado em outras partes do app para adicionar, ler, editar e deletar dados
export { db };
