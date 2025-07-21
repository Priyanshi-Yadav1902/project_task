import React from 'react';

function App() {
  const [password, setPassword] = React.useState("");
  const [passwordLength, setPasswordLength] = React.useState(8);

  
  const handlePasswordGenerate = React.useCallback(() => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";
    for (let i = 0; i < passwordLength; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pass);
  }, [passwordLength]);

  
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

 
  React.useEffect(() => {
    handlePasswordGenerate();
  }, [passwordLength]);

  
  const handleLengthIncrease = () => {
    if (passwordLength < 32) setPasswordLength(prev => prev + 1);
  };

  const handleLengthDecrease = () => {
    if (passwordLength > 8) setPasswordLength(prev => prev - 1);
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">🔐 Password Generator</h1>

     
      <input
        type="text"
        value={password}
        readOnly
        className="h-12 w-96 text-center text-xl font-mono border border-slate-700 rounded-lg px-4 mb-6 bg-white shadow"
      />

      
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleLengthDecrease}
          className="h-10 w-10 rounded-full bg-slate-700 text-white font-bold text-xl hover:bg-slate-800"
        >
          -
        </button>
        <span className="text-lg font-semibold text-slate-800">
          Length: {passwordLength}
        </span>
        <button
          onClick={handleLengthIncrease}
          className="h-10 w-10 rounded-full bg-slate-700 text-white font-bold text-xl hover:bg-slate-800"
        >
          +
        </button>
      </div>

      
      <div className="flex gap-4">
        <button
          onClick={handlePasswordGenerate}
          className="h-10 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Generate
        </button>
        <button
          onClick={handleCopy}
          className="h-10 px-6 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Copy
        </button>
      </div>
    </div>
  );
}

export default App;
