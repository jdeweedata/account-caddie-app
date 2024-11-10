import { breakpoints, typography, spacing } from '@/lib/utils/breakpoints'

export const formStyles = {
  // Layout
  container: "w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-6 sm:py-8 md:py-12 lg:py-16",
  grid: {
    cols1: "grid grid-cols-1 gap-4 sm:gap-6",
    cols2: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6",
    cols3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
    cols4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
  },

  // Cards
  card: "bg-white rounded-lg shadow-md overflow-hidden",
  cardHeader: "p-4 sm:p-6 border-b border-gray-200",
  cardBody: "p-4 sm:p-6",
  cardFooter: "p-4 sm:p-6 border-t border-gray-200",

  // Form Elements
  form: "space-y-4 sm:space-y-6",
  fieldGroup: "space-y-2 sm:space-y-4",
  field: "space-y-1 sm:space-y-2",
  label: "block text-sm font-medium text-gray-700",
  input: "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-chelsea-cucumber focus:border-transparent",
  select: "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-chelsea-cucumber focus:border-transparent",
  textarea: "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-chelsea-cucumber focus:border-transparent",
  checkbox: "rounded border-gray-300 text-chelsea-cucumber focus:ring-chelsea-cucumber",
  radio: "rounded-full border-gray-300 text-chelsea-cucumber focus:ring-chelsea-cucumber",
  dropdown: "bg-white border border-gray-200 shadow-lg rounded-md p-1 mt-1 z-50",

  // Buttons
  button: {
    primary: "bg-chelsea-cucumber text-white hover:bg-te-papa-green focus:ring-chelsea-cucumber rounded-md px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-chelsea-cucumber rounded-md px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
    outline: "border-2 border-chelsea-cucumber text-chelsea-cucumber hover:bg-chelsea-cucumber hover:text-white focus:ring-chelsea-cucumber rounded-md px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
    sizes: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    }
  },

  // Typography
  text: {
    h1: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold",
    h2: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold",
    h3: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold",
    h4: "text-base sm:text-lg md:text-xl lg:text-2xl font-semibold",
    body: "text-sm sm:text-base text-gray-600",
    small: "text-xs sm:text-sm text-gray-500"
  },

  // Feedback
  error: "text-sm text-red-600 mt-1",
  success: "text-sm text-green-600 mt-1",
  helper: "text-sm text-gray-500 mt-1",

  // Loading States
  loading: "animate-pulse bg-gray-200 rounded",
  spinner: "animate-spin text-chelsea-cucumber",

  // Responsive Utilities
  hide: {
    mobile: "hidden sm:block",
    desktop: "sm:hidden"
  },
  show: {
    mobile: "sm:hidden",
    desktop: "hidden sm:block"
  }
} 