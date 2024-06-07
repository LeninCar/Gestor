export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transforma archivos JSX/JS con babel-jest
  },
  transformIgnorePatterns: [
    '/node_modules/', // No transformar dependencias en node_modules
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Simula archivos CSS
  },
  collectCoverage: true, // Habilita la recolección de cobertura
  coverageDirectory: 'coverage', // Directorio para almacenar los informes de cobertura
};