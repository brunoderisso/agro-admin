import { useEffect } from "react"

const useScript = src => {
  useEffect(() => {
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = src
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [src])
}
export default useScript