export function errorMsgDiv(msg: string) {
  const lines = msg.split("\n")
  return <div className=" max-w-[640px]">
    {lines.map((line, i) => (
      <div key={i}>{line}</div>
    ))}
  </div>
}