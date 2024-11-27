"use client";

import React from "react";
import Image from "next/image";
import { TabButton, TabContent } from "../components/Tabs.tsx";

const initialState = {
  data: [],
  position: null,
  activeTab: "overview",
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
      });
  }, []);

  const handleSetPosition = (positionNumber) => {
    dispatch({ type: "set_position", position: positionNumber });
  };

  const handleTabClick = (e) => {
    dispatch({ type: "set_active_tab", activeTab: e.target.value });
  };

  return (
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
        <TabContent activeTab={state.activeTab} value="overview">
          {state.position === null ? null : (
            <>
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
            </>
          )}
        </TabContent>
        <TabContent activeTab={state.activeTab} value="structure">
          {state.position === null ? null : (
            <>
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
            </>
          )}
        </TabContent>
        <TabContent activeTab={state.activeTab} value="geology">
          {state.position === null ? null : (
            <>
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
            </>
          )}
        </TabContent>
      </div>
    </>
  );
}
