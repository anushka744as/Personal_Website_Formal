export type ThemeMode = 'dark' | 'light';

export type ThemePreset = {
  name: string;
  mode: ThemeMode;
  // Background colors
  background: string;
  // Particle config
  particles: {
    number: { value: number; density: { enable: boolean; value_area: number } };
    color: { value: string };
    opacity: { value: number; random: boolean };
    size: { value: number; random: boolean };
    line_linked: { enable: boolean; distance: number; color: string; opacity: number; width: number };
    move: { enable: boolean; speed: number; direction: string; random: boolean; straight: boolean; out_mode: string };
  };
  interactivity: {
    events: { onhover: { enable: boolean; mode: string }; onclick: { enable: boolean; mode: string }; resize: boolean };
    modes: { grab?: { distance: number; line_linked: { opacity: number } }; push?: { particles_nb: number }; repulse?: { distance: number; duration: number }; bubble?: { distance: number; size: number; duration: number; opacity: number; speed: number } };
  };
};

export const PARTICLE_PRESETS: Record<string, ThemePreset> = {
  // ============================================
  // LIGHT MODE - Clean Purple Accent
  // ============================================
  light: {
    name: 'Light Mode',
    mode: 'light',
    background: '#faf8f5', // Cream background
    
    // LIGHT MODE PARTICLE CONFIGURATION
    particles: {
      number: { 
        value: 80,                    
        density: { enable: true, value_area: 700 } 
      },
      color: { value: '#6f57eb' },     // Primary Purple
      opacity: { value: 0.9, random: false },
      size: { value: 4, random: true },
      line_linked: { 
        enable: true, 
        distance: 250,                 
        color: '#6f57eb',              // Primary Purple for visibility
        opacity: 0.9,                 
        width: 3                     
      },
      move: { 
        enable: true, 
        speed: 1.2,                    
        direction: 'none', 
        random: false, 
        straight: false, 
        out_mode: 'out' 
      },
    },
    interactivity: {
      events: { 
        onhover: { enable: true, mode: 'grab' },  
        onclick: { enable: true, mode: 'push' },  
        resize: true 
      },
      modes: { 
        grab: { 
          distance: 200,                           
          line_linked: { opacity: 0.8 } 
        }, 
        push: { particles_nb: 3 }                  
      },
    },
  },

  // ============================================
  // DARK MODE - Deep Purple Night
  // ============================================
  dark: {
    name: 'Dark Mode',
    mode: 'dark',
    background: '#0a0a0a', // Deep Dark Background
    
    // DARK MODE PARTICLE CONFIGURATION
    particles: {
      number: { 
        value: 120,                    
        density: { enable: true, value_area: 700 } 
      },
      color: { value: '#b957eb' },     // Lightest Purple for contrast
      opacity: { value: 1, random: false },  
      size: { value: 4, random: true },
      line_linked: { 
        enable: true, 
        distance: 250,                 
        color: '#b957eb',              // Bright Purple
        opacity: 0.9,                  
        width: 2.5                       
      },
      move: { 
        enable: true, 
        speed: 0.8,                    
        direction: 'none', 
        random: true,                  
        straight: false, 
        out_mode: 'out' 
      },
    },
    interactivity: {
      events: { 
        onhover: { enable: true, mode: 'grab' }, 
        onclick: { enable: true, mode: 'push' }, 
        resize: true 
      },
      modes: { 
        grab: { 
          distance: 250,                           
          line_linked: { opacity: 1 }              
        }, 
        push: { particles_nb: 4 }                  
      },
    },
  },
};

export type ParticlePresetKey = keyof typeof PARTICLE_PRESETS;
