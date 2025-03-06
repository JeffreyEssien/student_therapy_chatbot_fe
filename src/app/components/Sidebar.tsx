import React from "react";

interface SidebarProps {
  messages: { date: string; text: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <div className="bg-blue-500 p-4 text-white max-w-4/5">
        <h2 className="text-lg font-bold">Previous Sessions</h2>
        <div className="mt-4 text-gray-100">No previous sessions available.</div>
      </div>
    );
  }

  return (
    <div className="bg-blue-500 p-4 text-white max-w-4/5 h-full overflow-y-auto">
      <h2 className="text-lg font-bold">Previous Sessions</h2>
      <div className="mt-4 border-t border-gray-300 pt-2">
        {messages.map((message, index) => (
          <div key={index} className="text-gray-100 mb-2 p-2 bg-blue-600 rounded">
            <span className="block text-sm font-semibold">{message.date}</span>
            <span className="block text-sm">{message.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
