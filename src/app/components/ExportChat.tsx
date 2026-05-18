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
    messages.forEach(({ user, bot }) => {
      doc.text(`User: ${user}`, 10, y);
      y += 7;
      doc.text(`Bot: ${bot}`, 10, y);
      y += 10;
    });

    doc.save("chat_history.pdf");
  };

  return (
    <button
      onClick={handleExport}
      className="block w-full border-b border-ink/10 px-4 py-3 text-left font-mono text-eyebrow uppercase text-ink/80 transition-colors duration-300 hover:bg-ink hover:text-paper"
    >
      Export chat · PDF
    </button>
  );
};

export default ExportChat;
