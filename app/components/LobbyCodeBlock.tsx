import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import { Copy } from "lucide-react"

type Props = {
  code: string;
};

const LobbyCodeBlock = ({code}: Props) => {

    const [copied, setCopied] = useState(false);

        const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
  return (
    <div
      className="
            h-auto w-auto
            bg-(--accent)
            flex flex-row justify-center p-3 m-5 rounded-2xl text-2xl font-bold items-center gap-5 flex-nowrap cursor-pointer 
            hover:scale-120 transition-transform"
      onClick={handleCopy}
    >
      <div>{copied ? "Copied!" : code}</div>
      <div><Copy size={30} /></div>
    </div>
  )
}

export default LobbyCodeBlock;
