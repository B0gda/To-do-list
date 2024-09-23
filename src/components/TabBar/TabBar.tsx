import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tab, TabsContainer } from "./TabBar.styles";

import { setTagFilter, TagType } from "@store/filterSlice";
import { RootState } from "@store/store";

const tabOptions: { label: string; value: TagType }[] = [
  { label: "Все 🗒️", value: "all" },
  { label: "Срочные 🔥", value: "fire" },
  { label: "Особенные ⭐", value: "star" },
  { label: "Рабочие 💼", value: "job" },
  { label: "Нет тега 🚫", value: "none" },
  { label: "Выполнено ✅", value: "done" },
];

export const TabBar: React.FC = () => {
  const dispatch = useDispatch();
  const currentTag = useSelector((state: RootState) => state.filter.tag);

  const handleTabClick = (tag: TagType) => {
    dispatch(setTagFilter(tag));
  };

  return (
    <TabsContainer>
      {tabOptions.map((tab) => (
        <Tab
          key={tab.value}
          isActive={currentTag === tab.value}
          onClick={() => handleTabClick(tab.value)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabsContainer>
  );
};
