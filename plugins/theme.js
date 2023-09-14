export default defineNuxtPlugin(nuxtApp => {
    // only dark and light mode. If user's system not prefer dark mode, default to light mode
    /**
     * Get current rendered theme
     * @returns {string} Current theme, 'light or 'dark'
     */
    const getCurrentTheme = () => {
        const theme = window.localStorage.getItem('theme')
        if (theme) return theme
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
        return 'light'
    }
    
    /**
     * toggle between 'light' and 'dark' theme
     */
    const switchTheme = () => {
        const currentTheme = getCurrentTheme()
        if (currentTheme == 'dark') {
            localStorage.theme = 'light'
            document.documentElement.classList.remove('dark')
        }
        else {
            localStorage.theme = 'dark'
            document.documentElement.classList.add('dark')
        }
    }
  
    return {
      provide: {
        switchTheme
      }
    };
  });
  