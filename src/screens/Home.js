// src/screens/Home.js
import React from "react";
import { Panel, PanelHeader, Group, Cell, Button, Div } from "@vkontakte/vkui";

export default function Home({ id, habits, onOpenHabit, onAddHabit }) {
  return (
    <Panel id={id}>
      <PanelHeader>Мой трекер привычек</PanelHeader>

      {habits.length === 0 ? (
        <Div style={{ textAlign: "center", marginTop: 40 }}>
          <p>Здесь пока ничего нет 🙂</p>
        </Div>
      ) : (
        <Group>
          {habits.map((habit) => (
            <Cell
              key={habit.id}
              after={
                <Button size="s" onClick={() => onOpenHabit(habit.id)}>
                  Открыть
                </Button>
              }
            >
              {habit.title}
            </Cell>
          ))}
        </Group>
      )}

      <Button onClick={onAddHabit} style={{ margin: "16px" }}>
        Добавить привычку
      </Button>
    </Panel>
  );
}
