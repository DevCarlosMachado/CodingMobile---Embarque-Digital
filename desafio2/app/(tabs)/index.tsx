import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";

import {
  Provider as PaperProvider,
  Appbar,
  Card,
  Text,
  Button,
  List,
  MD3LightTheme,
} from "react-native-paper";

import {
  NavigationContainer,
  DrawerActions,
} from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* ---------------------- TIPAGEM ------------------------ */

type PokemonItem = {
  name: string;
  url: string;
};

type PokemonDetalhe = {
  name: string;
  sprites: { front_default: string };
  height: number;
  weight: number;
};

/* ---------------------- NAVEGAÇÃO ------------------------ */

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Header({ title, navigation }: any) {
  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.Action
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

/* ---------------------- TELAS ------------------------ */

function ListaPokemonsScreen({ navigation }: any) {
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    try {
      const r = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const dados = await r.json();
      setPokemons(dados.results);
    } catch (e) {
      console.log("Erro ao carregar:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando Pokémons...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.name}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <Card
          style={{ marginBottom: 12 }}
          onPress={() =>
            navigation.navigate("DetalhesPokemon", { url: item.url })
          }
        >
          <Card.Title
            title={item.name.toUpperCase()}
            left={(p) => <List.Icon {...p} icon="pokeball" />}
          />
        </Card>
      )}
    />
  );
}

function DetalhesPokemonScreen({ route, navigation }: any) {
  const { url } = route.params;
  const [pokemon, setPokemon] = useState<PokemonDetalhe | null>(null);

  async function carregarDetalhes() {
    const r = await fetch(url);
    const d = await r.json();
    setPokemon(d);
  }

  useEffect(() => {
    carregarDetalhes();
  }, []);

  if (!pokemon) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando detalhes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Card>
        <Card.Title title={pokemon.name.toUpperCase()} />
        <Card.Content>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={{ width: 120, height: 120, alignSelf: "center" }}
          />
          <Text>Altura: {pokemon.height}</Text>
          <Text>Peso: {pokemon.weight}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.goBack()}>Voltar</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

function SobreScreen() {
  return (
    <View style={styles.screen}>
      <Card>
        <Card.Title title="Sobre o App" />
        <Card.Content>
          <Text>
            App criado para o Desafio 2: React Native + Paper + Navegação +
            API Pública.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

/* ---------------------- ÁREA PRINCIPAL COM STACK ------------------------ */

function AreaPrincipal({ navigation }: any) {
  return (
    <>
      <Header title="Pokémons" navigation={navigation} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ListaPokemons" component={ListaPokemonsScreen} />
        <Stack.Screen
          name="DetalhesPokemon"
          component={DetalhesPokemonScreen}
        />
      </Stack.Navigator>
    </>
  );
}

/* ---------------------- APP ROOT ------------------------ */

const tema = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#E53935",
  },
};

export default function App() {
  return (
    <PaperProvider theme={tema}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: "#E53935",
          }}
        >
          <Drawer.Screen
            name="Pokémons"
            component={AreaPrincipal}
            options={{
              drawerIcon: ({ color }) => (
                <List.Icon icon="pokeball" color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="Sobre"
            component={SobreScreen}
            options={{
              drawerIcon: ({ color }) => (
                <List.Icon icon="information-outline" color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

/* ---------------------- ESTILOS ------------------------ */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FAFAFA",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});
