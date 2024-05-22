import { useState } from "react";

export const UnderlinedTabs = ({ tabs }) => {
  const [openTab, setOpenTab] = useState(0);
  return (
    <div className="rounded-lg border border-gray-400 dark:border-gray-700">
      <div className="flex flex-wrap border-b border-gray-400 dark:border-gray-700 -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {tabs.map((tab, key) => (
          <div key={key} className="inline-flex items-center justify-center p-4">
            <button
              id={`#tab-button-${key}`}
              onClick={() => {
                setOpenTab(tab.index);
              }}
              className={
                openTab === tab.index
                  ? "text-blue-600 border-b-2 border-blue-600 dark:border-blue-500 rounded-t-lg active dark:text-blue-500 group"
                  : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
              }
              type="button">
              {tab.icon ? tab.icon : null}
              {tab.title}
            </button>
          </div>
        ))}
      </div>
      {tabs.map((tab, key) => (
        <div
          key={key}
          className={`tab-content ${openTab !== tab.index ? "hidden" : "block"
            }`}>
          {openTab === tab.index ? tab.content : null}
        </div>
      ))}
    </div>
  );
};