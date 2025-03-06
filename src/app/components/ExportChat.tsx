import { jsPDF } from "jspdf";

interface ExportChatProps {
  messages: { user: string; bot: string }[];
}

const ExportChat: React.FC<ExportChatProps> = ({ messages }) => {
  const handleExport = () => {
    if (messages.length === 0) {
      alert("No messages to export.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Chat History", 10, 10);

    let y = 20;
    messages.forEach(({ user, bot }, index) => {
      doc.text(`User: ${user}`, 10, y);
      y += 7;
      doc.text(`Bot: ${bot}`, 10, y);
      y += 10;
    });

    doc.save("chat_history.pdf");
  };

  return (
    <button onClick={handleExport} className="block bg-white text-blue-500 px-4 py-2 w-full text-left">
      Export Chat as PDF
    </button>
  );
};

export default ExportChat;
