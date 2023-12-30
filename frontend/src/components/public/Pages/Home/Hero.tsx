
"use client";
import { cn } from "@/utils/utils";

function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute h-full w-full overflow-hidden [perspective:400px]",
        className,
      )}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(45deg)]">
        <div
          className={cn(
            "animate-grid",

            "[background-repeat:repeat] [background-size:60px_60px] [height:100vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:200vw]",

            // Light Styles
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",

            // Dark styles
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]",
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent to-60% dark:from-black" />
    </div>
  );
}


const Hero = () => {
  return (
    <>
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 ">
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
        DropBox
      </span>

      <RetroGrid />
    </div>
    </>
  );
};

export default Hero;
