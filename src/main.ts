import { processTestResults } from './results';
import { processTestCoverage } from './coverage';
import { getInputs, publishComment, setFailed, setSummary } from './utils';
import { formatCoverageMarkdown, formatResultMarkdown } from './formatting/markdown';
import { formatCoverageHtml, formatResultHtml, formatTitleHtml } from './formatting/html';

const run = async (): Promise<void> => {
  try {
    const {
      token,
      title,
      resultsPath,
      coveragePath,
      coverageType,
      coverageThreshold,
      postNewComment,
      allowFailedTests
    } = getInputs();

    let comment = '';
    let summary = formatTitleHtml(title);

    const testResult = await processTestResults(resultsPath, allowFailedTests);
    comment += formatResultMarkdown(testResult);
    summary += formatResultHtml(testResult);

    if (coveragePath) {
      const testCoverage = await processTestCoverage(coveragePath, coverageType, coverageThreshold);
      comment += testCoverage ? formatCoverageMarkdown(testCoverage, coverageThreshold) : '';
      summary += testCoverage ? formatCoverageHtml(testCoverage) : '';
    }

    await setSummary(summary);
    await publishComment(token, title, comment, postNewComment);
  } catch (error) {
    setFailed((error as Error).message);
  }
};


run()


// public async publishResults(): Promise<void>{
//   // this isnt the reponsability of this class
//   const token = core.getInput('token');
//   console.log(token)
//   const octokit = github.getOctokit(token);

//   await octokit.rest.issues.createComment({
//       owner: "DuncanScu",
//       repo: "sturdy-chainsaw",
//       issue_number: 10,
//       body: "Testing....please work"
//     });
// }

/*
Report:
- Accepance Tests (The group)
  Passed: 9
  Failed: 1
- Unit Tests
  Passed: 10
  Failed: 0
- Integration Tests
  Passed: 10
  Failed: 0
*/