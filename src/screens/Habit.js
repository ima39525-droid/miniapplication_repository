import React from "react";
import { Panel, PanelHeader, Button } from "@vkontakte/vkui";
import { getMonthDays, isPlannedDay } from "../utils/calendar";

export default function Habit({
  id,
  habit,
  onBack,
  onToggleDay,
  onDelete,
  getStreak,
}) {
  if (!habit) return null;

  const today = new Date();
  const monthDays = getMonthDays(today.getFullYear(), today.getMonth());
  const monthName = today.toLocaleString("ru-RU", {
    month: "long",
    year: "numeric",
  });

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <Button size="s" onClick={onBack}>
            Назад
          </Button>
        }
      >
        {habit.title}
      </PanelHeader>
      <div style={{ padding: 16 }}>
        <p>
          <b>Частота:</b> {habit.frequency}
        </p>
        <p>
          <b>Статистика дней подряд:</b> {getStreak()}
        </p>
        <p>
          <b>{monthName}</b>
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {monthDays.map((day) => {
            const dayStr = day.toISOString().slice(0, 10);
            const status = habit.history[dayStr];
            const planned = isPlannedDay(habit, day);
            let bgColor = "lightgray";
            if (status === "done") bgColor = "green";
            else if (status === "missed") bgColor = "red";
            else if (status === "skip") bgColor = "gray";

            return (
              <div
                key={dayStr}
                onClick={() => onToggleDay(dayStr)}
                style={{
                  width: 30,
                  height: 30,
                  lineHeight: "30px",
                  textAlign: "center",
                  backgroundColor: bgColor,
                  cursor: "pointer",
                  borderRadius: 4,
                  border: planned ? "2px solid green" : "1px solid #ccc",
                }}
                title={dayStr}
              >
                {day.getDate()}
              </div>
            );
          })}
        </div>

        <Button onClick={onDelete} style={{ marginTop: 16 }} mode="destructive">
          Удалить привычку
        </Button>
      </div>
    </Panel>
  );
}
