module.exports = {
    content: [
      "./client/src/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        colors: {
            background: '#00FFFF',
            blue: '#00FFFF'
        },
        fontFamily: {
          'sans': ['Helvetica', 'sans-serif'],
          'courier': ['Courier New', 'monospace'],
        },
        screens: {
          sm: '480px',
          md: '768px',
          lg: '976px',
          xl: '1440px'
        },
        blur: {
          xs: '1px'
        },
        dropShadow: {
          icon: '0 0 2px rgb(37,46,58)'
        }
      },
    },
    variants: {},
    plugins: [],
  };

  
  