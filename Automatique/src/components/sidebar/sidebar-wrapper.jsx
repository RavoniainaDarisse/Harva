import SmartSidebar from "./smart-sidebar"
import { useState } from "react"

// Composant wrapper ultra-simple pour utilisation facile
export default function SidebarWrapper({
  children,
  sidebarItems,
  onSettingsClick,
  onProfileClick,
  brandIcon,
  brandColor,
  className = "",
}) {
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  const toggleToolbar = () => {
    setIsToolbarOpen(!isToolbarOpen);
  };

  return (
    <div className={`fixed inset-0 bg-[#252525] ${className}`}>
      <SmartSidebar
        items={sidebarItems}
        onSettingsClick={onSettingsClick}
        onProfileClick={onProfileClick}
        brandIcon={brandIcon}
        brandColor={brandColor}
        isToolbarOpen={isToolbarOpen}
        onToggleToolbar={toggleToolbar}
      />
      
      {/* Zone de contenu principal */}
      <div 
        className="fixed top-0 bottom-0 right-0 bg-[#252525] transition-all duration-300 ease-out overflow-auto"
        style={{
          left: isToolbarOpen ? '320px' : '64px' // 256px (toolbar) + 64px (sidebar) ou juste 64px (sidebar)
        }}
      >
        <main className="pt-5 h-full">{children}</main>
      </div>
    </div>
  )
}