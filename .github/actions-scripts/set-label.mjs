#!/usr/bin/env node

import { context, getOctokit } from "@actions/github";
import { setOutput } from "@actions/core";

if (process.env.GITHUB_TOKEN) console.log("GITHUB_TOKEN present");
else console.log("GITHUB_TOKEN NOT present");

const octokit = getOctokit(process.env.GITHUB_TOKEN);

main();

async function labelPullRequest(config) {
  const {
    owner,
    repo,
    payload: { number },
  } = context;

  console.log(context);
  console.log(Object.keys(context));
  console.assert(number, "number not present");
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
      issue_number: number,
    })
  );
}

async function main() {
  const label = "my-label";
  await labelPullRequest([label]);
  setOutput("myLabel", label);
}
