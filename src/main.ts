import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  const token = core.getInput('token');
  console.log(token)
  const octokit = github.getOctokit(token);
  const context = github.context;
  

  await octokit.rest.issues.createComment({
    owner: "DuncanScu",
    repo: "sturdy-chainsaw",
    issue_number: 10,
    body: "Testing....please work"
  });
}

run()