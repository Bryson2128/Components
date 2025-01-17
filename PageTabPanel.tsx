interface PageTabPanelProps {
    id: string;
    activeTab: string;
    children: React.ReactNode;
  }
  
  export const PageTabPanel: React.FC<PageTabPanelProps> = ({ id, activeTab, children }) => {
    return activeTab === id ? <div>{children}</div> : null;
  };
  