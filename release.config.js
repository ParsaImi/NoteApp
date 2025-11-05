module.exports = {
  branches: ['main'],  // Only release from main (adjust if using 'master' or others)
  repositoryUrl: 'file://' + __dirname + '/.git',  // Points to your local Git repo to bypass remote origin checks
  ci: false,  // Explicitly disable CI mode for local runs (equivalent to --no-ci flag)
  dryRun: false,  // Set to true if you want dry-run baked in; otherwise use CLI flag
  tagFormat: `v${'${version}'}`,  // Format of the git tag (e.g., v1.0.0)

  plugins: [
    [
     '@semantic-release/commit-analyzer',  // Analyzes commits for version bump
     {
     	preset: 'angular',
	releaseRules: [
	  { type: 'docs', release: false },
	  { type: 'refactor', release: 'patch' },
	  { type: 'style', release: 'patch' },
	  { breaking: true, release: 'patch' },
	],
	"parserOpts": {
	  "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
	}
     }
    ],
    [
        '@semantic-release/release-notes-generator',  // Generates release notes
	{
	  "preset": "conventional-changelog-emoji",
	},
    ],
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
