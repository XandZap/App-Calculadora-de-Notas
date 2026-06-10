interface InfoBannerProps {
  message: string;
}

export function InfoBanner({ message }: InfoBannerProps) {
  return (
    <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-[8px] px-3 py-2.5 mt-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="currentColor"
        viewBox="0 0 256 256"
        className="text-blue-400 shrink-0"
      >
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72v.72a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8,20,20,0,1,0-20-20,8,8,0,0,1-16,0,36,36,0,1,1,44,35.28Z"></path>
      </svg>
      <span className="font-sans text-[11.5px] text-blue-300/80">
        {message}
      </span>
    </div>
  );
}
