import  { useState, useEffect } from "react";



export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition (newmode, replace = false) {
        if (!replace) {
            setHistory(prev => [newmode, ...prev])
        }
        setMode(newmode);
    }
      function back () {
        if (history.length === 1) {
          return
        }
        setHistory(([_, ...hist]) => hist);
        setMode(history[1]);
      }

    return { mode, transition, back };
}





  