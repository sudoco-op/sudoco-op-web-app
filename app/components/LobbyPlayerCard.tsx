import {UserRound, UserStar } from "lucide-react"
interface LobbyPlayerCardProps {
  number: number
  isMe?: boolean
}

export default function LobbyPlayerCard({ number, isMe }: LobbyPlayerCardProps) {
  return (
    <div className={(isMe ? "text-[var(--primary)] font-bold " : "") + "m-1 flex items-center gap-2 flex-nowrap justify-center"}>
      {!isMe && <UserRound size={20}/>}
      {isMe && <UserStar size={20}/>}
      <p>Player {number} {isMe && "(You)"}</p>
    </div>
  )
}