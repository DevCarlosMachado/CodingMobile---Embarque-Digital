import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Filme = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const API_URL = "https://ghibliapi.vercel.app/films";

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");

  async function carregarFilmes() {
    try {
      const resposta = await fetch(API_URL);
      const dados: Filme[] = await resposta.json();
      setFilmes(dados);
    } catch (erro) {
      console.log("Erro ao carregar filmes:", erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarFilmes();
  }, []);

  const filmesFiltrados = filmes.filter((filme) =>
    filme.title.toLowerCase().includes(busca.toLowerCase())
  );

  if (carregando) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.textoMuted}>Carregando filmes...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>🎬 Filmes do Studio Ghibli</Text>

      <TextInput
        placeholder="Buscar filme..."
        style={styles.campoBusca}
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={filmesFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.poster} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitulo}>{item.title}</Text>
              <Text numberOfLines={3} style={styles.cardDescricao}>
                {item.description}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.textoMuted}>Nenhum filme encontrado.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  textoMuted: { marginTop: 8, color: "#777" },

  titulo: {
    fontSize: 22,
    fontWeight: "700",
    margin: 16,
    textAlign: "center",
  },

  campoBusca: {
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
  },

  card: {
    flexDirection: "row",
    padding: 12,
    margin: 12,
    backgroundColor: "#FFF",
    borderRadius: 12,
    elevation: 2,
    gap: 12,
  },

  poster: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: "#eee",
  },

  cardTitulo: { fontSize: 16, fontWeight: "700" },
  cardDescricao: { fontSize: 13, marginTop: 4, color: "#555" },
});
