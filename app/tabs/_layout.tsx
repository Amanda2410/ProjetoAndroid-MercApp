import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="Adicionarproduto" options={{ title: 'Adicionar Produto' }} />
    </Tabs>
  );
}
