// src/App.js
import React, { useState } from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./screens/Home";
import AddHabit from "./screens/AddHabit";
import Habit from "./screens/Habit";

export default function App() {
  const [habits, setHabits] = useState([]); // массив привычек
  const [activePanel, setActivePanel] = useState("home");
  const [selectedId, setSelectedId] = useState(null); // теперь используем id, а не индекс

  // Открыть экран отдельной привычки
  const openHabit = (id) => {
    setSelectedId(id);
    setActivePanel("habit");
  };

  // Добавить новую привычку
  const addHabit = (habit) => {
    const habitWithId = { ...habit, id: Date.now(), history: {} }; // уникальный id и пустая история
    setHabits([...habits, habitWithId]);
    setActivePanel("home");
  };

  // Переключение статуса дня в истории привычки
  const toggleDay = (dayStr) => {
    const habitsCopy = habits.map((h) => ({ ...h })); // создаём копию массива и объектов
    const habit = habitsCopy.find((h) => h.id === selectedId);
    if (!habit) return;

    habit.history[dayStr] =
      habit.history[dayStr] === "done"
        ? "missed"
        : habit.history[dayStr] === "missed"
        ? "skip"
        : habit.history[dayStr] === "skip"
        ? null
        : "done";

    setHabits(habitsCopy);
  };

  // Удаление привычки
  const deleteHabit = () => {
    setHabits(habits.filter((h) => h.id !== selectedId));
    setSelectedId(null);
    setActivePanel("home");
  };

  // Получить количество дней подряд
  const getStreak = () => {
    const habit = habits.find((h) => h.id === selectedId);
    if (!habit) return 0;

    let streak = 0;
    let today = new Date();
    while (habit.history[today.toISOString().slice(0, 10)] === "done") {
      streak++;
      today.setDate(today.getDate() - 1);
    }
    return streak;
  };

  const selectedHabit = habits.find((h) => h.id === selectedId);

  return (
    <View activePanel={activePanel}>
      {/* Главный экран */}
      <Home
        id="home"
        habits={habits}
        onOpenHabit={openHabit}
        onAddHabit={() => setActivePanel("addHabit")}
      />

      {/* Экран добавления привычки */}
      <AddHabit
        id="addHabit"
        onBack={() => setActivePanel("home")}
        onSave={addHabit}
      />

      {/* Экран отдельной привычки */}
      {selectedHabit && (
        <Habit
          id="habit"
          habit={selectedHabit}
          onBack={() => setActivePanel("home")}
          onToggleDay={toggleDay}
          onDelete={deleteHabit}
          getStreak={getStreak}
        />
      )}
    </View>
  );
}
