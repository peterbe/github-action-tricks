#!/usr/bin/env node

import { context, getOctokit } from "@actions/github";
import { setOutput } from "@actions/core";

console.assert(process.env.GITHUB_TOKEN, "GITHUB_TOKEN not present");

const octokit = getOctokit(process.env.GITHUB_TOKEN);

main();

async function labelPullRequest(config) {
  const {
    repo: { owner, repo },
    payload: { number },
  } = context;
  console.assert(number, "number not present");
  const { data: currentLabels } = await octokit.rest.issues.listLabelsOnIssue({
    owner,
    repo,
    issue_number: number,
  });
  console.log({ currentLabels });
}

async function main() {
  const label = "my-label";
  await labelPullRequest([label]);
  setOutput("myLabel", label);
}
