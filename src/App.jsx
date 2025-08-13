import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [len, setLen] = useState(12);
  const [numall, setNumall] = useState(true);
  const [char, setChar] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numall) str += "1234567890";
    if (char) str += "!@#$%^&*";

    for (let i = 0; i < len; i++) {
      let c = str[Math.floor(Math.random() * str.length)];
      pass += c;
    }

    setPassword(pass);
  }, [len, numall, char]);

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [len, numall, char, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-indigo-700 mb-6">
          🔐 Password Generator
        </h1>

        {/* Password box */}
        <div className="flex shadow rounded-lg overflow-hidden mb-5 border border-gray-300">
          <input
            type="text"
            value={password}
            placeholder="Your secure password"
            className="outline-none w-full py-2 px-3 text-gray-700"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-800 transition text-white px-4 py-2 font-medium"
            onClick={copyPass}
          >
            Copy
          </button>
        </div>

        {/* Length slider */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Length: <span className="text-indigo-600 font-bold">{len}</span>
          </label>
          <input
            type="range"
            min={6}
            max={25}
            value={len}
            className="w-full accent-indigo-600"
            onChange={(e) => setLen(Number(e.target.value))}
          />
        </div>

        {/* Options */}
        <div className="flex items-center justify-between text-gray-700 font-medium">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={numall}
              onChange={() => setNumall((prev) => !prev)}
              className="accent-indigo-600 w-4 h-4"
            />
            Include Numbers
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={char}
              onChange={() => setChar((prev) => !prev)}
              className="accent-indigo-600 w-4 h-4"
            />
            Include Symbols
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
