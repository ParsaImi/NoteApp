module.exports = {
  branches: ['main'],  // Only release from main (adjust if using 'master' or others)
  ci: true,  // Explicitly disable CI mode for local runs (equivalent to --no-ci flag)
  dryRun: false,  // Set to true if you want dry-run baked in; otherwise use CLI flag

  plugins: [
    '@semantic-release/commit-analyzer',  // Analyzes commits for version bump
    '@semantic-release/release-notes-generator',  // Generates release notes
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',  // Output file for changelog
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],  // Files to commit (e.g., updated version/changelog)
        message: '${nextRelease.version} CHANGELOG [skip ci]\n\n${nextRelease.notes}',  // Commit message template
      },
    ],
    // Optional: Add '@semantic-release/npm' for npm version simulation (won't publish if "private": true in package.json)
    // '@semantic-release/npm',
  ],
};
