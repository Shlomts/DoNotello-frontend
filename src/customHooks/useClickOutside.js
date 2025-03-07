import { useEffect } from "react"

export function useClickOutside(ref, callBack) {
    useEffect(() => {
        function handleClickOutside(ev) {
            if (ref.current && !ref.current.contains(ev.target)) {
                callBack()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return (() => {
            document.removeEventListener('mousedown', handleClickOutside)
        })
    }, [ref, callBack])
}