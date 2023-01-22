import { useState, useEffect } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { api } from "../lib/axios";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/Progress.Bar";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";

interface Params {
  date: string;
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const route = useRoute()
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  async function fatchHabits() {
    try {
      setLoading(true);

      const response = await api.get('/day', { params: { date }});
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos')
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fatchHabits();
  }, []);

  if(loading) {
    <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={50} />

        <View className="mt-6">
          <Checkbox 
            title="Atualização do S.O"
            checked={false}
          />

          <Checkbox 
            title="Academia"
            checked
          />
        </View>
      </ScrollView>
    </View>
  )
}