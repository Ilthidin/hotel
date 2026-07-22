export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" fill="#c8a97e" />
        <path
          d="M8 8h4v12h10v-12h4v24h-4V18h-10v14H8V8z"
          fill="#0a0a0a"
        />
      </svg>
      <span className="font-heading text-2xl tracking-[0.3em] font-semibold text-white">
        HENDRY
      </span>
    </div>
  );
}
