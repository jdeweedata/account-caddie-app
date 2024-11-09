export const styles = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12 sm:py-16 lg:py-20',
  card: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
  button: {
    primary: 'bg-[#069949] text-white hover:bg-te-papa-green transition-colors duration-300',
    secondary: 'bg-white text-[#069949] hover:bg-pampas hover:text-te-papa-green border border-[#069949]',
  },
  text: {
    h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-te-papa-green',
    h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-te-papa-green',
    h3: 'text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-te-papa-green',
    body: 'text-base sm:text-lg leading-relaxed text-xanadu',
  },
  grid: {
    default: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8',
    four: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8',
  },
  animation: {
    fadeIn: 'animate-fade-in',
    slideIn: 'animate-slide-in',
  },
} as const