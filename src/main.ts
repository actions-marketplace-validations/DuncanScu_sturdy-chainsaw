import * as core from '@actions/core'
const github = require('@actions/github');
const { context } = require('@actions/github')
const { pull_request } = context.payload;

async function run(): Promise<void> {
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
  const octokit = github.getOctokit(GITHUB_TOKEN);
  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: 'Thank you for submitting a pull request! We willtry to review this as soon as we can.'
  });
}

run()
