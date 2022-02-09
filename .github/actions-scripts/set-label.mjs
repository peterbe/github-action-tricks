#!/usr/bin/env node

import { context, getOctokit } from "@actions/github";
import { setOutput } from "@actions/core";

const octokit = getOctokit();

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
  console.log(
    await octokit.rest.issues.listLabelsOnIssue({
      owner,
      repo,
      issue_number: config.issue_number,
    })
  );
}

async function main() {
  const label = "my-label";
  await labelPullRequest([label]);
  setOutput("myLabel", label);
}
