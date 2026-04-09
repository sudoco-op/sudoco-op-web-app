import React, { useState, useRef } from "react"
import { Link, useNavigate } from "react-router"
import { House } from "lucide-react"
import { api } from "~/api/api"
import { setUserToken } from "~/auth/auth"
import FooterBlock from "~/components/FooterBlock"
import HeaderBlock from "~/components/HeaderBlock"

export const JoinGame: React.FC = () => {
    const [code, setCode] = useState<string[]>(new Array(6).fill(""));
    const inputsRef = useRef<HTMLInputElement[]>([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const joinGame = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await api.joinGame(code.join(""))
            setUserToken(response.userJwt);
            navigate(`/game-lobby/${response.game.id}`);
        } catch (e) {
            alert("No game with "+code.join("")+" found")
        } finally {
            setLoading(false);
        }

    }

    const handleChange = (target: HTMLInputElement, index: number) => {
        
        const value = target.value.replace(/[^0-9]/g, "");

        const newCode = [...code];

        newCode[index] = value.substring(value.length - 1);
        setCode(newCode);

        if (index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g,"")
        if (!pastedData) return;
        
        const data = pastedData.trim().slice(0, 6).split("");
        const newCode = [...code];

        console.log("Code ",newCode)

        let lastFilled = 0;
        data.forEach((char, i) => {
            if (/[0-9]/.test(char)) {
                newCode[i] = char;
                lastFilled = i;
            }
        });

        setCode(newCode);

        const nextIndex = Math.min(lastFilled+1, 5);
        inputsRef.current[nextIndex]?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (!code[index] && index > 0) {
                const newCode = [...code];
                newCode[index - 1] = "";
                setCode(newCode);
                inputsRef.current[index - 1]?.focus();
            } else {
                const newCode = [...code];
                newCode[index] = "";
                setCode(newCode);
            }
        }
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col justify-between items-center
                font-sans text-(--text-main) overflow-hidden transition-colors duration-300
                bg-linear-to-b from-(--bg-card) to-(--bg-main) 
                ">

            <HeaderBlock/>

            <div className="text-center space-y-4 mb-16">
                <h1 className="text-6xl font-black bg-clip-text text-transparent bg-linear-to-t from-(--text-main) to-(--text-muted) ">
                    SUDOCO-OP
                </h1>
                <p className="text-(--text-muted) uppercase tracking-[0.5em] text-xs font-bold opacity-80">
                    Cooperative Sudoku Platform
                </p>

            </div>

            <div className="text-center flex flex-col bg-(--border-color) w-fit p-4 m-4 rounded-sm">
                <div className="flex gap-2 mb-4 justify-center">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            ref={(el) => {
                                if (el == null) return;
                                inputsRef.current[index] = el;
                            }
                            }
                            onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            className="w-10 h-12 text-center text-xl font-bold border-solid border-(--text-muted) 
                       hover:border-(--primary) focus:border-(--primary) focus:outline-none 
                       hover:shadow-xl shadow-blue-500/20 rounded-sm border-2 bg-transparent transition-all"
                        />
                    ))}
                </div>

                <button
                    className="h-12 w-full px-2 bg-(--bg-card) border border-(--bg-card) 
                     text-(--text-main) transition-all duration-300 rounded-sm 
                     active:scale-[0.98] shadow-sm disabled:opacity-50"
                    disabled={code.join("").length < 6 || loading}
                    onClick={joinGame}
                >
                    <span className="text-xl font-bold">Enter</span>
                </button>
            </div>

            
            <FooterBlock/>
        </div>
    )
}
