import React, { useState, useRef, useEffect } from 'react';

const FILE_SYSTEM = {
  'about_me.txt': "Sophia R. Thomas - IT Support Specialist entering Cybersecurity.",
  'skills.txt': "Linux (Kali/Ubuntu), WireShark, Network Topology Layout, Security Matrix Audits, React Framework Architecture.",
  'certifications.txt': "CompTIA Security+ (In Progress), Google IT Support Professional Certificate.",
  'contact.txt': "Email: sophiart03@gmail.com | Phone: 626-383-1123"
};

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', text: "⚡ Kali GNU/Linux Rolling Linux Console Simulation ⚡\nType 'help' to review internal baseline executable utilities." }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const fullCmd = inputVal.trim();
      const args = fullCmd.split(' ');
      const command = args[0].toLowerCase();
      
      let newHistory = [...history, { type: 'prompt', text: fullCmd }];
      let stdout = '';

      if (command.length > 0) {
        switch (command) {
          case 'help':
            stdout = "Available system utilities:\n  ls              List active dynamic folder node elements\n  cat [file]      Concatenate and render target document contents\n  clear           Flush structural text stream stack histories\n  whoami          Identify account execution contexts\n  neofetch        Output platform software version telemetry stats";
            break;
          case 'ls':
            stdout = Object.keys(FILE_SYSTEM).join('    ');
            break;
          case 'cat':
            const target = args[1];
            if (!target) stdout = "cat: Missing operand target specification.";
            else if (FILE_SYSTEM[target]) stdout = FILE_SYSTEM[target];
            else stdout = `cat: ${target}: No such file or directory.`;
            break;
          case 'whoami':
            stdout = "root";
            break;
          case 'clear':
            setHistory([]);
            setInputVal('');
            return;
          case 'neofetch':
            stdout = ` OS: Kali Linux Portfolio OS v2026.1\n Host: Sophia-Web-Emulator x86_64\n Kernel: 6.6.0-kali-amd64\n Shell: custom-react-sh v2.0\n Resolution: ${window.screen.width}x${window.screen.height}\n UI Theme: Kali Dark Matrix Edition\n Focus: Cybersecurity & IT Enterprise Administration Support`;
            break;
          default:
            stdout = `bash: ${command}: command not found.`;
        }
      }

      if (stdout) {
        newHistory.push({ type: 'output', text: stdout });
      }

      setHistory(newHistory);
      setInputVal('');
    }
  };

  return (
    <div className="terminal-body" onClick={focusInput}>
      {history.map((line, index) => (
        <div key={index} className="output-line">
          {line.type === 'prompt' && <span className="prompt">root@kali:~# </span>}
          {line.text}
        </div>
      ))}
      <div className="input-line">
        <span className="prompt">root@kali:~# </span>
        <input
          ref={inputRef}
          type="text"
          className="terminal-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck="false"
        />
      </div>
      <div ref={terminalEndRef} />
    </div>
  );
}