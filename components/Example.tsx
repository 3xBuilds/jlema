"use client"

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import useLocalStorage from "@/hooks/useLocalStorage"
import { useToggle } from "@/hooks/useToggle";

const Example = () => {

  const [num, setNum] = useLocalStorage<number>("number", 0); // use just like usestate
  const [copiedText, copy] = useCopyToClipboard(); // <button onClick={() => copy('A')}>A</button>
  const [value, toggle, setValue] = useToggle()

  return (
    <>
    </>
  )
}

export default Example