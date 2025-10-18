import { useState, ReactNode } from "react";

// Tipos para o componente de Tabs
export interface TabConfig {
  id: string | number;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabConfig[];
  defaultActive?: string | number;
  className?: string;
  onTabChange?: (tabId: string | number) => void;
}

// Componente principal Tabs
export const Tabs = ({ tabs, defaultActive, className = "", onTabChange }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultActive || tabs[0]?.id);

  const handleTabClick = (tabId: string | number) => {
    if (tabs.find(tab => tab.id === tabId && !tab.disabled)) {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTabId = event.target.value;
    const tabId = tabs.find(tab => tab.title === selectedTabId)?.id;
    if (tabId) {
      handleTabClick(tabId);
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab);
  const activeTabTitle = tabs.find(tab => tab.id === activeTab)?.title || "";

  return (
    <div className={className}>
      {/* Select para mobile */}
      <div className="sm:hidden">
        <label htmlFor="tab-select" className="sr-only">Selecione uma aba</label>
        <select 
          id="tab-select"
          value={activeTabTitle}
          onChange={handleSelectChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {tabs.map(tab => (
            <option key={tab.id} value={tab.title} disabled={tab.disabled}>
              {tab.title}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de abas para desktop */}
      <ul className="hidden text-sm overflow-auto font-medium text-center text-gray-500 rounded-lg shadow-sm sm:flex " style={{ scrollBehavior: 'smooth', scrollbarColor: 'var(--corPrincipal) var(--base-color)' }}>
        {tabs.map((tab, index) => (
          <li key={tab.id} className="w-full focus-within:z-10">
            <button
              onClick={() => handleTabClick(tab.id)}
              disabled={tab.disabled}
              className={`
                inline-flex items-center justify-center w-full p-4 border-r border-[var(--base-variant)]
                focus:ring-4 focus:ring-transparent focus:outline-none transition-all
                ${index === 0 ? 'rounded-s-lg' : ''}
                ${index === tabs.length - 1 ? 'rounded-e-lg border-r-0' : ''}
                ${
                  tab.id === activeTab
                    ? "text-[var(--text-white)] bg-[var(--corPrincipal)]"
                    : "bg-[var(--base-color)] text-[var(--text-color)] hover:bg-[var(--corPrincipalHover)]"
                }
                ${tab.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
              `}
              aria-current={tab.id === activeTab ? "page" : undefined}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.title}
            </button>
          </li>
        ))}
      </ul>

      {/* Conteúdo da aba ativa */}
      <div className="mt-4">
        {activeTabContent?.content}
      </div>
    </div>
  );
};

export default Tabs;