module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.[tj]sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  };
  