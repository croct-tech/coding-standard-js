const {execFileSync} = require('node:child_process');
const path = require('node:path');

module.exports = function globalSetup() {
  // Build the bundle once for the whole test run so tests that exercise the
  // published artifact can require it without each rebuilding it themselves.
  execFileSync('npm', ['run', 'build'], {
    cwd: path.resolve(__dirname),
    stdio: 'pipe',
  });
};
