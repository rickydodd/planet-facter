"use client";

import React from "react";
import Image from "next/image";
import { TabButton, TabContent } from "../components/Tabs.tsx";

const initialState = {
  data: [],
  position: null,
  activeTab: "overview",
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_data":
      return {
        ...state,
        data: action.data,
        position: action.data.length > 0 ? 0 : null,
      };
    case "set_position":
      if (action.position < 0 || action.position >= state.data.length) {
        throw new Error(
          `'position' variable out of bounds. Expected: '0' to '${state.data.length - 1}' inclusive, got: '${action.position}'`,
        );
      }
    case "set_position":
      if (action.position < 0 || action.position >= state.data.length) {
        throw new Error(
          `'position' variable out of bounds. Expected: '0' to '${state.data.length - 1}' inclusive, got: '${action.position}'`,
        );
      }

      return {
        ...state,
        position: action.position,
        activeTab: "overview",
      };
    case "set_active_tab":
      return {
        ...state,
        activeTab: action.activeTab,
      };
    case "set_loaded":
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error(
        `Unexpected type passed to dispatch. Received: ${action.type}`,
      );
  }
};

export default function Home() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    fetch(process.cwd() + "data.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "set_data", data });
        dispatch({ type: "set_loaded" });
      });
  }, []);

  const handleSetPosition = (positionNumber) => {
    dispatch({ type: "set_position", position: positionNumber });
  };

  const handleTabClick = (e) => {
    dispatch({ type: "set_active_tab", activeTab: e.target.value });
  };

  return state.loading ? null : (
    <>
      <header>
        <h1>Planet Facter</h1>
        <div role="navigation" aria-label="Planets">
          <ul>
            {state.data.map((planet, id) => {
              return (
                <li key={id}>
                  <button onClick={() => handleSetPosition(id)}>
                    {planet.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
      <div>
        <TabButton
          activeTab={state.activeTab}
          onClick={handleTabClick}
          value="overview"
        >
          Overview
        </TabButton>
        <TabButton
          activeTab={state.activeTab}
          onClick={handleTabClick}
          value="structure"
        >
          Structure
        </TabButton>
        <TabButton
          activeTab={state.activeTab}
          onClick={handleTabClick}
          value="geology"
        >
          Surface
        </TabButton>
        <TabContent
          activeTab={state.activeTab}
          className="px-6"
          value="overview"
        >
          <Image
            src={state.data[state.position].images.planet}
            width={582}
            height={582}
            alt={`The planet ${state.data[state.position].name}`}
          />
          <h2>{state.data[state.position].name}</h2>
          <p>{state.data[state.position].overview.content}</p>
          <p>
            Source:{" "}
            <a href={`${state.data[state.position].overview.source}`}>
              Wikipedia
            </a>
          </p>
        </TabContent>
        <TabContent
          activeTab={state.activeTab}
          className="px-6"
          value="structure"
        >
          <Image
            src={state.data[state.position].images.internal}
            width={582}
            height={582}
            alt={`The internal structure of the planet ${state.data[state.position].name}`}
          />
          <h2>{state.data[state.position].name}</h2>
          <p>{state.data[state.position].structure.content}</p>
          <p>
            Source:{" "}
            <a href={`${state.data[state.position].structure.source}`}>
              Wikipedia
            </a>
          </p>
        </TabContent>
        <TabContent
          activeTab={state.activeTab}
          className="px-6"
          value="geology"
        >
          <Image
            src={state.data[state.position].images.planet}
            width={582}
            height={582}
            alt={`The planet ${state.data[state.position].name}`}
          />
          <Image
            src={state.data[state.position].images.geology}
            width={326}
            height={398}
            alt={`The geology of the planet ${state.data[state.position].name}`}
          />
          <h2>{state.data[state.position].name}</h2>
          <p>{state.data[state.position].geology.content}</p>
          <p>
            Source:{" "}
            <a href={`${state.data[state.position].geology.source}`}>
              Wikipedia
            </a>
          </p>
        </TabContent>
      </div>
      <div className="flex flex-col gap-2 px-6 uppercase md:flex-row md:gap-3 md:justify-between md:px-10 xl:gap-8 xl:px-40">
        <div className="border border-gray-800 flex items-center justify-between p-6 md:flex-1 md:flex-col md:gap-y-1.5 md:items-start xl:gap-y-1">
          <p className="font-bold h-min text-gray-500 text-xs">Rotation time</p>
          <p className="font-antonio font-medium text-xl md:text-2xl">
            {state.data[state.position].rotation}
          </p>
        </div>
        <div className="border border-gray-800 flex items-center justify-between p-6 md:flex-1 md:flex-col md:gap-y-1.5 md:items-start xl:gap-y-1">
          <p className="font-bold h-min text-gray-500 text-xs">
            Revolution time
          </p>
          <p className="font-antonio font-medium text-xl md:text-2xl">
            {state.data[state.position].revolution}
          </p>
        </div>
        <div className="border border-gray-800 flex items-center justify-between p-6 md:flex-1 md:flex-col md:gap-y-1.5 md:items-start xl:gap-y-1">
          <p className="font-bold h-min text-gray-500 text-xs">Radius</p>
          <p className="font-antonio font-medium text-xl md:text-2xl">
            {state.data[state.position].radius}
          </p>
        </div>
        <div className="border border-gray-800 flex items-center justify-between p-6 md:flex-1 md:flex-col md:gap-y-1.5 md:items-start xl:gap-y-1">
          <p className="font-bold h-min text-gray-500 text-xs">Average temp.</p>
          <p className="font-antonio font-medium text-xl md:text-2xl">
            {state.data[state.position].temperature}
          </p>
        </div>
      </div>
    </>
  );
}
