import React, { useState } from "react";
import { Panel, PanelHeader, Button } from "@vkontakte/vkui";

export default function AddHabit({ id, onBack, onSave }) {
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("ежедневно");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const frequencies = ["ежедневно", "через день", "раз в неделю"];

  const handleSave = () => {
    if (!title) return;
    onSave({ title, frequency, startDate, history: {} });
  };

  return (
    <Panel id={id}>
      <PanelHeader>Добавить привычку</PanelHeader>
      <div style={{ padding: 16 }}>
        <input
          placeholder="Название привычки"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: 16, width: "100%", padding: 8 }}
        />
        <div style={{ marginBottom: 16 }}>
          <label>Частота: </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            {frequencies.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Дата начала: </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <Button onClick={handleSave} style={{ marginBottom: 8 }}>
          Сохранить
        </Button>
        <Button onClick={onBack}>Отмена</Button>
      </div>
    </Panel>
  );
}
