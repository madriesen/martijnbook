module.exports = {
  prefix: '',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#0f90f3',
        red: '#e72d4c',
        green: '#45bd63',
        yellow: '#f6b929',
        black: '#18191b',
        gray: '#242527',
        'soft-gray': '#3a3b3d',
        'light-gray': '#a8acaf',
        white: '#e4e5eb',
      },
      boxShadow: {
        lg: '0 20px 25px -5px rgb(15, 15, 15), 0 10px 10px -5px rgb(40, 40, 40)',
      },
      width: {
        post: '680px',
      },
      padding: {
        login: '15vh',
      },
      minWidth: {
        half: '50%',
        button: '8rem',
      },
    },
  },
  variants: {
    extend: {
      outline: ['hover', 'focus', 'active'],
      boxShadow: ['hover', 'focus', 'active'],
      ringWidth: ['hover', 'focus', 'active'],
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
      display: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
