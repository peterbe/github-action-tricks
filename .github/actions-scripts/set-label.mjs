#!/usr/bin/env node

import { context, getOctokit } from "@actions/github";
import { setOutput } from "@actions/core";

const octokit = getOctokit(process.env.GITHUB_TOKEN);

main();

async function labelPullRequest(config) {
  const { owner, repo } = context;

  console.log(context);
  //   await octokit.rest.issues.update({
  //     owner,
  //     repo,
  //     issue_number: config.issue_number,
  //     labels: config.labels,
  //   });
}

async function main() {
  const label = "my-label";
  await labelPullRequest([label]);
  setOutput("myLabel", label);
}
