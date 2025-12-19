export default function Watermark() {
    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 opacity-20 pointer-events-none z-50 select-none">
            <div className="flex flex-col items-center">
                <span className="text-sm font-bold tracking-widest uppercase">Awesome Entertainment</span>
                <span className="text-[10px] tracking-wide">© 2025</span>
            </div>
        </div>
    )
}
