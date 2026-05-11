/**
 * Smooth scroll utility for anchor links
 */
export const smoothScrollTo = (elementId: string): void => {
  const element = document.getElementById(elementId);
  
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
};

/**
 * Handle anchor link clicks with smooth scrolling
 */
export const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, targetId: string): void => {
  e.preventDefault();
  smoothScrollTo(targetId);
};
