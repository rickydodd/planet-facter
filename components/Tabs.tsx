export function TabButton({ activeTab, children, onClick, value }) {
  if (activeTab === value) {
    return <button className="btn active">{children}</button>;
  }
  return (
    <button className="btn" onClick={onClick} value={value}>
      {children}
    </button>
  );
}

export function TabContent({ activeTab, children, className, value }) {
  return activeTab === value ? (
    <div className={className}>{children}</div>
  ) : null;
}
