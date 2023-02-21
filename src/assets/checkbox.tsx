export default ({checked = false}: {checked: boolean})=><svg xmlns="http://www.w3.org/2000/svg" className={`h-[4vmin] fill-white ${checked ? "bg-sky-400" : "bg-none"}`} viewBox="0 0 50 50"><path d="M44 1H6C3.243 1 1 3.243 1 6v38c0 2.757 2.243 5 5 5h38c2.757 0 5-2.243 5-5V6c0-2.757-2.243-5-5-5zm3 43c0 1.654-1.346 3-3 3H6c-1.654 0-3-1.346-3-3V6c0-1.654 1.346-3 3-3h38c1.654 0 3 1.346 3 3v38z"/><path fill={checked ? "white" : "none"} d="m16 35.586-6.293-6.293-1.414 1.414L16 38.414l25.707-25.707-1.414-1.414z"/></svg>