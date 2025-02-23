export function BackgroundGrid() {
    return (
      <div
        className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:radial-gradient(white,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
    )
  }
  
  