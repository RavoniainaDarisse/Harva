import { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import {
	Home,
	FileText,
	MapPin,
	Settings,
	StickyNote,
	LayoutDashboard,
} from "lucide-react";

const defaultItems = [
	{
		id: "home",
		icon: Home,
		label: "Accueil",
		color: "",
		glowColor: "shadow-yellow-500/50",
		description:
			"Accédez au tableau de bord principal et aux informations générales",
		link: "/",
	},
	{
		id: "map",
		icon: MapPin,
		label: "Carte des zones",
		color: "",
		glowColor: "shadow-blue-500/50",
		description: "Visualisez la carte interactive des patients ou incidents",
		link: "/Map",
	},
	{
		id: "patientform",
		icon: FileText,
		label: "Formulaire Patient",
		color: "",
		glowColor: "shadow-green-500/50",
		description:
			"Ajoutez les informations et antécédents médicaux d’un patient",
		link: "/patientForm",
	},
	{
		id: "historique",
		icon: StickyNote,
		label: "Historique",
		color: "",
		glowColor: "shadow-purple-500/50",
		description:
			"Consultez l’historique des consultations et des enregistrements",
		link: "/historique",
	},
];

export default function SmartSidebar({
	items = defaultItems,
	className = "",
	onSettingsClick = () => console.log("Settings clicked"),
	onProfileClick = () => console.log("Profile clicked"),
	brandIcon = null,
	brandColor = "from-blue-500 to-purple-600",
	isToolbarOpen = false,
	onToggleToolbar = () => {},
}) {
	const [hoveredItem, setHoveredItem] = useState(null);
	const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
	const hoverTimeoutRef = useRef(null);

	const handleMouseEnter = (itemId, event) => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = null;
		}

		const rect = event.currentTarget.getBoundingClientRect();
		setHoverPosition({
			top: rect.top + rect.height / 2,
			left: rect.right + 20,
		});
		setHoveredItem(itemId);
	};

	const handleMouseLeave = () => {
		hoverTimeoutRef.current = setTimeout(() => {
			setHoveredItem(null);
		}, 100);
	};

	const handleCardMouseEnter = () => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = null;
		}
	};

	const handleCardMouseLeave = () => {
		setHoveredItem(null);
	};

	const hoveredItemData = items.find((item) => item.id === hoveredItem);

	return (
		<>
			{/* Toolbar fixe */}
			<div
				className={`
          fixed top-0 left-0 bottom-0 text-white transition-all duration-300 ease-in-out overflow-hidden z-40
          ${isToolbarOpen ? "w-[18vw] min-w-[200px]" : "w-0"}
        `}
			>
				<div>
					<Sidebar />
				</div>
			</div>

			{/* Sidebar fixe qui se déplace */}
			<div
				className={`fixed top-0 bottom-0 w-16 bg-[#FEFE90] backdrop-blur-xl border-r border-gray-700/50 shadow-2xl z-50 transition-all duration-300 ease-out ${className}`}
				style={{
					left: isToolbarOpen ? "18vw" : "0px",
				}}
			>
				<div className="flex flex-col h-full py-4">
					{/* Logo/Brand avec toggle */}
					<div className="flex items-center justify-center mb-8">
						<button
							onClick={onToggleToolbar}
							className=" group relative w-12 h-12 rounded-xl transition-all duration-500 ease-out
                      bg-[#444444]
                      border border-gray-700/30 hover:border-gray-600/50
                      flex items-center justify-center
                      transform hover:scale-125 hover:-translate-y-1
                      hover:shadow-2xl hover:shadow-black/50 text-white"
						>
							<LayoutDashboard className="w-6 h-6 mb-1" />
						</button>
					</div>

					{/* Navigation Icons */}
					<nav className="flex-1 px-2">
						<div className="space-y-3">
							{items.map((item, index) => {
								const IconComponent = item.icon;
								const isHovered = hoveredItem === item.id;
								return (
									<button
										key={item.id}
										className={`
                      group relative w-12 h-12 rounded-xl transition-all duration-500 ease-out
                      bg-[#444444]
                      border border-gray-700/30 hover:border-gray-600/50
                      flex items-center justify-center
                      transform hover:scale-125 hover:-translate-y-1
                      hover:shadow-2xl hover:shadow-black/50
                      ${
												isHovered
													? "scale-125 -translate-y-1 shadow-2xl shadow-black/50"
													: ""
											}
                    `}
										style={{
											animationDelay: `${index * 50}ms`,
										}}
										onMouseEnter={(e) => handleMouseEnter(item.id, e)}
										onMouseLeave={handleMouseLeave}
										onClick={item.onClick}
									>
										{/* Background glow effect */}
										<div
											className={`
                        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
                        transition-all duration-700 ease-out
                        ${item.color} blur-xl scale-150
                      `}
										/>

										{/* Icon container */}
										<div
											className={`
                        relative p-2 rounded-lg transition-all duration-500 ease-out
                        ${item.color} 
                        transform group-hover:scale-110 group-hover:rotate-3
                        shadow-lg group-hover:${item.glowColor} group-hover:shadow-xl
                      `}
										>
											<IconComponent
												className={`
                          w-4 h-4 text-white transition-all duration-300 ease-out
                          group-hover:drop-shadow-lg
                        `}
											/>
										</div>

										{/* Pulse effect */}
										<div
											className={`
                        absolute inset-0 rounded-xl border-2 border-white/20 
                        opacity-0 group-hover:opacity-100 group-hover:animate-ping
                        transition-opacity duration-300
                      `}
										/>

										{/* Active indicator */}
										<div
											className={`
                        absolute -right-1 -top-1 w-3 h-3 rounded-full 
                        opacity-0 group-hover:opacity-100 
                        transition-all duration-500 ease-out
                        transform scale-0 group-hover:scale-100
                        ${item.color} ${item.glowColor} shadow-lg
                        animate-pulse
                      `}
										/>

										{/* Ripple effect */}
										<div
											className={`
                        absolute inset-0 rounded-xl
                        opacity-0 group-hover:opacity-30
                        transition-all duration-700 ease-out
                        bg-gradient-to-r from-white/10 to-transparent
                        transform scale-0 group-hover:scale-150
                      `}
										/>
									</button>
								);
							})}
						</div>
					</nav>

					{/* Bottom Actions */}
					<div className="px-2 space-y-3">
						<Link
							to={"/"}
							className="group relative w-12 h-12 rounded-xl  bg-[#444444]
                      border border-gray-700/30 hover:border-gray-600/50 hover:bg-gray-700/50 transition-all duration-500 ease-out  flex items-center justify-center transform hover:scale-125 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-500/20"
						>
							<Settings className="w-5 h-5 text-gray-400 group-hover:text-white transition-all duration-300 ease-out group-hover:rotate-90 group-hover:drop-shadow-lg" />
							<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform scale-0 group-hover:scale-150" />
						</Link>
					</div>
				</div>
			</div>

			{/* Hover Card */}
			{hoveredItem && hoveredItemData && (
				<div
					className="fixed z-[100]"
					style={{
						top: `${hoverPosition.top}px`,
						left: `${hoverPosition.left}px`,
						transform: "translateY(-50%)",
					}}
					onMouseEnter={handleCardMouseEnter}
					onMouseLeave={handleCardMouseLeave}
				>
					<div className="animate-in slide-in-from-left-5 fade-in duration-300 ease-out">
						<div className="bg-[#8A8A8A] backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl w-80 transform transition-all duration-300 ease-out hover:scale-105">
							{/* Header */}
							<div className="flex items-start space-x-4 mb-4">
								<div
									className={`
                    p-3 rounded-xl shadow-lg transition-all duration-500 ease-out
                    ${hoveredItemData.color} ${hoveredItemData.glowColor}
                    transform hover:scale-110 hover:rotate-3
                  `}
								>
									<hoveredItemData.icon className="w-6 h-6 text-white transition-all duration-300 ease-out hover:drop-shadow-lg" />
								</div>
								<div className="flex-1">
									<h3 className="text-white font-semibold text-lg mb-1 transition-all duration-300 ease-out hover:text-gray-100">
										{hoveredItemData.label}
									</h3>
									<p className="text-gray-300 text-sm transition-all duration-300 ease-out">
										{hoveredItemData.description}
									</p>
								</div>
							</div>

							{/* Quick Actions */}
							<div className="flex space-x-2">
								<Link
									to={hoveredItemData.link}
									className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-sm font-medium transition-all duration-300 ease-out border border-blue-400/30 hover:border-blue-400/50 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
								>
									Open
								</Link>
							</div>

							{/* Visual indicator */}
							<div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
								<div className="w-4 h-4 bg-[#1a1a1a] border-l border-t border-gray-700/50 transform rotate-45 transition-all duration-300 ease-out hover:scale-110" />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
