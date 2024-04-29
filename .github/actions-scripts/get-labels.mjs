#!/usr/bin/env node

import { context, getOctokit } from "@actions/github";
import { setOutput } from "@actions/core";

console.assert(process.env.GITHUB_TOKEN, "GITHUB_TOKEN not present");

const octokit = getOctokit(process.env.GITHUB_TOKEN);

console.log("Sharing secrets")
console.log(process.env.GITHUB_TOKEN)

main();

async function getCurrentPRLabels() {
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
  return currentLabels.map((label) => label.name).join(", ");
}

async function main() {
  const labels = await getCurrentPRLabels();
  setOutput("currentLabels", labels);
}
